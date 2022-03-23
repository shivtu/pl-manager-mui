import {
  Autocomplete,
  AutocompleteChangeReason,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { SyntheticEvent } from 'react';
import { PROJECT_STAGES } from '../../utils/constants';
import { PROJECT_STAGE } from '../../utils/enums';
import { ProjectStageTypes } from '../../utils/types';

const ProjectStageDropdown = ({
  onChange,
  defaultValue,
}: {
  onChange?:
    | ((
        event: SyntheticEvent<Element, Event>,
        value: PROJECT_STAGE | null,
        reason: AutocompleteChangeReason
      ) => void)
    | undefined;
  defaultValue?: ProjectStageTypes;
}) => {
  return (
    <Autocomplete
      size='small'
      options={PROJECT_STAGES}
      getOptionLabel={(option) => option}
      defaultValue={defaultValue || PROJECT_STAGE.GENESIS}
      onChange={onChange}
      clearOnEscape
      renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
        <TextField
          helperText='Stage of project'
          {...params}
          label='Project stage'
          variant='filled'
        />
      )}
    />
  );
};

export default ProjectStageDropdown;
