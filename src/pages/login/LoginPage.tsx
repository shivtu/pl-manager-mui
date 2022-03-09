import { useState } from 'react';
import {
  Button,
  CircularProgress,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading ? (
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='center'
          style={{ paddingTop: 200 }}
        >
          <CircularProgress size={80} />
        </Grid>
      ) : (
        <Stack spacing={8} alignItems='center'>
          <Typography variant='h6'>Magnum Engineers</Typography>
          <TextField
            label='User ID'
            type='text'
            size='small'
            variant='filled'
          />
          <TextField
            label='password'
            type='password'
            size='small'
            variant='filled'
          />
          <Button endIcon={<LoginIcon />} variant='contained'>
            Login
          </Button>
        </Stack>
      )}
    </>
  );
};

export default LoginPage;
