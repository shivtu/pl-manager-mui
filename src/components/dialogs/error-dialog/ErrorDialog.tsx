import React from 'react';
import {
  Button,
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

const useStyles = makeStyles((theme: Theme) => ({
  errorBorder: {
    borderLeft: `${theme.spacing(1)} solid red`,
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

const ErrorDialog = (props: {
  dialogTitle?: string;
  dialogContent?: string;
  dialogActions?: JSX.Element;
  open: boolean;
  onClose: () => void;
}) => {
  const classes = useStyles();

  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition}
      onClose={props.onClose}
    >
      <div className={classes.errorBorder}>
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

export default ErrorDialog;
