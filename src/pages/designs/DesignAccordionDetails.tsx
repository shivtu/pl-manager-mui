import React, { useEffect, useState } from 'react';
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
import PolylineIcon from '@mui/icons-material/Polyline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import BoldTooltip from '../../components/tooltips/BoldTooltip';
import useIsMobile from '../../hooks/useIsMobile';
import { ICurrentOwner, IDesignTaskData } from '../../utils/types';
import { Autocomplete, CircularProgress } from '@mui/material';
import StatusDropdown from '../../components/autocomplete/StatusDropdown';
import { getUserProfiles } from '../../services/http.services';

const DesignAccordionDetails = ({
  handleDesignTasksUpdate,
  designTasks,
  handleAddDesignTask,
  designTask,
  setDesignTask,
  currentOwner,
  token,
}: {
  handleDesignTasksUpdate: () => void;
  designTasks: IDesignTaskData[];
  handleAddDesignTask: () => void;
  designTask: IDesignTaskData;
  setDesignTask: React.Dispatch<React.SetStateAction<IDesignTaskData>>;
  currentOwner: ICurrentOwner;
  token: string;
}) => {
  const isMobile = useIsMobile();

  const [open, setOpen] = useState(false);
  const [options, setOptions] = React.useState<ICurrentOwner[]>([currentOwner]);

  const loading = open && options.length === 0;

  const tableCells = ['Component', 'Cost', 'Process', 'Action'];

  const handleCurrentOwnerChange = () => {
    //
  };

  useEffect(() => {
    if (!loading) return undefined;

    (async () => {
      const userProfiles = await getUserProfiles(token);

      const userProfileList: ICurrentOwner[] = userProfiles.data.result;

      setOptions(userProfileList);
    })();
  }, [loading]);

  useEffect(() => {
    if (!open) setOptions([]);
  }, [open]);

  return (
    <>
      <Grid
        container
        direction={'row'}
        justifyContent='space-between'
        alignItems='center'
        sx={{ marginBottom: 2 }}
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
        <Grid item>
          <Autocomplete
            size='small'
            id='asynchronous-user-list'
            sx={{ minWidth: 196 }}
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            isOptionEqualToValue={(option, value) =>
              option.userName === value.userName
            }
            getOptionLabel={(option) => option.userName}
            options={options}
            loading={loading}
            renderInput={(params) => (
              <TextField
                variant='filled'
                {...params}
                label='Assign to'
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color='inherit' size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
        </Grid>
        <Grid item>
          <StatusDropdown
            renderHelperText={false}
            textFieldLabel='Design task status'
          />
        </Grid>
      </Grid>
      <Grid
        container
        direction={isMobile ? 'column' : 'row'}
        justifyContent='space-between'
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
                  <PolylineIcon />
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

export default DesignAccordionDetails;
