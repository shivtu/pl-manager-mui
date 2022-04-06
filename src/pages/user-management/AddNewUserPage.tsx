import {
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
import { IUserDetails } from '../../utils/types';

export default function AddNewUserPage() {
  const initUserDetails = {
    userName: '',
    password: '',
    userEmail: '',
    userRole: '',
    userAddress: '',
    userPhoneNumber: '',
    docId: '',
    docType: '',
  };

  const isMobile = useIsMobile();

  const gridXs = isMobile ? 6 : 4;

  const [idProofType, setIdProofType] = useState<GOV_ID_PROOF_TYPES | null>(
    null
  );
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [accessToSelectedRole, setAccessToSelectedRole] = useState<string[]>(
    []
  );
  const [userDetails, setUserDetails] = useState<IUserDetails>(initUserDetails);

  const handleIDProofDropdown = (
    event: any,
    newValue: GOV_ID_PROOF_TYPES | null
  ) => {
    setIdProofType(newValue);
  };

  const handleAddUser = () => {};

  return (
    <>
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
          sx={{ display: idProofType === 'others' ? 'block' : 'none' }}
        >
          <TextField
            variant='filled'
            size='small'
            fullWidth
            label='Document name'
            value={userDetails.docType}
            onChange={(e: BaseSyntheticEvent) =>
              setUserDetails({
                ...userDetails,
                ...{ docType: e.target.value },
              })
            }
          />
        </Grid>
        <Grid xs={gridXs} item sx={{ display: idProofType ? 'block' : 'none' }}>
          <TextField
            variant='filled'
            size='small'
            fullWidth
            label={
              idProofType === 'others'
                ? 'Document number'
                : `${idProofType} number`
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
