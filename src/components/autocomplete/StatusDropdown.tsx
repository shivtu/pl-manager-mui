import {
  Autocomplete,
  AutocompleteChangeReason,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { SyntheticEvent } from 'react';
import { PROJECT_STATUSES } from '../../utils/constants';
import { PROJECT_STATUS } from '../../utils/enums';
import { ProjectStatusTypes } from '../../utils/types';

const ProjectStatusDropdown = ({
  onChange,
  textFieldLabel,
  defaultValue,
  helperText,
}: {
  onChange?:
    | ((
        event: SyntheticEvent<Element, Event>,
        value: PROJECT_STATUS | null,
        reason: AutocompleteChangeReason
      ) => void)
    | undefined;
  textFieldLabel: string;
  defaultValue?: ProjectStatusTypes;
  renderHelperText?: boolean;
  helperText?: string;
}) => {
  return (
    <Autocomplete
      sx={{ minWidth: '196px' }}
      size='small'
      options={PROJECT_STATUSES}
      getOptionLabel={(option) => option}
      defaultValue={defaultValue || PROJECT_STATUS.CREATED}
      onChange={onChange}
      clearOnEscape
      renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
        <TextField
          helperText={helperText || ''}
          {...params}
          label={textFieldLabel}
          variant='filled'
        />
      )}
    />
  );
};

export default ProjectStatusDropdown;
