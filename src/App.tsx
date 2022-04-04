/**TODO LIST:
 * 1. Add Purchase, Production, Assembly, Testing task list on EditProjectPage
 * 2. Update existing project on "SAVE" button click on EditProjectPage
 * 3. Table for completed projects
 * 4. Table for completed designs
 * 5. PendingPOPage
 * 6. Completed POPage
 * 7. ProductionPage
 * 8. AssemblyPage
 * 9. TEstingPage
 * 10. ProjectCostPage
 * 11. Analytics Page using MS sandDance
 * 12. Add Language support
 * 13. Keep side-menu open if not mobile view
 */
import { Paper } from '@mui/material';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { green, blueGrey, red } from '@mui/material/colors';
import ParentContainer from './pages/ParentContainer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { BrowserRouter } from 'react-router-dom';
import reducers from './redux/reducers/reducers';

const defaultTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const greenTheme = createTheme({
  palette: {
    primary: green,
    secondary: blueGrey,
  },
});

const orangeTheme = createTheme({
  palette: {
    primary: red,
    secondary: blueGrey,
  },
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  height: '100vh',
  textAlign: 'center',
  borderRadius: 0,
  boxShadow: 'none',
}));

const store = createStore(reducers);

export default function MyApp() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <Item>
          <BrowserRouter>
            <ParentContainer />
          </BrowserRouter>
        </Item>
      </ThemeProvider>
    </Provider>
  );
}
