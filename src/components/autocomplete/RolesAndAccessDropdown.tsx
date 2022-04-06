import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import {
  BaseSyntheticEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { getRolesAndAccessList } from '../../services/http.services';

const RolesAndAccessDropdown = ({
  helperText,
  setSelectedRole,
  setAccessToSelectedRole,
}: {
  helperText?: string;
  setSelectedRole: Dispatch<SetStateAction<string>>;
  setAccessToSelectedRole: Dispatch<SetStateAction<string[]>>;
}) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [rolesAndAccess, setRolesAndAccess] = useState<{
    [key: string]: string[];
  }>({});

  const loading = open && options.length === 0;

  const handleChange = (e: BaseSyntheticEvent, value: string) => {
    setSelectedRole(value);
    setAccessToSelectedRole(rolesAndAccess[value]);
  };

  useEffect(() => {
    if (!loading) return undefined;

    if (!options.length) {
      (async () => {
        const rolesAndAccessList = await getRolesAndAccessList();
        setRolesAndAccess(rolesAndAccessList.data.result);
        const list = Object.keys(rolesAndAccessList.data.result);

        setOptions(list);
      })();
    }
  }, [loading]);

  useEffect(() => {
    if (!open && !options.length) setOptions([]);
  }, [open]);

  return (
    <>
      <Autocomplete
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
        onChange={(e: any, value: any) => handleChange(e, value)}
        getOptionLabel={(option) => option}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            variant='filled'
            {...params}
            label='Roles'
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
      {}
    </>
  );
};

export default RolesAndAccessDropdown;
