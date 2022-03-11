import { useEffect, useState } from 'react';
import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ErrorDialog from '../../components/dialogs/error-dialog/ErrorDialog';
import { updateAuthToken } from '../../redux/actions/actions';
import { loginUser } from '../../utils/httpServices';

const LoginPage = () => {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginFailDialog, setLoginFailDialog] = useState(false);
  const [loginError, setLogginError] = useState({ title: '', message: '' });
  const [token, setToken] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);

    const loginResult = await loginUser(userEmail, password);

    if (loginResult.data?.success) {
      localStorage.setItem('authToken', loginResult.data.token);
      setToken(loginResult.data.token);
    } else {
      setLogginError({
        title: `${loginResult.status || 'Server Error'}`,
        message: `${loginResult.statusText || 'Something went wrong'}`,
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    if (token) dispatch(updateAuthToken(token));
    navigate('/');
  }, [token]);

  return loading ? (
    <CircularProgress style={{ marginTop: '30vh' }} />
  ) : (
    <Grid container spacing={2}>
      {loginFailDialog && (
        <ErrorDialog
          open={true}
          onClose={() => setLoginFailDialog(false)}
          dialogTitle={loginError.title}
          dialogContent={loginError.message}
        />
      )}
      <Grid item xs={12}>
        <Typography
          style={{ marginTop: '100px', marginBottom: '50px' }}
          variant='h5'
        >
          Magnum Engineers
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          size='small'
          label='Email'
          type='text'
          variant='filled'
          onChange={(_e) => setUserEmail(_e.target.value)}
          value={userEmail}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          size='small'
          variant='filled'
          label='Password'
          type='password'
          onChange={(_e) => setPassword(_e.target.value)}
          value={password}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant='contained'
          endIcon={<LoginIcon />}
          onClick={handleLogin}
          disabled={!userEmail || !password}
        >
          Login
        </Button>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
