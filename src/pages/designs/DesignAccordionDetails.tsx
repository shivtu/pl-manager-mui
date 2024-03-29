import React, { Dispatch, SetStateAction } from 'react';
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
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import BoldTooltip from '../../components/tooltips/BoldTooltip';
import useIsMobile from '../../hooks/useIsMobile';
import {
  ICurrentOwner,
  IDesign,
  IDesignTaskComponent,
} from '../../utils/types';
import StatusDropdown from '../../components/autocomplete/StatusDropdown';
import UsersDropdown from '../../components/autocomplete/UsersDropdown';
import { Typography } from '@mui/material';

const DesignAccordionDetails = ({
  designComponent,
  setDesignComponent,
  handleAddDesignTaskComponent,
  currentOwner,
  designTask,
  handleItemDelete,
}: {
  designComponent: IDesignTaskComponent;
  setDesignComponent: Dispatch<SetStateAction<IDesignTaskComponent>>;
  handleAddDesignTaskComponent: (designTaskId: IDesign) => void;
  currentOwner: ICurrentOwner;
  designTask: IDesign;
  handleItemDelete: (componentName: string, designTask: IDesign) => void;
}) => {
  const isMobile = useIsMobile();

  const tableCells = ['Component', 'Process', 'Cost', 'Action'];

  const designTaskComponents = designTask.components;

  const handleCurrentOwnerChange = () => {
    //
  };

  const getTotal = (components: IDesignTaskComponent[]): number => {
    const total = components
      .map((d) => d.componentBaseCost)
      .reduce((prev, curr) => Number(prev) + Number(curr));

    if (total) return total;
    return 0;
  };

  return (
    <>
      <Grid
        container
        direction='row'
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
            // onClick={handleDesignTasksUpdate}
          />
        </Grid>
        <Grid item>
          <UsersDropdown currentOwner={currentOwner} />
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
            value={designComponent.componentName}
            onChange={(e: React.BaseSyntheticEvent) =>
              setDesignComponent({
                ...designComponent,
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
            value={designComponent.processes}
            onChange={(e: React.BaseSyntheticEvent) =>
              setDesignComponent({
                ...designComponent,
                ...{ processes: e.target.value },
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
            value={designComponent.componentBaseCost}
            onChange={(e: React.BaseSyntheticEvent) =>
              setDesignComponent({
                ...designComponent,
                ...{ componentBaseCost: e.target.value },
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
          <IconButton
            color='primary'
            onClick={() => handleAddDesignTaskComponent(designTask)}
            disabled={Boolean(
              !designComponent.processes || !designComponent.componentName
            )}
          >
            <BoldTooltip title='Add design task'>
              <AddTaskIcon />
            </BoldTooltip>
          </IconButton>
        </Grid>
      </Grid>
      {Boolean(designTaskComponents?.length) && (
        <TableContainer>
          <Table aria-label='added tasks' size='small' stickyHeader>
            <TableHead>
              <TableRow>
                {tableCells.map((cell) => (
                  <TableCell key={cell}>{cell}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {designTaskComponents
                .map((v, i) => (
                  <TableRow key={`${v.componentName}${i}`}>
                    <TableCell>{v.componentName}</TableCell>
                    <TableCell>{v.processes}</TableCell>
                    <TableCell>{v.componentBaseCost}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() =>
                          handleItemDelete(v.componentName, designTask)
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
                .reverse()}
              <TableRow>
                <TableCell />
                <TableCell>
                  <Typography color='blue'>TOTAL</Typography>
                </TableCell>
                <TableCell>
                  <Typography color='blue'>
                    {getTotal(designTaskComponents)}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default DesignAccordionDetails;
