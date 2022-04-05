import { Grid, TextField } from '@mui/material';
import { useState } from 'react';
import GovIDProofDropdown from '../../components/autocomplete/GovIDProofDropdown';
import CButton from '../../components/buttons/CButton';
import useIsMobile from '../../hooks/useIsMobile';
import { GOV_ID_PROOF_TYPES } from '../../utils/enums';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export default function AddNewUserPage() {
  const isMobile = useIsMobile();

  const gridXs = isMobile ? 6 : 4;

  const [idProofType, setIdProofType] = useState<GOV_ID_PROOF_TYPES | null>(
    null
  );

  const handleIDProofDropdown = (
    event: any,
    newValue: GOV_ID_PROOF_TYPES | null
  ) => {
    setIdProofType(newValue);
  };

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
          />
        </Grid>
        <Grid item xs={gridXs}>
          <TextField
            variant='filled'
            size='small'
            fullWidth
            label='User email'
          />
        </Grid>
        <Grid item xs={gridXs}>
          <TextField
            variant='filled'
            size='small'
            fullWidth
            label='Phone number'
            type='number'
          />
        </Grid>
        <Grid item xs={6}>
          <TextField variant='filled' size='small' fullWidth label='Address' />
        </Grid>
        <Grid item xs={gridXs}>
          <TextField
            variant='filled'
            size='small'
            fullWidth
            label='Initial password'
            type='password'
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
          />
        </Grid>
      </Grid>
      <Grid
        container
        direction='row'
        justifyContent='flex-end'
        alignItems='center'
      >
        <CButton label='Add user' endIcon={<PersonAddAltIcon />} />
        <CButton label='Reset form' endIcon={<RestartAltIcon />} />
      </Grid>
    </>
  );
}
