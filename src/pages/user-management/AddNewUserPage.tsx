import {
  CircularProgress,
  Grid,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { BaseSyntheticEvent, useState } from 'react';
import GovIDProofDropdown from '../../components/autocomplete/GovIDProofDropdown';
import CButton from '../../components/buttons/CButton';
import useIsMobile from '../../hooks/useIsMobile';
import { GOV_ID_PROOF_TYPES } from '../../utils/enums';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import RolesAndAccessDropdown from '../../components/autocomplete/RolesAndAccessDropdown';
import {
  IAppState,
  ICreateUserPayload,
  ICreateUserProfilePayload,
  IUserDetails,
} from '../../utils/types';
import { createUser, createUserProfile } from '../../services/http.services';
import { useSelector } from 'react-redux';
import PositionedSnackbar from '../../components/snack-bar/PositionedSnackbar';
import { AlertColor } from '@mui/material/Alert';
import { SnackbarOrigin } from '@mui/material/Snackbar';
import { useStyles } from '../../styles';

export default function AddNewUserPage() {
  const initUserDetails = {
    userName: '',
    password: '',
    confirmPassword: '',
    userEmail: '',
    userRole: '',
    userAddress: '',
    userPhoneNumber: '',
    docId: '',
    docType: null,
  };

  const classes = useStyles();

  const appState = useSelector((state: IAppState) => state);

  const isMobile = useIsMobile();

  const gridXs = isMobile ? 6 : 4;

  const [selectedRole, setSelectedRole] = useState<string>('');
  const [accessToSelectedRole, setAccessToSelectedRole] = useState<string[]>(
    []
  );
  const [userDetails, setUserDetails] = useState<IUserDetails>(initUserDetails);
  const [snackBar, setSnackBar] = useState<{
    active: boolean;
    message: string;
    severity: AlertColor;
    vertical: SnackbarOrigin['vertical'];
    horizontal: SnackbarOrigin['horizontal'];
  }>({
    active: false,
    message: '',
    severity: 'error',
    vertical: 'top',
    horizontal: 'center',
  });
  const [loading, setLoading] = useState(false);

  const handleIDProofDropdown = (
    event: any,
    newValue: GOV_ID_PROOF_TYPES | null
  ) => {
    setUserDetails({ ...userDetails, ...{ docType: newValue } });
  };

  const saveUserProfile = async () => {
    const createProfilePayload: ICreateUserProfilePayload = {
      userName: userDetails.userName,
      userEmail: userDetails.userEmail,
      userRole: selectedRole,
      userPhoneNumber: Number(userDetails.userPhoneNumber),
      userAddress: userDetails.userAddress,
      userGovId: {
        docType: `${userDetails.docType}`,
        docId: userDetails.docId,
      },
    };

    return await createUserProfile(`${appState.token}`, createProfilePayload);
  };

  const saveUser = async (userProfileId: string) => {
    const user: ICreateUserPayload = {
      userEmail: userDetails.userEmail,
      password: userDetails.password,
      userRole: selectedRole,
      userProfile: userProfileId,
    };
    return await createUser(`${appState.token}`, user);
  };

  const handleAddUser = async () => {
    if (userDetails.password !== userDetails.confirmPassword) {
      setSnackBar({
        ...snackBar,
        ...{
          active: true,
          message: 'Passwords do not match',
          severity: 'error',
          vertical: 'top',
          horizontal: 'center',
        },
      });
      return;
    } else {
      try {
        setLoading(true);
        const userProfile = await saveUserProfile();
        const user = await saveUser(userProfile.data.result._id);
        if (user.data.success) {
          setSnackBar({
            active: true,
            message: `${user.data.result.userEmail} created successfully`,
            severity: 'success',
            vertical: 'top',
            horizontal: 'center',
          });
        }
      } catch (error) {
        setSnackBar({
          ...snackBar,
          ...{
            active: true,
            message: 'Unable to create user',
            severity: 'error',
            vertical: 'top',
            horizontal: 'center',
          },
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Typography className={classes.formTitle} variant='h5'>
        Add a new user
      </Typography>
      {loading && <CircularProgress size={200} />}
      {snackBar.active && (
        <PositionedSnackbar
          open={snackBar.active}
          message={snackBar.message}
          handleClose={() => setSnackBar({ ...snackBar, ...{ active: false } })}
          severity={snackBar.severity}
          vertical={snackBar.vertical}
          horizontal={snackBar.horizontal}
        />
      )}
      <Grid
        container
        direction='row'
        justifyContent='flex-start'
        alignItems='center'
        spacing={2}
      >
        <Grid item xs={gridXs}>
          <TextField
            variant='filled'
            size='small'
            fullWidth
            label='User name'
            value={userDetails.userName}
            onChange={(e: BaseSyntheticEvent) =>
              setUserDetails({
                ...userDetails,
                ...{ userName: e.target.value },
              })
            }
          />
        </Grid>
        <Grid item xs={gridXs}>
          <TextField
            variant='filled'
            size='small'
            fullWidth
            label='User email'
            value={userDetails.userEmail}
            onChange={(e: BaseSyntheticEvent) =>
              setUserDetails({
                ...userDetails,
                ...{ userEmail: e.target.value },
              })
            }
          />
        </Grid>
        <Grid item xs={gridXs}>
          <TextField
            variant='filled'
            size='small'
            fullWidth
            label='Phone number'
            value={userDetails.userPhoneNumber}
            onChange={(e: BaseSyntheticEvent) =>
              setUserDetails({
                ...userDetails,
                ...{ userPhoneNumber: e.target.value },
              })
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant='filled'
            size='small'
            fullWidth
            label='Address'
            value={userDetails.userAddress}
            onChange={(e: BaseSyntheticEvent) =>
              setUserDetails({
                ...userDetails,
                ...{ userAddress: e.target.value },
              })
            }
          />
        </Grid>
        <Grid item xs={gridXs}>
          <TextField
            variant='filled'
            size='small'
            fullWidth
            label='Initial password'
            type='password'
            value={userDetails.password}
            onChange={(e: BaseSyntheticEvent) =>
              setUserDetails({
                ...userDetails,
                ...{ password: e.target.value },
              })
            }
          />
        </Grid>
        <Grid item xs={gridXs}>
          <TextField
            variant='filled'
            size='small'
            fullWidth
            label='Confirm password'
            type='password'
            value={userDetails.confirmPassword}
            onChange={(e: BaseSyntheticEvent) =>
              setUserDetails({
                ...userDetails,
                ...{ confirmPassword: e.target.value },
              })
            }
          />
        </Grid>
        <Grid item xs={gridXs}>
          <RolesAndAccessDropdown
            setSelectedRole={setSelectedRole}
            setAccessToSelectedRole={setAccessToSelectedRole}
          />
        </Grid>
        <Grid item xs={gridXs}>
          <GovIDProofDropdown
            textFieldLabel='ID Proof'
            onChange={handleIDProofDropdown}
          />
        </Grid>
        <Grid
          item
          xs={gridXs}
          sx={{ display: userDetails.docType === 'others' ? 'block' : 'none' }}
        >
          <TextField
            variant='filled'
            size='small'
            fullWidth
            label='Document name'
            value={userDetails.docId}
            onChange={(e: BaseSyntheticEvent) =>
              setUserDetails({
                ...userDetails,
                ...{ docId: e.target.value },
              })
            }
          />
        </Grid>
        <Grid
          xs={gridXs}
          item
          sx={{ display: userDetails.docType ? 'block' : 'none' }}
        >
          <TextField
            variant='filled'
            size='small'
            fullWidth
            label={
              userDetails.docType === 'others'
                ? 'Document number'
                : `${userDetails.docType} number`
            }
            value={userDetails.docId}
            onChange={(e: BaseSyntheticEvent) =>
              setUserDetails({
                ...userDetails,
                ...{ docId: e.target.value },
              })
            }
          />
        </Grid>
      </Grid>
      <Grid
        container
        direction='row'
        justifyContent='flex-end'
        alignItems='center'
      >
        <CButton
          label='Add user'
          endIcon={<PersonAddAltIcon />}
          onClick={handleAddUser}
        />
      </Grid>
      {accessToSelectedRole?.length ? (
        <Stack
          direction='column'
          justifyContent='flex-start'
          alignItems='flex-start'
          spacing={1}
        >
          <Typography variant='subtitle1'>{`${selectedRole} role has access to the following paths : `}</Typography>
          <List>
            {accessToSelectedRole.map((r) => (
              <ListItem key={r}>{`/${r}`}</ListItem>
            ))}
          </List>
        </Stack>
      ) : null}
    </>
  );
}
