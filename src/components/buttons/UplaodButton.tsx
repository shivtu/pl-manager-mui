import { Button } from '@mui/material';
import { useStyles } from '../styles';

const UploadButton = ({
  label,
  onChange,
  endIcon = null,
  startIcon = null,
}: {
  label: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  endIcon?: JSX.Element | null;
  startIcon?: JSX.Element | null;
}) => {
  const classes = useStyles();
  return (
    <label htmlFor='contained-button-file'>
      <input
        style={{ display: 'none' }}
        id='contained-button-file'
        multiple
        type='file'
        onChange={onChange}
      />
      <Button
        className={`${classes.marginSpace2} ${classes.flatBorder}`}
        size='small'
        variant='contained'
        component='span'
        endIcon={endIcon}
        startIcon={startIcon}
      >
        {label}
      </Button>
    </label>
  );
};

export default UploadButton;
