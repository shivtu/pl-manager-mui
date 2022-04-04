import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import AccordionSummary from '@mui/material/AccordionSummary';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IAppState, IDesign, IDesignTaskData } from '../../utils/types';
import DesignAccordionDetails from './DesignAccordionDetails';
import { getIncompleteDesignTaks } from '../../services/http.services';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import ErrorDialog from '../../components/dialogs/error-dialog/ErrorDialog';
import PositionedSnackbar from '../../components/snack-bar/PositionedSnackbar';
import { updateProjectDesigns } from '../../redux/actions/actions';

const PendingDesignsPage = () => {
  const initDesignTaskData = {
    componentName: '',
    cost: 0,
    process: '',
  };

  const appState: IAppState = useSelector((state) => state);

  const designs = appState.designs || [];
  console.log(appState.designs);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [designTasks, setDesignTasks] = useState<IDesignTaskData[]>([]);
  const [designTask, setDesignTask] =
    useState<IDesignTaskData>(initDesignTaskData);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [errorSnackBar, setErrorSnackBar] = useState(false);

  const handleDesignTasksUpdate = () => {
    //
  };

  const handleAddDesignTask = () => {
    if (designTask.componentName && designTask.process) {
      const componentExists = designTasks.find(
        (t) => t.componentName === designTask.componentName
      );
      if (Boolean(componentExists)) {
        setErrorSnackBar(true);
      } else {
        setDesignTasks([...designTasks, designTask]);
        setDesignTask(initDesignTaskData);
      }
    }
  };

  const getCurrentUsersDesignTasks = (): IDesign[] => {
    return appState.loggedInUser?.userRole === 'admin'
      ? designs
      : designs.filter(
          (d: IDesign) => d.currentOwner.userId === appState.loggedInUser?._id
        );
  };

  useEffect(() => {
    setLoading(true);
    try {
      // Fetch designs iff there are none in the appState
      if (!appState.designs?.length) {
        const incompleteDesignTasks = async () => {
          const response = await getIncompleteDesignTaks(appState.token || '');
          dispatch(updateProjectDesigns(response.data.result));
        };
        incompleteDesignTasks();
      }
    } catch (error) {
      setOpenErrorDialog(true);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <>
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
      {loading && <CircularProgress size={200} />}
      {Boolean(getCurrentUsersDesignTasks()?.length) ? (
        designs.map((dt: IDesign) => (
          <Accordion key={dt._id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='project-desgn-content'
              id='project-name-header'
            >
              <Typography>{dt.parentProjectName}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {appState.token && (
                <DesignAccordionDetails
                  handleDesignTasksUpdate={handleDesignTasksUpdate}
                  designTasks={designTasks}
                  handleAddDesignTask={handleAddDesignTask}
                  designTask={designTask}
                  setDesignTask={setDesignTask}
                  currentOwner={dt.currentOwner}
                  token={appState.token}
                />
              )}
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
