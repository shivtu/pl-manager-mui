import {
  Divider,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { BaseSyntheticEvent, Dispatch, SetStateAction, useState } from 'react';
import CustomersDropdown from '../../../components/autocomplete/CustomersDropdown';
import useIsMobile from '../../../hooks/useIsMobile';
import { ICustomer, ICustomerDetails } from '../../../utils/types';
import { useStyles } from '../../../styles';

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
  setCustomerList: Dispatch<SetStateAction<ICustomer[]>>;
  customerList: ICustomer[];
  setSelectedCustomer: Dispatch<SetStateAction<ICustomer | undefined>>;
}

const CustomerDetails = ({
  customerDetails,
  setCustomerDetails,
  setCustomerList,
  customerList,
  setSelectedCustomer,
}: ICustomerDetailsProps) => {
  const classes = useStyles();
  const isMobile = useIsMobile();
  const gridXs = isMobile ? 12 : 4;
  const [isNewCustomer, setIsNewCustomer] = useState<boolean>(true);

  return (
    <>
      <Typography className={classes.formTitle} variant='h5'>
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
          setCustomerList={setCustomerList}
          customerList={customerList}
          setSelectedCustomer={setSelectedCustomer}
        />
      )}
    </>
  );
};

export default CustomerDetails;
