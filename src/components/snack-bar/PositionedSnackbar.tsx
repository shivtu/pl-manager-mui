import React from 'react';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';

export interface ISnackBar extends SnackbarOrigin {
  open: boolean;
  message: string;
  handleClose: () => void;
  severity?: AlertColor;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function PositionedSnackbar(props: ISnackBar) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: props.vertical, horizontal: props.horizontal }}
      open={props.open}
      onClose={props.handleClose}
      message={props.message}
    >
      {Boolean(props.severity) ? (
        <Alert severity={props.severity} sx={{ width: '100%' }}>
          {props.message}
        </Alert>
      ) : undefined}
    </Snackbar>
  );
}
