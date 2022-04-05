import { Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormsDialog({
  open,
  dialogTitle,
  dialogContentText,
  dialogFormFields,
  passwordMismatchMsg,
  dialogActions,
  handleClose,
}: {
  open: boolean;
  dialogTitle: string;
  dialogContentText: string;
  dialogFormFields: JSX.Element;
  passwordMismatchMsg: string | undefined;
  dialogActions: JSX.Element;
  handleClose?:
    | ((event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void)
    | undefined;
}) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogContentText}</DialogContentText>
          {dialogFormFields}
          <Typography variant='subtitle2' sx={{ color: 'red' }}>
            {passwordMismatchMsg}
          </Typography>
        </DialogContent>

        <DialogActions>{dialogActions}</DialogActions>
      </Dialog>
    </div>
  );
}
