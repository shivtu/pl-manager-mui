import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import AccordionSummary from '@mui/material/AccordionSummary';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IAppState, IDesign, IDesignTaskComponent } from '../../../utils/types';
import DesignAccordionDetails from './DesignAccordionDetails';
import {
  getIncompleteDesignTaks,
  getIncompleteProjects,
} from '../../../services/http.services';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import ErrorDialog from '../../../components/dialogs/error-dialog/ErrorDialog';
import PositionedSnackbar from '../../../components/snack-bar/PositionedSnackbar';
import {
  updateProjectDesigns,
  updateProjects,
} from '../../../redux/actions/actions';
import CButton from '../../../components/buttons/CButton';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import TemporaryDrawer from '../../../components/drawer/TemporaryDrawer';

const PendingDesignsPage = () => {
  const initDesignTaskComponent = {
    componentName: '',
    componentBaseCost: 0,
    processes: '',
  };

  const appState: IAppState = useSelector((state) => state);

  const designs = appState.designs || [];

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [designComponent, setDesignComponent] = useState<IDesignTaskComponent>(
    initDesignTaskComponent
  );
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [errorSnackBar, setErrorSnackBar] = useState(false);
  const [expanded, setExpanded] = useState<string | false>(false);
  const [projectRequirements, setProjectRequirements] = useState<{
    visible: boolean;
    data: string[];
    parentProjectName: string | false;
  }>({ visible: false, data: [], parentProjectName: expanded });

  const handleDesignTasksUpdate = () => {
    //
  };

  const handleAddDesignTaskComponent = (designTask: IDesign) => {
    const componentExists = designTask.components.find(
      (c) => c.componentName === designComponent.componentName
    );

    if (componentExists) {
      setErrorSnackBar(true);
      return;
    }

    const updatedDesignComponents = appState?.designs?.map((d) => {
      if (d._id === designTask._id) {
        return { ...d, ...{ components: [...d.components, designComponent] } };
      }
      return d;
    });

    if (updatedDesignComponents) {
      dispatch(updateProjectDesigns(updatedDesignComponents));
      setDesignComponent(initDesignTaskComponent);
    }
  };

  const getCurrentUsersDesignTasks = (): IDesign[] => {
    if (designs) {
      return appState.loggedInUser?.userRole === 'admin'
        ? designs
        : designs?.filter(
            (d: IDesign) => d.currentOwner.userId === appState.loggedInUser?._id
          );
    } else return [];
  };

  const handleAccordianToggle =
    (currentPanel: IDesign) =>
    (event: React.SyntheticEvent, isExpanded: boolean) => {
      // Empty the designComponent state so yhat it doesn't show in the input box of other accordian
      setDesignComponent(initDesignTaskComponent);
      setExpanded(isExpanded ? currentPanel.parentProjectName : false);
    };

  const handleItemDelete = (componentName: string, design: IDesign) => {
    const updatedDesignComponents = design.components.filter(
      (c) => c.componentName !== componentName
    );

    const updatedDesigns = designs.map((d) => {
      if (d._id === design._id) {
        return { ...d, ...{ components: updatedDesignComponents } };
      }
      return d;
    });
    dispatch(updateProjectDesigns(updatedDesigns));
  };

  const handleDrawerToggle = async () => {
    if (!appState.projects?.length) {
      const projects = await getIncompleteProjects(appState.token || '');
      dispatch(updateProjects(projects.data.result));
    }
    const requiremenList = appState.projects?.find(
      (p) => p.projectName === expanded
    )?.projectRequirements;
    setProjectRequirements({
      ...projectRequirements,
      ...{ visible: true, data: requiremenList || [] },
    });
  };

  useEffect(() => {
    // Fetch designs iff there are none in the appState
    if (!designs.length) {
      setLoading(true);
      const incompleteDesignTasks = async () => {
        const response = await getIncompleteDesignTaks(`${appState.token}`);
        dispatch(updateProjectDesigns(response.data.result));
        setLoading(false);
      };
      try {
        incompleteDesignTasks();
      } catch (err) {
        setLoading(false);
        setOpenErrorDialog(false);
      }
    }
  }, []);

  if (loading) return <CircularProgress size={200} />;

  return (
    <>
      {
        <TemporaryDrawer
          drawerAnchor='right'
          open={projectRequirements.visible}
          projectRequirements={projectRequirements}
          setProjectRequirements={setProjectRequirements}
        />
      }
      {Boolean(getCurrentUsersDesignTasks()?.length) && (
        <CButton
          variant='text'
          label='Show project Requirement list'
          endIcon={<FormatListNumberedIcon />}
          onClick={handleDrawerToggle}
        />
      )}

      {errorSnackBar && (
        <PositionedSnackbar
          open={errorSnackBar}
          vertical='top'
          horizontal='center'
          handleClose={() => setErrorSnackBar(false)}
          message={'Item already exists'}
          severity='error'
        />
      )}
      {openErrorDialog && (
        <ErrorDialog
          dialogTitle='Unable to get design tasks'
          dialogContent='Unable to get any design tassks, please try again or check your internet connection'
          open={openErrorDialog}
          onClose={() => setOpenErrorDialog(false)}
        />
      )}
      {Boolean(getCurrentUsersDesignTasks()?.length) && !loading ? (
        designs?.map((dt: IDesign, i) => (
          <Accordion
            key={dt._id}
            TransitionProps={{ unmountOnExit: true }}
            disableGutters
            expanded={expanded === dt.parentProjectName}
            onChange={handleAccordianToggle(dt)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='project-desgn-content'
              id='project-name-header'
            >
              <Typography>{dt.parentProjectName}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <DesignAccordionDetails
                designComponent={designComponent}
                setDesignComponent={setDesignComponent}
                handleAddDesignTaskComponent={handleAddDesignTaskComponent}
                designTask={dt}
                currentOwner={dt.currentOwner}
                handleItemDelete={handleItemDelete}
              />
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Typography variant='h5'>No Design tasks in queue</Typography>
      )}
    </>
  );
};

export default PendingDesignsPage;
