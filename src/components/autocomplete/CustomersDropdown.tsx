import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCustomers } from '../../services/http.services';
import { IAppState, ICustomer } from '../../utils/types';

const CustomersDropdown = ({
  helperText,
  options,
  setOptions,
}: {
  helperText?: string;
  options: ICustomer[];
  setOptions: any;
}) => {
  const [open, setOpen] = useState(false);
  const [emptyListMessage, setEmptyListMessgae] = useState<string>();

  const appState = useSelector((state: IAppState) => state);

  const loading = open && options.length === 0;

  useEffect(() => {
    if (!loading) return undefined;

    (async () => {
      const userProfiles = await getCustomers(`${appState.token}`);

      const userProfileList: ICustomer[] = userProfiles.data.result;
      if (!userProfileList.length) setEmptyListMessgae('No data available');
      setOptions(userProfileList);
    })();
  }, [loading]);

  useEffect(() => {
    if (!open) setOptions([]);
  }, [open]);

  return (
    <>
      {!emptyListMessage ? (
        <Autocomplete
          size='small'
          id='asynchronous-cusomer-list'
          sx={{ minWidth: 196 }}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          isOptionEqualToValue={(option, value) =>
            option.customerName === value.customerName
          }
          getOptionLabel={(option) =>
            `${option.customerName} from ${option.customerOrganization}`
          }
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
      ) : (
        emptyListMessage
      )}
    </>
  );
};

export default CustomersDropdown;
