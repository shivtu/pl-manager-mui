import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserProfiles } from '../../services/http.services';
import { IAppState, ICurrentOwner } from '../../utils/types';

const UsersDropdown = ({
  currentOwner,

  helperText,
}: {
  currentOwner: ICurrentOwner;
  helperText?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<ICurrentOwner[]>([currentOwner]);
  const appState = useSelector((state: IAppState) => state);

  const loading = open && options.length === 0;

  useEffect(() => {
    if (!loading) return undefined;

    (async () => {
      const userProfiles = await getUserProfiles(`${appState.token}`);

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
          label='Owner'
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
