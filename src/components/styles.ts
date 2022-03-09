import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  marginSpace2: {
    margin: theme.spacing(1),
  },
  flatBorder: {
    borderRadius: 0,
  },
  textFieldWidth: {
    width: 250,
  },
}));
