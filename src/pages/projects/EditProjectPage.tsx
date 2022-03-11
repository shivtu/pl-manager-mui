import { Grid, TextField, Typography } from '@mui/material';
import ProjectTypesDropdown from '../../components/autocomplete/ProjectTypesDropdown';
import { IProjectResponseData, ProjectType } from '../../utils/types';

const EditProjectPage = ({
  projectDataToEdit,
}: {
  projectDataToEdit: IProjectResponseData;
}) => {
  if (!projectDataToEdit) return <>404 Not found</>;

  return (
    <Grid
      container
      direction='row'
      justifyContent='flex-start'
      alignItems='center'
      spacing={2}
    >
      <Grid item xs={12}>
        <Typography variant='body1' sx={{ color: 'red' }}>
          [Some fields are disabled as those cannot be edited, only active
          fields can be updated]
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <TextField
          size='small'
          variant='filled'
          helperText='Name of the project'
          label='Project name'
          defaultValue={projectDataToEdit.projectName}
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          size='small'
          variant='filled'
          helperText='Name of the project'
          label='Summary'
          defaultValue={projectDataToEdit.summary}
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          size='small'
          variant='filled'
          helperText='Name of the project'
          label='Project description'
          defaultValue={projectDataToEdit.description}
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={4}>
        <ProjectTypesDropdown
          onChange={(
            event: React.SyntheticEvent<Element, Event>,
            newValue: ProjectType | null
          ) => {
            if (newValue) {
              // update state
            }
          }}
          defaultValue={projectDataToEdit.projectType}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          size='small'
          variant='filled'
          helperText='Name of the project'
          label='Date created'
          defaultValue={projectDataToEdit.createdAt}
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          size='small'
          variant='filled'
          helperText='Current owner'
          label='Current owner'
          defaultValue={projectDataToEdit.currentOwner.name}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          size='small'
          variant='filled'
          helperText='Current owner'
          label='Stage'
          defaultValue={projectDataToEdit.stage}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          size='small'
          variant='filled'
          helperText='Current owner'
          label='Status'
          defaultValue={projectDataToEdit.status}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          size='small'
          variant='filled'
          helperText='New task for this project'
          label='Add new task'
          defaultValue={'Design'}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default EditProjectPage;
