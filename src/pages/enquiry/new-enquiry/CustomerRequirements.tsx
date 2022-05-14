import { Grid, TextField, Typography } from '@mui/material';
import { BaseSyntheticEvent, Dispatch, SetStateAction } from 'react';

const CustomerRequirements = ({
  customerRequirements,
  setCustomerRequirements,
}: {
  customerRequirements: {
    shortDescription: string;
    description: string;
  };
  setCustomerRequirements: Dispatch<
    SetStateAction<{
      shortDescription: string;
      description: string;
    }>
  >;
}) => {
  return (
    <>
      <Typography style={{ marginTop: '16px' }} variant='h5'>
        Add customer requirements
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant='filled'
            size='small'
            fullWidth
            label='Short description of the requirements'
            value={customerRequirements.shortDescription}
            onChange={(e: BaseSyntheticEvent) => {
              setCustomerRequirements({
                ...customerRequirements,
                ...{ shortDescription: e.currentTarget.value },
              });
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            multiline
            minRows={3}
            size='small'
            fullWidth
            label='Detailed description of the requirements'
            value={customerRequirements.description}
            onChange={(e: BaseSyntheticEvent) => {
              setCustomerRequirements({
                ...customerRequirements,
                ...{ description: e.currentTarget.value },
              });
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CustomerRequirements;
