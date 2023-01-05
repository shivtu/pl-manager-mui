import IconButton from '@mui/material/IconButton/IconButton';
import TableCell from '@mui/material/TableCell/TableCell';
import TableRow from '@mui/material/TableRow/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import TableContainer from '@mui/material/TableContainer/TableContainer';
import Table from '@mui/material/Table/Table';
import TableHead from '@mui/material/TableHead/TableHead';
import TableBody from '@mui/material/TableBody/TableBody';
import { IDesign, IDesignTaskComponent } from '../../../utils/types';
import Typography from '@mui/material/Typography/Typography';

const DesignComponentTable = ({
  tableCells,
  designTaskComponents,
  getTotal,
  handleItemDelete,
  designTask,
}: {
  tableCells: string[];
  designTaskComponents: IDesignTaskComponent[];
  getTotal: (components: IDesignTaskComponent[]) => number;
  handleItemDelete: (componentName: string, designTask: IDesign) => void;
  designTask: IDesign;
}) => {
  return (
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
  );
};

export default DesignComponentTable;
