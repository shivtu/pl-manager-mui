import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { getUserProfiles } from '../../services/http.services';
import { ICurrentOwner } from '../../utils/types';

const UsersDropdown = ({
  currentOwner,
  token,
  helperText,
}: {
  currentOwner: ICurrentOwner;
  token: string;
  helperText?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<ICurrentOwner[]>([currentOwner]);

  const loading = open && options.length === 0;

  useEffect(() => {
    if (!loading) return undefined;

    (async () => {
      const userProfiles = await getUserProfiles(token);

      const userProfileList: ICurrentOwner[] = userProfiles.data.result;

      setOptions(userProfileList);
    })();
  }, [loading]);

  useEffect(() => {
    if (!open) setOptions([]);
  }, [open]);

  return (
    <Autocomplete
      defaultValue={currentOwner}
      size='small'
      id='asynchronous-user-list'
      sx={{ minWidth: 196 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) =>
        option.userName === value.userName
      }
      getOptionLabel={(option) => option.userName}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          variant='filled'
          {...params}
          label='Assign to'
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color='inherit' size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          helperText={helperText}
        />
      )}
    />
  );
};

export default UsersDropdown;
