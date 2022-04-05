import {
  Autocomplete,
  AutocompleteChangeReason,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { SyntheticEvent } from 'react';
import { GOV_ID_PROOF_DOCS } from '../../utils/constants';
import { GOV_ID_PROOF_TYPES } from '../../utils/enums';
import { GovDocTypes } from '../../utils/types';

const GovIDProofDropdown = ({
  onChange,
  textFieldLabel,
  defaultValue,
  helperText,
}: {
  onChange?:
    | ((
        event: SyntheticEvent<Element, Event>,
        value: GOV_ID_PROOF_TYPES | null,
        reason: AutocompleteChangeReason
      ) => void)
    | undefined;
  textFieldLabel: string;
  defaultValue?: GovDocTypes;
  renderHelperText?: boolean;
  helperText?: string;
}) => {
  return (
    <Autocomplete
      sx={{ minWidth: '196px' }}
      size='small'
      options={GOV_ID_PROOF_DOCS}
      getOptionLabel={(option) => option}
      defaultValue={defaultValue}
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

export default GovIDProofDropdown;
