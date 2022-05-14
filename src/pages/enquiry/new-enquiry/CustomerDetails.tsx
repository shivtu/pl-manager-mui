import {
  Divider,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import React, {
  BaseSyntheticEvent,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import CustomersDropdown from '../../../components/autocomplete/CustomersDropdown';
import useIsMobile from '../../../hooks/useIsMobile';
import { ICustomer } from '../../../utils/types';

interface ICustomerDetails {
  customerName: string;
  customerOrganization: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: string;
}

interface ICustomerDetailsProps {
  customerDetails: ICustomerDetails;
  setCustomerDetails: Dispatch<
    SetStateAction<{
      customerName: string;
      customerOrganization: string;
      customerPhone: string;
      customerEmail: string;
      customerAddress: string;
    }>
  >;
  setOptions: Dispatch<SetStateAction<ICustomer[]>>;
  options: ICustomer[];
}

const CustomerDetails = ({
  customerDetails,
  setCustomerDetails,
  setOptions,
  options,
}: ICustomerDetailsProps) => {
  const isMobile = useIsMobile();
  const gridXs = isMobile ? 12 : 4;
  const [isNewCustomer, setIsNewCustomer] = useState<boolean>(true);

  return (
    <>
      <Typography style={{ marginTop: '16px' }} variant='h5'>
        Add customer details
      </Typography>
      <Divider />
      <RadioGroup row>
        <FormControlLabel
          value='female'
          control={<Radio />}
          label='New customer'
          checked={isNewCustomer}
          onClick={() => setIsNewCustomer(!isNewCustomer)}
        />
        <FormControlLabel
          value='male'
          control={<Radio />}
          label='Existing customer'
          checked={!isNewCustomer}
          onClick={() => setIsNewCustomer(!isNewCustomer)}
        />
      </RadioGroup>
      {isNewCustomer ? (
        <Grid container spacing={2}>
          <Grid item xs={gridXs}>
            <TextField
              variant='filled'
              size='small'
              fullWidth
              label='Customer name'
              value={customerDetails.customerName}
              onChange={(e: BaseSyntheticEvent) =>
                setCustomerDetails({
                  ...customerDetails,
                  ...{ customerName: e.currentTarget.value },
                })
              }
            />
          </Grid>
          <Grid item xs={gridXs}>
            <TextField
              variant='filled'
              size='small'
              fullWidth
              label='Customer organization'
              value={customerDetails.customerOrganization}
              onChange={(e: BaseSyntheticEvent) =>
                setCustomerDetails({
                  ...customerDetails,
                  ...{ customerOrganization: e.currentTarget.value },
                })
              }
            />
          </Grid>
          <Grid item xs={gridXs}>
            <TextField
              variant='filled'
              size='small'
              fullWidth
              label='Customer phone'
              value={customerDetails.customerPhone}
              onChange={(e: BaseSyntheticEvent) =>
                setCustomerDetails({
                  ...customerDetails,
                  ...{ customerPhone: e.currentTarget.value },
                })
              }
            />
          </Grid>
          <Grid item xs={gridXs}>
            <TextField
              variant='filled'
              size='small'
              fullWidth
              label='Customer email'
              value={customerDetails.customerEmail}
              onChange={(e: BaseSyntheticEvent) =>
                setCustomerDetails({
                  ...customerDetails,
                  ...{ customerEmail: e.currentTarget.value },
                })
              }
            />
          </Grid>
          <Grid item xs={gridXs}>
            <TextField
              variant='filled'
              size='small'
              fullWidth
              label='Customer address'
              value={customerDetails.customerAddress}
              onChange={(e: BaseSyntheticEvent) =>
                setCustomerDetails({
                  ...customerDetails,
                  ...{ customerAddress: e.currentTarget.value },
                })
              }
            />
          </Grid>
        </Grid>
      ) : (
        <CustomersDropdown
          helperText='Select a customer from existing customers'
          setOptions={setOptions}
          options={options}
        />
      )}
    </>
  );
};

export default CustomerDetails;
