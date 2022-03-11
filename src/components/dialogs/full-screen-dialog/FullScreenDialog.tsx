import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Grid, Button } from '@mui/material';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function FullScreenDialog({
  open,
  onClose,
  onSave,
  content,
}: {
  open: boolean;
  onClose: () => any;
  onSave: () => any;
  title?: string;
  content: JSX.Element;
}) {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'static' }}>
        <Toolbar>
          <Grid
            container
            direction='row'
            justifyContent='space-between'
            alignItems='center'
          >
            <Grid item>
              <Button onClick={onClose} startIcon={<CloseIcon />} size='large'>
                Cancel
              </Button>
            </Grid>

            <Grid item>
              <Button onClick={onSave} startIcon={<CheckIcon />} size='large'>
                Save
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {/* <List>
        <ListItem button>
          <ListItemText primary='Phone ringtone' secondary='Titania' />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText
            primary='Default notification ringtone'
            secondary='Tethys'
          />
        </ListItem>
      </List> */}
      {content}
    </Dialog>
  );
}
