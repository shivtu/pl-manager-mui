import { fireEvent, getByText, screen } from '@testing-library/react';
import { render as rtlRender } from '@testing-library/react';
import LoginPage from '../LoginPage';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../../../redux/reducers/reducers';
import { IAppState } from '../../../utils/types';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import userEvent from '@testing-library/user-event';
import * as httpServices from '../../../services/http.services';

const initialState: IAppState = {
  token: undefined,
  loggedInUser: undefined,
  projects: [],
  designs: [],
};

describe('Login Page tests', () => {
  function render(
    ui: JSX.Element,
    { token, loggedInUser, projects, designs }: IAppState,
    { store = createStore(reducers, initialState), ...renderOptions } = {}
  ) {
    function Wrapper({ children }: { children: JSX.Element }) {
      return <Provider store={store}>{children}</Provider>;
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
  }

  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    // Return an empty jest function to test whether it was called or not...I'm not depending on the results so no need to put in a return value
    useNavigate: () => jest.fn(),
  }));

  const defaultTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  it('should render the login form', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </ThemeProvider>,
      initialState
    );

    expect(screen.getByLabelText('Email')).toBeVisible();
    expect(screen.getByLabelText('Password')).toBeVisible();

    const newUserLink = screen.getByText('Click here for first time login');
    fireEvent.click(newUserLink);
    expect(screen.getByText('Create new password')).toBeVisible();
  });

  it('should enable login button', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </ThemeProvider>,
      initialState
    );

    const emailField = screen.getByLabelText('Email');
    const passwordField = screen.getByLabelText('Password');

    userEvent.type(emailField, 'test@mail.com');
    userEvent.type(passwordField, 'password');

    expect(screen.getByRole('button', { name: 'Login' })).toBeEnabled();
  });

  it('should login user', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </ThemeProvider>,
      initialState
    );

    const loginFn = jest.spyOn(httpServices, 'loginUser');
    loginFn.mockImplementation(() => Promise.resolve({ token: '' }));

    const emailField = screen.getByLabelText('Email');
    const passwordField = screen.getByLabelText('Password');

    userEvent.type(emailField, 'test@mail.com');
    userEvent.type(passwordField, 'password');

    const loginBtn = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(loginBtn);

    expect(loginFn).toBeCalled();
  });
});
