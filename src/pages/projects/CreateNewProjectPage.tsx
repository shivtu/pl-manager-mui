import React, { useState } from 'react';
import {
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import InfiniteList from '../../components/dynamic-lists/InfiniteList';
import CButton from '../../components/buttons/CButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import {
  IAppState,
  ICurrentOwner,
  IMessageDialogProps,
  INewProjectData,
  ProjectTypeTypes,
} from '../../utils/types';
import { PROJECT_STAGE, PROJECT_STATUS, PROJECT_TYPE } from '../../utils/enums';
import useIsMobile from '../../hooks/useIsMobile';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createNewProject } from '../../services/http.services';
import ProjectTypesDropdown from '../../components/autocomplete/ProjectTypesDropdown';
import MessageDialog from '../../components/dialogs/message-dialog/MessageDialog';

const CreateNewProjectPage = () => {
  const appState = useSelector((state: IAppState) => state);
  const navigate = useNavigate();

  const currentOwner: ICurrentOwner = {
    userEmail: appState.loggedInUser?.userEmail || '',
    userName: appState.loggedInUser?.userName || '',
    userPhoneNumber: appState.loggedInUser?.userPhoneNumber || 0,
    userId: appState.loggedInUser?._id || '',
  };

  const initNewProjectData = {
    projectRequirements: [],
    projectName: '',
    summary: '',
    description: '',
    projectType: PROJECT_TYPE.OTHERS,
    currentOwner: currentOwner,
    stage: PROJECT_STAGE.GENESIS,
    status: PROJECT_STATUS.ACCEPTED,
  };
  const [newProjectData, setnewProjectData] =
    useState<INewProjectData>(initNewProjectData);

  const [loader, setLoader] = useState(false);

  const [listItem, setListItem] = useState<string>('');

  const [responseDialog, setResponseDialog] = useState<IMessageDialogProps>({
    dialogTitle: '',
    dialogContent: '',
    open: false,
    dialogType: 'success',
  });

  const isMobile = useIsMobile();
  const gridItemXs = isMobile ? 12 : 6;

  const handleDeleteItem = (selectedValue: string) => {
    const filteredList = newProjectData.projectRequirements.filter(
      (v) => v !== selectedValue
    );
    setnewProjectData({
      ...newProjectData,
      ...{
        projectRequirements: [...filteredList],
      },
    });
  };

  const handleOnAddListItem = () => {
    if (listItem) {
      setnewProjectData({
        ...newProjectData,
        ...{
          projectRequirements: [
            ...newProjectData.projectRequirements,
            listItem,
          ],
        },
      });

      setListItem('');
    }
  };

  const handleSaveNewProject = async () => {
    if (appState.token && appState.loggedInUser) {
      try {
        setLoader(true);
        const newProject = await createNewProject(
          appState.token,
          newProjectData
        );
        const res = newProject.data.result;
        setResponseDialog({
          dialogTitle: `${res.projectName} created!`,
          dialogContent: `Summary: ${res.summary}, Assigned to: ${res.currentOwner.name} `,
          open: true,
          dialogType: 'success',
        });
        setnewProjectData(initNewProjectData);
        setListItem('');
        setLoader(false);
      } catch (error) {
        setLoader(false);
        setResponseDialog({
          dialogTitle: `Error creating project`,
          dialogContent: `Error: ${error}`,
          open: true,
          dialogType: 'error',
        });
      }
    }
  };

  const disableSaveProjectButton = (): boolean =>
    !newProjectData.projectName ||
    !newProjectData.summary ||
    newProjectData.projectRequirements.length === 0;

  return (
    <>
      {
        <MessageDialog
          dialogTitle={responseDialog.dialogTitle}
          dialogContent={responseDialog.dialogContent}
          dialogActions={
            <CButton
              label='Ok'
              onClick={() =>
                setResponseDialog({ ...responseDialog, ...{ open: false } })
              }
            />
          }
          open={responseDialog.open}
          dialogType={responseDialog.dialogType}
          onClose={() =>
            setResponseDialog({ ...responseDialog, ...{ open: false } })
          }
        />
      }
      {loader ? (
        <CircularProgress size={200} />
      ) : (
        <>
          <Grid
            container
            direction='row'
            justifyContent='flex-start'
            alignItems='center'
            spacing={2}
          >
            <Grid
              container
              direction='row'
              justifyContent='space-between'
              alignItems='center'
            >
              <Grid item>
                <IconButton onClick={() => navigate('/projects')}>
                  <ArrowBackIcon />
                </IconButton>
              </Grid>

              <Grid item>
                <CButton
                  size='small'
                  label='Save This Project'
                  startIcon={<AccountTreeIcon />}
                  disabled={disableSaveProjectButton()}
                  onClick={handleSaveNewProject}
                />
              </Grid>
            </Grid>
            <Grid item xs={gridItemXs}>
              <TextField
                size='small'
                variant='filled'
                helperText='Name of the project'
                label='Project name'
                fullWidth
                value={newProjectData.projectName}
                onChange={(event: React.BaseSyntheticEvent) =>
                  setnewProjectData({
                    ...newProjectData,
                    ...{ projectName: event.target.value },
                  })
                }
              />
            </Grid>
            <Grid item xs={gridItemXs}>
              <TextField
                size='small'
                variant='filled'
                helperText='Summary of the project'
                label='Project summary'
                fullWidth
                value={newProjectData.summary}
                onChange={(event: React.BaseSyntheticEvent) =>
                  setnewProjectData({
                    ...newProjectData,
                    ...{ summary: event.target.value },
                  })
                }
              />
            </Grid>
            <Grid item xs={gridItemXs}>
              <ProjectTypesDropdown
                onChange={(
                  event: React.SyntheticEvent<Element, Event>,
                  newValue: ProjectTypeTypes | null
                ) => {
                  if (newValue) {
                    setnewProjectData({
                      ...newProjectData,
                      ...{ projectType: newValue },
                    });
                  }
                }}
              />
            </Grid>
            <Grid item xs={gridItemXs}>
              <TextField
                size='small'
                variant='filled'
                helperText='Description of the project'
                label='Project Description'
                fullWidth
                onChange={(event: React.BaseSyntheticEvent) =>
                  setnewProjectData({
                    ...newProjectData,
                    ...{ description: event.target.value },
                  })
                }
              />
            </Grid>
          </Grid>
          <Typography variant='h6'>
            Project Requirement List (for design phase)
          </Typography>
          <InfiniteList
            list={newProjectData.projectRequirements}
            listItem={listItem}
            setListItem={setListItem}
            handleOnAddListItem={handleOnAddListItem}
            handleDeleteItem={handleDeleteItem}
          />
        </>
      )}
    </>
  );
};

export default CreateNewProjectPage;
