import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MUIDataTable, { MUIDataTableProps } from 'mui-datatables';

import useFetch from '../../hooks/useFetch';
import { updateProjects } from '../../redux/actions/actions';
import EditIcon from '@mui/icons-material/Edit';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { IAppState } from '../../utils/types';
import { createTableData } from './projectsHelper';
import { Button, Grid, Paper } from '@mui/material';
import CreateNewProjectPage from './CreateNewProjectPage';
import { host, REST_API_SERVICES } from '../../utils/httpServices';
import FullScreenDialog from '../../components/dialogs/full-screen-dialog/FullScreenDialog';

const CurrentProjectsPage = () => {
  const navigate = useNavigate();
  const [errorContent, setErrorContent] = useState();
  const [openNewProjectDialog, setOpenNewProjectDialog] = useState(false);
  const appState: IAppState = useSelector((state) => state);

  const dispatch = useDispatch();

  const { result, error } = useFetch(
    `${host}/${REST_API_SERVICES.PROJECTS.FIND}`,
    'get',
    { Authorization: `Bearer ${appState.token}` || '' },
    undefined
  );

  console.log('RESULT>>>', result?.data.data);

  useEffect(() => {
    if (result?.data) dispatch(updateProjects(result.data.data));
    if (error) setErrorContent(error);
  }, [result, error]);

  const tableData = createTableData(appState.projects);

  const columns = ['Project', 'Summary', 'Status'];

  const options: MUIDataTableProps['options'] = {
    filterType: 'checkbox',
    selectableRows: 'single',
    onRowClick: (data: any) => console.log('>>>', data),
    customToolbarSelect: (selectedRows: any) => (
      <Button onClick={() => null} variant='contained' startIcon={<EditIcon />}>
        Edit
      </Button>
    ),
    customToolbar: () => (
      <Button
        startIcon={<AccountTreeIcon />}
        onClick={() => navigate('/new-project')}
      >
        New Project
      </Button>
    ),
  };

  return (
    <Paper>
      {errorContent && (
        <></>
        // <ErrorDialog
        //   dialogTitle='Unable to find projects data'
        //   dialogContent={`${errorContent}`}
        //   open={true}
        //   onClose={() => setErrorContent(undefined)}
        // />
      )}
      {/* <FullScreenDialog
        open={openNewProjectDialog}
        content={<CreateNewProjectPage />}
        onClose={() => setOpenNewProjectDialog(false)}
        onSave={() => console.log('save')}
      /> */}
      <MUIDataTable
        title={'Existing Projects'}
        data={tableData}
        columns={columns}
        options={options}
      />
    </Paper>
  );
};

export default CurrentProjectsPage;
