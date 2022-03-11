import { Button, SxProps, Theme } from '@mui/material';
import { useStyles } from '../styles';

const CButton = (props: {
  label: string;
  variant?: 'contained' | 'outlined' | 'text';
  endIcon?: JSX.Element;
  startIcon?: JSX.Element;
  disabled?: boolean;
  size?: 'large' | 'medium' | 'small';
  sx?: SxProps<Theme> | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) => {
  const classes = useStyles();

  return (
    <Button
      size={props.size || 'small'}
      disableElevation
      variant={props.variant || 'contained'}
      className={`${classes.marginSpace2} ${classes.flatBorder}`}
      endIcon={props.endIcon}
      startIcon={props.startIcon}
      disabled={props.disabled || false}
      onClick={props.onClick}
      sx={props.sx}
    >
      {props.label || ''}
    </Button>
  );
};

export default CButton;
