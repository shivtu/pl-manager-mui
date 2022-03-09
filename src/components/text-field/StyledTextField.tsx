import { TextField } from '@mui/material';
import { FocusEventHandler } from 'react';
import { useStyles } from '../styles';

const StyledTextField = (props: {
  label: string;
  helperText?: string;
  placeHolder?: string;
  name?: string;
  id?: string;
  type?: string;
  onBlur?:
    | FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>
    | undefined;
  value?: string;
  defaultValue?: string;
  variant?: 'filled' | 'standard' | 'outlined';
  error?: boolean;
  onChange?:
    | React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
    | undefined;
}) => {
  const classes = useStyles();
  return (
    <TextField
      name={props.name}
      className={classes.textFieldWidth}
      size='small'
      label={props.label || ''}
      variant={props.variant || 'filled'}
      id={props.id}
      type={props.type || 'text'}
      value={props.value}
      helperText={props.helperText}
      defaultValue={props.defaultValue}
      error={props.error || false}
      onChange={props.onChange}
      onBlur={props.onBlur}
    />
  );
};

export default StyledTextField;
