import {
  Autocomplete,
  AutocompleteChangeReason,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { SyntheticEvent } from 'react';
import { PROJECT_TYPES } from '../../utils/constants';
import { PROJECT_TYPE } from '../../utils/enums';
import { ProjectTypeTypes } from '../../utils/types';

const ProjectTypesDropdown = ({
  onChange,
  defaultValue,
}: {
  onChange?:
    | ((
        event: SyntheticEvent<Element, Event>,
        value: PROJECT_TYPE | null,
        reason: AutocompleteChangeReason
      ) => void)
    | undefined;
  defaultValue?: ProjectTypeTypes;
}) => {
  return (
    <Autocomplete
      size='small'
      options={PROJECT_TYPES}
      getOptionLabel={(option) => option}
      defaultValue={defaultValue || PROJECT_TYPE.OTHERS}
      onChange={onChange}
      clearOnEscape
      renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
        <TextField
          helperText='Type of project'
          {...params}
          label='Project type'
          variant='filled'
        />
      )}
    />
  );
};

export default ProjectTypesDropdown;
