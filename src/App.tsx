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
