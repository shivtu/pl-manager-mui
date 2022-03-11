import { useEffect, useState } from 'react';

import { CircularProgress, Grid, Typography, TextField } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

import CButton from '../../components/buttons/CButton';
import ErrorDialog from '../../components/dialogs/error-dialog/ErrorDialog';
import { getMe, loginUser } from '../../services/http.services';
import { useDispatch } from 'react-redux';
import {
  updateAuthToken,
  updateLoggedInUser,
} from '../../redux/actions/actions';
import { useNavigate } from 'react-router-dom';
import { ILoggedInUser } from '../../utils/types';

const LoginPage = () => {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginFailDialog, setLoginFailDialog] = useState(false);
  const [loginError, setLogginError] = useState({ title: '', message: '' });
  const [token, setToken] = useState();
  const [user, setUser] = useState<ILoggedInUser>();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);

    const loginResult = await loginUser(userEmail, password);
    // If login request fails
    if (loginResult.message) {
      setLogginError({
        title: `Authentication failed`,
        message: `${
          loginResult.message ||
          'Sorry, we could not log you in. Please try again'
        }`,
      });
      setLoginFailDialog(true);
    }

    let currentUser;

    if (loginResult?.data?.token) {
      currentUser = await getMe(loginResult.data.token);
    }

    const authData = await Promise.all([loginResult, currentUser]);

    authData.forEach((v) => {
      if (v?.data?.token) {
        setToken(v.data.token);
      }

      if (v.data?.user) {
        const loggedInUser: ILoggedInUser = v.data?.user;
        setUser(loggedInUser);
      }
    });

    setLoading(false);
  };

  useEffect(() => {
    if (token && user) {
      dispatch(updateAuthToken(token));
      dispatch(updateLoggedInUser(user));
      navigate('/');
    }
  }, [token, user]);

  return loading ? (
    <CircularProgress style={{ marginTop: '30vh' }} />
  ) : (
    <Grid container spacing={4}>
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
          type='text'
          label='Email'
          onChange={(_e) => setUserEmail(_e.target.value)}
          value={userEmail}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label='Password'
          size='small'
          type='password'
          onChange={(_e) => setPassword(_e.target.value)}
          value={password}
        />
      </Grid>
      <Grid item xs={12}>
        <CButton
          endIcon={<LoginIcon />}
          label='Login'
          onClick={handleLogin}
          disabled={!userEmail || !password}
        />
      </Grid>
    </Grid>
  );
};

export default LoginPage;
