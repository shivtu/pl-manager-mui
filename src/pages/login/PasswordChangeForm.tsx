import { Stack, TextField } from '@mui/material';
import { BaseSyntheticEvent, Dispatch, SetStateAction } from 'react';

const PasswordChangeForm = ({
  passwordChangeParams,
  setPasswordChangeParams,
}: {
  passwordChangeParams: {
    userEmail: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  setPasswordChangeParams: Dispatch<
    SetStateAction<{
      userEmail: string;
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
    }>
  >;
}) => {
  return (
    <Stack spacing={1}>
      <TextField
        label='Email'
        type='text'
        size='small'
        fullWidth
        value={passwordChangeParams.userEmail}
        onChange={(e: BaseSyntheticEvent) =>
          setPasswordChangeParams({
            ...passwordChangeParams,
            ...{ userEmail: e.target.value },
          })
        }
      />
      <TextField
        label='Current password'
        type='password'
        size='small'
        fullWidth
        value={passwordChangeParams.currentPassword}
        onChange={(e: BaseSyntheticEvent) =>
          setPasswordChangeParams({
            ...passwordChangeParams,
            ...{ currentPassword: e.target.value },
          })
        }
      />
      <TextField
        label='New password'
        type='password'
        size='small'
        fullWidth
        value={passwordChangeParams.newPassword}
        onChange={(e: BaseSyntheticEvent) =>
          setPasswordChangeParams({
            ...passwordChangeParams,
            ...{ newPassword: e.target.value },
          })
        }
      />
      <TextField
        label='Confirm password'
        type='password'
        size='small'
        fullWidth
        value={passwordChangeParams.confirmPassword}
        onChange={(e: BaseSyntheticEvent) =>
          setPasswordChangeParams({
            ...passwordChangeParams,
            ...{ confirmPassword: e.target.value },
          })
        }
      />
    </Stack>
  );
};

export default PasswordChangeForm;
