import { Button } from '@mui/material';

const StyledButton = (props: { buttonLabel: string; onChange: () => void }) => {
  return <Button onChange={props.onChange}>{props.buttonLabel}</Button>;
};

export default StyledButton;
