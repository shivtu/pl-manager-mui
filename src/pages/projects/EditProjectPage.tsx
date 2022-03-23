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
import { getDesignTaskForProject } from '../../services/http.services';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { PROJECT_STATUS } from '../../utils/enums';
import CButton from '../../components/buttons/CButton';
import AddIcon from '@mui/icons-material/Add';

const EditProjectPage = ({
  projectDataToEdit,
}: {
  projectDataToEdit: IProjectResponseData;
}) => {
  const [projectTasks, setProjectTasks] = useState({
    design: {
      _id: '',
      projectId: '',
      components: [],
      status: '',
      currentOwner: {},
    },
    purchase: {},
    assembly: {},
    testing: {},
  });

  const [fetchTasks, setFetchTasks] = useState(true);

  const isMobile = useIsMobile();

  const gridItemXs = isMobile ? 12 : 4;

  const appState = useSelector((state: IAppState) => state);

  const handlegetTasks = async () => {
    // Do not refetch the tasks multiple times
    if (fetchTasks) {
      const designTask = await getDesignTaskForProject(
        appState.token || '',
        projectDataToEdit._id
      );

      if (!designTask.data?.result.length) {
        setProjectTasks({
          ...projectTasks,
          ...{
            design: {
              _id: '',
              projectId: '',
              components: [],
              status: 'Not created',
              currentOwner: {},
            },
          },
        });
      } else {
        setProjectTasks({
          ...projectTasks,
          ...{ design: designTask.data.result[0] },
        });
      }
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
      direction='row'
      justifyContent='flex-start'
      alignItems='center'
      spacing={2}
    >
      <Grid item xs={12}>
        <Typography variant='body1' sx={{ color: 'red' }}>
          [Some fields are disabled as those cannot be edited, only active
          fields can be updated]
        </Typography>
      </Grid>
      <Grid item xs={gridItemXs}>
        <TextField
          size='small'
          variant='filled'
          helperText='Name of the project'
          label='Project name'
          defaultValue={projectDataToEdit.projectName}
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={gridItemXs}>
        <TextField
          size='small'
          variant='filled'
          helperText='Name of the project'
          label='Summary'
          defaultValue={projectDataToEdit.summary}
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={gridItemXs}>
        <TextField
          size='small'
          variant='filled'
          helperText='Name of the project'
          label='Project description'
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
          size='small'
          variant='filled'
          helperText='Name of the project'
          label='Date created'
          defaultValue={projectDataToEdit.createdAt}
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={gridItemXs}>
        <TextField
          size='small'
          variant='filled'
          helperText='Current owner'
          label='Current owner'
          defaultValue={projectDataToEdit.currentOwner.userName}
          fullWidth
        />
      </Grid>
      <Grid item xs={gridItemXs}>
        <ProjectStageDropdown />
      </Grid>
      <Grid item xs={gridItemXs}>
        <StatusDropdown
          textFieldLabel='Project status'
          helperText='Status of the project'
        />
      </Grid>
      <Grid item xs={6}>
        <Accordion square onChange={handlegetTasks}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='project-tasks'
            id='accordian-header'
          >
            <Typography>Associated tasks</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {projectTasks?.design?.status ? (
              <>
                <Alert
                  severity={getAlertSeverityType(projectTasks?.design?.status)}
                >
                  Design task: {projectTasks?.design?.status}
                </Alert>
                <Divider />
                <Alert
                  severity={getAlertSeverityType(projectTasks?.design?.status)}
                >
                  Purchase orders: {projectTasks?.design?.status}
                </Alert>
                <Divider />
                <Alert
                  severity={getAlertSeverityType(projectTasks?.design?.status)}
                >
                  Assembly work: {projectTasks?.design?.status}
                </Alert>
                <Divider />
                <Alert
                  severity={getAlertSeverityType(projectTasks?.design?.status)}
                >
                  Testing: {projectTasks?.design?.status}
                </Alert>
                <CButton label='Add another task' endIcon={<AddIcon />} />
              </>
            ) : (
              <CircularProgress />
            )}
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};

export default EditProjectPage;
