import {
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CButton from '../../components/buttons/CButton';
import SaveIcon from '@mui/icons-material/Save';
import AddTaskIcon from '@mui/icons-material/AddTask';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import React, { useState } from 'react';
import { IDesignTaskData } from '../../utils/types';
import useIsMobile from '../../hooks/useIsMobile';
import BoldTooltip from '../../components/tooltips/BoldTooltip';

const AnalyticsPage = () => {
  const isMobile = useIsMobile();

  const initDesignTaskData = {
    componentName: '',
    cost: undefined,
    process: '',
  };

  const tableCells = ['Component', 'Cost', 'Process', 'Action'];

  const [designTasks, setDesignTasks] = useState<IDesignTaskData[]>([]);
  const [designTask, setDesignTask] =
    useState<IDesignTaskData>(initDesignTaskData);

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
      <Grid
        container
        direction={'row'}
        justifyContent='space-between'
        alignItems='center'
      >
        <Grid item>
          <CButton label='Attach design' startIcon={<AttachFileIcon />} />
        </Grid>
        <Grid item>
          <CButton
            label='Save all'
            endIcon={<SaveIcon />}
            onClick={handleDesignTasksUpdate}
          />
        </Grid>
      </Grid>
      <Paper
        sx={{
          p: '2px 4px',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Grid
          container
          direction={isMobile ? 'column' : 'row'}
          justifyContent='center'
          alignItems='center'
          spacing={2}
        >
          <Grid item>
            <TextField
              fullWidth
              size='small'
              label='Component'
              value={designTask.componentName}
              onChange={(e: React.BaseSyntheticEvent) =>
                setDesignTask({
                  ...designTask,
                  ...{ componentName: e.target.value },
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <ArchitectureIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item>
            <TextField
              fullWidth
              size='small'
              label='Process'
              value={designTask.process}
              onChange={(e: React.BaseSyntheticEvent) =>
                setDesignTask({
                  ...designTask,
                  ...{ process: e.target.value },
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <TimelapseIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              type={'number'}
              fullWidth
              size='small'
              label='Cost'
              value={designTask.cost}
              onChange={(e: React.BaseSyntheticEvent) =>
                setDesignTask({
                  ...designTask,
                  ...{ cost: e.target.value },
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <CurrencyRupeeIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item>
            <BoldTooltip title='Add design task'>
              <IconButton onClick={handleAddDesignTask}>
                <AddTaskIcon color='primary' />
              </IconButton>
            </BoldTooltip>
          </Grid>
        </Grid>
      </Paper>
      {Boolean(designTasks?.length) && (
        <Paper>
          <TableContainer component={Paper}>
            <Table aria-label='added tasks'>
              <TableHead>
                <TableRow>
                  {tableCells.map((cell) => (
                    <TableCell key={cell}>{cell}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {designTasks?.map((v) => (
                  <TableRow>
                    <TableCell>{v.componentName}</TableCell>
                    <TableCell>{v.cost}</TableCell>
                    <TableCell>{v.process}</TableCell>
                    <TableCell>
                      <IconButton>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </>
  );
};

export default AnalyticsPage;
