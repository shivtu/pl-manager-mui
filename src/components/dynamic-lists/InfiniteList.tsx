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
} from '@mui/material';
import AddTaskIcon from '@mui/icons-material/AddTask';
import DeleteIcon from '@mui/icons-material/Delete';

const InfiniteList = ({
  list,
  listItem,
  setListItem,
  handleOnAddListItem,
  handleDeleteItem,
}: {
  list: string[];
  listItem: string;
  setListItem: React.Dispatch<React.SetStateAction<string>>;
  handleOnAddListItem: () => void;
  handleDeleteItem: (selectedValue: string) => void;
}) => {
  return (
    <Box sx={{ margin: 2 }}>
      <Paper
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <InputBase
          fullWidth
          sx={{ ml: 1, flex: 1 }}
          placeholder='Add project requirements'
          type='text'
          value={listItem}
          onChange={(event: React.BaseSyntheticEvent) =>
            setListItem(event.currentTarget.value)
          }
        />
        <IconButton
          sx={{ p: '10px' }}
          aria-label='add-item'
          onClick={handleOnAddListItem}
        >
          <AddTaskIcon />
        </IconButton>
      </Paper>

      <List dense>
        {list?.map((value, i) => (
          <Paper
            key={`${value}-${i}`}
            sx={{
              p: '2px 4px',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <ListItem
              secondaryAction={
                list.length && (
                  <IconButton
                    edge='end'
                    aria-label='add-task'
                    onClick={() => handleDeleteItem(value)}
                  >
                    <DeleteIcon />
                  </IconButton>
                )
              }
            >
              <ListItemText primary={value} />
            </ListItem>
            <Divider />
          </Paper>
        ))}
      </List>
    </Box>
  );
};

export default InfiniteList;
