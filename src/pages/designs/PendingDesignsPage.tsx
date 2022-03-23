import { useState } from 'react';
import Typography from '@mui/material/Typography';
import AccordionSummary from '@mui/material/AccordionSummary';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IAppState, IDesign, IDesignTaskData } from '../../utils/types';
import DesignAccordionDetails from './DesignAccordionDetails';
import useFetch from '../../hooks/useFetch';
import { host, REST_API_SERVICES } from '../../services/http.services';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';

const PendingDesignsPage = () => {
  const initDesignTaskData = {
    componentName: '',
    cost: undefined,
    process: '',
  };

  const [designTasks, setDesignTasks] = useState<IDesignTaskData[]>([]);
  const [designTask, setDesignTask] =
    useState<IDesignTaskData>(initDesignTaskData);

  const appState: IAppState = useSelector((state) => state);

  const { loading, response, error } = useFetch(
    `${host}/${REST_API_SERVICES.DESIGNS.FIND}?status[$ne]=Completed`,
    'get',
    { Authorization: `Bearer ${appState.token}` || '' },
    undefined
  );

  const handleDesignTasksUpdate = () => {
    //
  };

  const handleAddDesignTask = () => {
    if (designTask.componentName && designTask.process) {
      setDesignTasks([...designTasks, designTask]);
      setDesignTask(initDesignTaskData);
    }
  };

  return (
    <>
      {loading && <CircularProgress size={200} />}
      {Boolean(response?.data.result.length) ? (
        response?.data.result.map((dt: IDesign) => (
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
