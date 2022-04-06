import { useEffect, useState } from 'react';

import {
  CircularProgress,
  Grid,
  Typography,
  TextField,
  Link,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

import CButton from '../../components/buttons/CButton';
import ErrorDialog from '../../components/dialogs/error-dialog/ErrorDialog';
import {
  getMe,
  loginUser,
  updateUserPassword,
} from '../../services/http.services';
import { useDispatch } from 'react-redux';
import {
  updateAuthToken,
  updateLoggedInUser,
} from '../../redux/actions/actions';
import { useNavigate } from 'react-router-dom';
import { ILoggedInUser } from '../../utils/types';
import FormsDialog from '../../components/dialogs/forms-dialog/FormsDialog';
import PasswordChangeForm from './PasswordChangeForm';

const initPasswordChangeParams = {
  userEmail: '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const LoginPage = () => {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginFailDialog, setLoginFailDialog] = useState(false);
  const [loginError, setLogginError] = useState({ title: '', message: '' });
  const [token, setToken] = useState();
  const [user, setUser] = useState<ILoggedInUser>();
  const [passwordChangeDialog, setPasswordChangeDialog] = useState(false);
  const [passwordChangeParams, setPasswordChangeParams] = useState(
    initPasswordChangeParams
  );
  const [passwordMismatchMsg, setPasswordMismatchMsg] = useState<string>();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getLoginError = (loginRes: any) => {
    if (loginRes.status === 400 && loginRes.data.error) {
      return {
        title: `Bad request`,
        message: `${loginRes.data.error}`,
      };
    }
    return {
      title: 'Authentication failed',
      message:
        loginRes.message || 'Sorry, we could not log you in, please try again',
    };
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const loginResult = await loginUser(userEmail, password);
      // If login request fails
      if (loginResult.message || loginResult.data.error) {
        setLogginError(getLoginError(loginResult));
        setLoginFailDialog(true);
        return;
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
    } catch (error) {
      setLogginError(getLoginError({}));
      setLoginFailDialog(true);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (
      passwordChangeParams.newPassword !== passwordChangeParams.confirmPassword
    ) {
      setPasswordMismatchMsg('passwords do not match');
    } else {
      setUserEmail(passwordChangeParams.userEmail);
      setPassword(passwordChangeParams.newPassword);
      const updatedPasswordRes = await updateUserPassword({
        userEmail: passwordChangeParams.userEmail,
        currentPassword: passwordChangeParams.currentPassword,
        password: passwordChangeParams.newPassword,
      });

      if (updatedPasswordRes.data.success) {
        setPasswordChangeDialog(false);
        handleLogin();
      }
    }
  };

  const disablePasswordUpdateBtn = (): boolean => {
    return (
      Boolean(!passwordChangeParams.userEmail) ||
      Boolean(!passwordChangeParams.currentPassword) ||
      Boolean(!passwordChangeParams.newPassword) ||
      Boolean(!passwordChangeParams.confirmPassword)
    );
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
      {passwordChangeDialog && (
        <FormsDialog
          open={passwordChangeDialog}
          dialogTitle='Create new password'
          dialogContentText={`First login requires to reset your password`}
          dialogFormFields={
            <PasswordChangeForm
              passwordChangeParams={passwordChangeParams}
              setPasswordChangeParams={setPasswordChangeParams}
            />
          }
          dialogActions={
            <CButton
              label='Update password'
              onClick={() => handlePasswordUpdate()}
              disabled={disablePasswordUpdateBtn()}
            />
          }
          handleClose={() => setPasswordChangeDialog(false)}
          passwordMismatchMsg={passwordMismatchMsg}
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
      <Grid item xs={12}>
        <Link
          component='button'
          variant='body2'
          onClick={() => {
            setPasswordChangeDialog(true);
          }}
        >
          Click here for first time login
        </Link>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
