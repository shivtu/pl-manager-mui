import { Grid, TextField } from '@mui/material';
import { BaseSyntheticEvent } from 'react';

const CustomerRequirements = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          variant='filled'
          size='small'
          fullWidth
          label='Short description of the requirements'
          onChange={(e: BaseSyntheticEvent) => {
            //
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
          onChange={(e: BaseSyntheticEvent) => {
            //
          }}
        />
      </Grid>
    </Grid>
  );
};

export default CustomerRequirements;
