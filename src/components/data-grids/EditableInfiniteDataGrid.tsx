import React from 'react';
import {
  IconButton,
  InputBase,
  Paper,
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
  FormControl,
  Grid,
} from '@mui/material';
import AddTaskIcon from '@mui/icons-material/AddTask';
import DeleteIcon from '@mui/icons-material/Delete';
import useIsMobile from '../../hooks/useIsMobile';
import { IInfiniteListColumn } from '../../utils/types';

const MyInfiniteList = ({
  listColumns,
  columnValues,
  setColumnValue,
  handleOnAddListItem,
  handleDeleteItem,
}: {
  listColumns: IInfiniteListColumn[];
  columnValues: any[];
  setColumnValue: React.Dispatch<React.SetStateAction<any[]>>;
  handleOnAddListItem: () => void;
  handleDeleteItem: (selectedValue: string) => void;
}) => {
  const isMobile = useIsMobile();

  return (
    <Paper
      sx={{
        p: '2px 4px',
        display: 'block',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Grid
        container
        direction='row'
        justifyContent='space-between'
        alignItems='center'
      >
        {listColumns.map((v) => {
          return (
            <InputBase
              fullWidth
              sx={{ ml: 1, flex: 1 }}
              placeholder={v.placeHolder}
              type='text'
              defaultValue=''
              onBlur={(e: React.BaseSyntheticEvent) => {
                //
              }}
            />
          );
        })}

        <IconButton aria-label='add-item' onClick={handleOnAddListItem}>
          <AddTaskIcon color='primary' />
        </IconButton>
      </Grid>

      <>
        <List dense>
          <Paper
            sx={{
              p: '2px 4px',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <ListItem
              secondaryAction={
                <IconButton
                  edge='end'
                  aria-label='add-task'
                  // onClick={() => handleDeleteItem(v.id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              {listColumns.map((column) => (
                <ListItemText key={column.id} primary={''} />
              ))}
            </ListItem>
            <Divider />
          </Paper>
        </List>
      </>
    </Paper>
  );
};

export default MyInfiniteList;
