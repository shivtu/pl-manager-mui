import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MUIDataTable, { MUIDataTableProps } from 'mui-datatables';

import useFetch from '../../hooks/useFetch';
import { updateProjects } from '../../redux/actions/actions';
import EditIcon from '@mui/icons-material/Edit';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { IAppState, IProjectResponseData } from '../../utils/types';
import { createTableData } from './projectsHelper';
import { CircularProgress } from '@mui/material';
import { host, REST_API_SERVICES } from '../../services/http.services';
import FullScreenDialog from '../../components/dialogs/full-screen-dialog/FullScreenDialog';
import CButton from '../../components/buttons/CButton';
import EditProjectPage from './EditProjectPage';
import ErrorDialog from '../../components/dialogs/error-dialog/ErrorDialog';

const CurrentProjectsPage = () => {
  const navigate = useNavigate();
  const [errorContent, setErrorContent] = useState();
  const [openEditProjectDialog, setOpenEditProjectDialog] = useState(false);
  const [rowToEdit, setRowToEdit] = useState<IProjectResponseData>();
  const appState: IAppState = useSelector((state) => state);

  const dispatch = useDispatch();

  const { loading, response, error } = useFetch(
    `${host}/${REST_API_SERVICES.PROJECTS.FIND}?status[$ne]=Completed`,
    'get',
    { Authorization: `Bearer ${appState.token}` || '' },
    undefined
  );

  const tableData = createTableData(appState.projects);
  const columns = ['Project', 'Summary', 'Status', 'Current Owner'];

  const handleRowSelect = (selectedRows: {
    data: any;
    lookup?: { [key: number]: boolean };
  }) => {
    const selectedRowIndex: number = selectedRows.data[0].index;
    if (appState.projects?.length) {
      setRowToEdit(appState.projects[selectedRowIndex]);
      setOpenEditProjectDialog(true);
    }
  };

  const options: MUIDataTableProps['options'] = {
    filterType: 'multiselect',
    selectableRows: 'single',
    selectableRowsOnClick: true,
    customToolbarSelect: (selectedRows, displayData) => {
      // console.log('displayData', displayData[selectedRows.data[0].index]);
      return (
        <CButton
          label='Edit'
          onClick={() => handleRowSelect(selectedRows)}
          variant='contained'
          startIcon={<EditIcon />}
        />
      );
    },
    customToolbar: () => (
      <CButton
        label='New Project'
        startIcon={<AccountTreeIcon />}
        onClick={() => navigate('/new-project')}
      />
    ),
  };

  useEffect(() => {
    if (response?.data) dispatch(updateProjects(response.data.result));
    if (error) setErrorContent(error);
  }, [response, error]);

  return (
    <>
      {errorContent && (
        <ErrorDialog
          dialogTitle='Unable to find projects data'
          dialogContent={`${errorContent}`}
          open={true}
          onClose={() => setErrorContent(undefined)}
        />
      )}
      {rowToEdit && (
        <FullScreenDialog
          open={openEditProjectDialog}
          content={<EditProjectPage projectDataToEdit={rowToEdit} />}
          onClose={() => setOpenEditProjectDialog(false)}
          onSave={() => console.log('save')}
          title={`Editing : ${rowToEdit?.projectName}`}
        />
      )}
      {loading ? (
        <CircularProgress size={100} />
      ) : (
        <MUIDataTable
          title={'Existing Projects'}
          data={tableData || []}
          columns={columns}
          options={options}
        />
      )}
    </>
  );
};

export default CurrentProjectsPage;
