import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  AlertProps,
  Divider,
  IconButton,
} from '@mui/material';
import ProjectStageDropdown from '../../components/autocomplete/ProjectStageDropdown';
import StatusDropdown from '../../components/autocomplete/StatusDropdown';
import ProjectTypesDropdown from '../../components/autocomplete/ProjectTypesDropdown';
import useIsMobile from '../../hooks/useIsMobile';
import {
  IAppState,
  IProjectResponseData,
  ProjectTypeTypes,
} from '../../utils/types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getProjectTasks } from '../../services/http.services';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { PROJECT_STATUS } from '../../utils/enums';
import AddIcon from '@mui/icons-material/Add';
import UsersDropdown from '../../components/autocomplete/UsersDropdown';

const EditProjectPage = ({
  projectDataToEdit,
}: {
  projectDataToEdit: IProjectResponseData;
}) => {
  const initProjectTasks = {
    design: { status: '' },
    purchase: { status: '' },
    production: { status: '' },
    assembly: { status: '' },
    testing: { status: '' },
  };

  const [projectTasks, setProjectTasks] = useState(initProjectTasks);
  const [projectTaskLoader, setProjectTaskLoader] = useState(true);
  const [fetchTasks, setFetchTasks] = useState(true);

  const isMobile = useIsMobile();

  const gridItemXs = isMobile ? 12 : 4;

  const appState = useSelector((state: IAppState) => state);

  const handleGetTasks = async () => {
    // Do not refetch the tasks multiple times
    if (fetchTasks) {
      const tasks = await getProjectTasks(
        appState.token || '',
        projectDataToEdit._id
      );

      const resultData = tasks.data?.result;

      setProjectTasks({
        ...projectTasks,
        ...{ design: resultData.projectdesign },
        ...{ purchase: resultData.projectpurchases },
        ...{ production: resultData.projectproductiontask },
        ...{ assembly: resultData.projectassembly },
        ...{ testing: resultData.projecttest },
      });

      setProjectTaskLoader(false);
    }
    // Do not fetch tasks on every click of accordian
    setFetchTasks(false);
  };

  const getAlertSeverityType = (taskStatus: string): AlertProps['severity'] => {
    if (taskStatus === PROJECT_STATUS.CREATED) return 'info';
    if (taskStatus === PROJECT_STATUS.COMPLETED) return 'success';
    if (taskStatus === PROJECT_STATUS.IN_PROGRESS) return 'warning';
    if (taskStatus === PROJECT_STATUS.ON_HOLD) return 'error';
    if (taskStatus === PROJECT_STATUS.ACCEPTED) return 'info';
    if (
      taskStatus !== PROJECT_STATUS.CREATED &&
      taskStatus !== PROJECT_STATUS.COMPLETED &&
      taskStatus !== PROJECT_STATUS.IN_PROGRESS &&
      taskStatus !== PROJECT_STATUS.ON_HOLD &&
      taskStatus !== PROJECT_STATUS.ACCEPTED
    )
      return 'error';
  };

  if (!projectDataToEdit) return <>404 Not found</>;

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={2}
    >
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ color: 'red' }}>
          [Some fields are disabled as those cannot be edited, only active
          fields can be updated]
        </Typography>
      </Grid>
      <Grid item xs={gridItemXs}>
        <TextField
          size="small"
          variant="filled"
          helperText="Name of the project"
          label="Project name"
          defaultValue={projectDataToEdit.projectName}
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={gridItemXs}>
        <TextField
          size="small"
          variant="filled"
          helperText="Name of the project"
          label="Summary"
          defaultValue={projectDataToEdit.summary}
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={gridItemXs}>
        <TextField
          size="small"
          variant="filled"
          helperText="Name of the project"
          label="Project description"
          defaultValue={projectDataToEdit.description}
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={gridItemXs}>
        <ProjectTypesDropdown
          onChange={(
            event: React.SyntheticEvent<Element, Event>,
            newValue: ProjectTypeTypes | null
          ) => {
            if (newValue) {
              // update state
            }
          }}
          defaultValue={projectDataToEdit.projectType}
        />
      </Grid>
      <Grid item xs={gridItemXs}>
        <TextField
          size="small"
          variant="filled"
          helperText="Name of the project"
          label="Date created"
          defaultValue={projectDataToEdit.createdAt}
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={gridItemXs}>
        <UsersDropdown
          currentOwner={projectDataToEdit.currentOwner}
          token={appState.token || ''}
          helperText=" "
        />
      </Grid>
      <Grid item xs={gridItemXs}>
        <ProjectStageDropdown />
      </Grid>
      <Grid item xs={gridItemXs}>
        <StatusDropdown
          textFieldLabel="Project status"
          helperText="Status of the project"
        />
      </Grid>
      <Grid item xs={6}>
        <Accordion square onChange={handleGetTasks}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="project-tasks"
            id="accordian-header"
          >
            <Typography>Associated tasks</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {projectTaskLoader ? (
              <CircularProgress />
            ) : (
              <>
                <Alert
                  severity={getAlertSeverityType(projectTasks.design?.status)}
                  action={
                    !Boolean(projectTasks.design?.status) && (
                      <IconButton>
                        <AddIcon />
                      </IconButton>
                    )
                  }
                >
                  Design task: {projectTasks.design?.status || 'Not created'}
                </Alert>

                <Divider />
                <Alert
                  severity={getAlertSeverityType(projectTasks.purchase?.status)}
                  action={
                    !Boolean(projectTasks.purchase?.status) && (
                      <IconButton>
                        <AddIcon />
                      </IconButton>
                    )
                  }
                >
                  Purchase orders:
                  {projectTasks.purchase?.status || 'Not created'}
                </Alert>
                <Divider />
                <Alert
                  severity={getAlertSeverityType(projectTasks.assembly?.status)}
                  action={
                    !Boolean(projectTasks.assembly?.status) && (
                      <IconButton>
                        <AddIcon />
                      </IconButton>
                    )
                  }
                >
                  Production task:
                  {projectTasks.production?.status || 'Not created'}
                </Alert>
                <Divider />
                <Alert
                  severity={getAlertSeverityType(
                    projectTasks.production?.status
                  )}
                  action={
                    !Boolean(projectTasks.production?.status) && (
                      <IconButton>
                        <AddIcon />
                      </IconButton>
                    )
                  }
                >
                  Assembly task:
                  {projectTasks.assembly?.status || 'Not created'}
                </Alert>
                <Divider />
                <Alert
                  severity={getAlertSeverityType(projectTasks.testing?.status)}
                >
                  Testing: {projectTasks?.testing?.status || 'Not created'}
                </Alert>
              </>
            )}
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};

export default EditProjectPage;
