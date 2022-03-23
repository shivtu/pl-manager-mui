import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Theme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { TransitionProps } from '@mui/material/transitions';

import { Button } from '@mui/material';
import { IMessageDialogProps } from '../../../utils/types';

const useStyles = makeStyles((theme: Theme) => ({
  errorBorder: {
    borderLeft: `${theme.spacing(1)} solid red`,
  },
  successBorder: {
    borderLeft: `${theme.spacing(1)} solid green`,
  },
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const MessageDialog = (props: IMessageDialogProps) => {
  const classes = useStyles();

  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition}
      onClose={props.onClose}
    >
      <div
        className={
          props.dialogType === 'error'
            ? classes.errorBorder
            : classes.successBorder
        }
      >
        <DialogTitle>{props.dialogTitle || 'Error'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.dialogContent || 'Unexpected Error'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {props.dialogActions || (
            <Button onClick={props.onClose}>Close</Button>
          )}
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default MessageDialog;
