import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Grid, Typography } from '@mui/material';
import CButton from '../../buttons/CButton';
import useIsMobile from '../../../hooks/useIsMobile';

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
  title,
  content,
}: {
  open: boolean;
  onClose: () => any;
  onSave: () => any;
  title?: string;
  content: JSX.Element;
}) {
  const isMobile = useIsMobile();
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <Grid
            container
            direction={isMobile ? 'column' : 'row'}
            justifyContent='space-between'
            alignItems='center'
          >
            <Grid item>
              <CButton
                onClick={onClose}
                startIcon={<CloseIcon />}
                size={isMobile ? 'small' : 'large'}
                label='Cancel'
              />
            </Grid>
            <Grid item>
              <Typography variant='h5'>{title}</Typography>
            </Grid>

            <Grid item>
              <CButton
                onClick={onSave}
                startIcon={<CheckIcon />}
                size={isMobile ? 'small' : 'large'}
                label='Save'
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {content}
    </Dialog>
  );
}
