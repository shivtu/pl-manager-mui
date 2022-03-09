import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function ConfirmationDialogSlide(props: {
  open: boolean;
  dialogTitle: string;
  dialogContent: string;
  onClose: () => void;
  dialogActions: { label: string; action: () => void }[];
}) {
  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby='dialog-title'
      >
        <DialogTitle>{props.dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id='dialog-content'>
            {props.dialogContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {props.dialogActions.map((dialogAction) => (
            <Button key={dialogAction.label} onClick={dialogAction.action}>
              {dialogAction.label}
            </Button>
          ))}
        </DialogActions>
      </Dialog>
    </div>
  );
}
