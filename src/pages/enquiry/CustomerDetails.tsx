import {
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { BaseSyntheticEvent, useState } from 'react';
import useIsMobile from '../../hooks/useIsMobile';

const CustomerDetails = () => {
  const isMobile = useIsMobile();
  const gridXs = isMobile ? 12 : 4;
  const [isNewCustomer, setIsNewCustomer] = useState<boolean>(true);
  return (
    <>
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
              onChange={(e: BaseSyntheticEvent) => {
                //
              }}
            />
          </Grid>
          <Grid item xs={gridXs}>
            <TextField
              variant='filled'
              size='small'
              fullWidth
              label='Customer organization'
              onChange={(e: BaseSyntheticEvent) => {
                //
              }}
            />
          </Grid>
          <Grid item xs={gridXs}>
            <TextField
              variant='filled'
              size='small'
              fullWidth
              label='Customer phone'
              onChange={(e: BaseSyntheticEvent) => {
                //
              }}
            />
          </Grid>
          <Grid item xs={gridXs}>
            <TextField
              variant='filled'
              size='small'
              fullWidth
              label='Customer email'
              onChange={(e: BaseSyntheticEvent) => {
                //
              }}
            />
          </Grid>
          <Grid item xs={gridXs}>
            <TextField
              variant='filled'
              size='small'
              fullWidth
              label='Customer address'
              onChange={(e: BaseSyntheticEvent) => {
                //
              }}
            />
          </Grid>
        </Grid>
      ) : (
        'Existing'
      )}
    </>
  );
};

export default CustomerDetails;
