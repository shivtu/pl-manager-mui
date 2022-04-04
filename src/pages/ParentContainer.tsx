import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SideNav from '../components/side-nav/SideNav';
import CurrentProjectsPage from './projects/CurrentProjectsPage';
import { Route, Routes } from 'react-router-dom';
import { Grid, Menu } from '@mui/material';
import useIsMobile from '../hooks/useIsMobile';
import UserMenu from '../components/user-menu/UserMenu';
import { useSelector } from 'react-redux';
import { IAppState } from '../utils/types';
import LoginPage from './login/LoginPage';
import CreateNewProjectPage from './projects/CreateNewProjectPage';
import AnalyticsPage from './analytics/AnalyticsPage';
import PendingDesignsPage from './designs/PendingDesignsPage';
import CustomAppBar from './CustomAppBar';
import { routes } from './RouteHelper';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function ParentContainer() {
  const appState = useSelector((state: IAppState) => state);
  const currentUserRole = appState.loggedInUser?.userRole;
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const isMobile = useIsMobile();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    isMobile ? setAnchorElNav(event.currentTarget) : setOpenDrawer(true);
  };

  if (!appState.token) return <LoginPage />;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <CustomAppBar
        openDrawer={openDrawer}
        handleOpenNavMenu={handleOpenNavMenu}
        anchorElNav={anchorElNav}
        setAnchorElNav={setAnchorElNav}
        drawerWidth={drawerWidth}
      />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant={'persistent'}
        anchor='left'
        open={openDrawer}
      >
        <DrawerHeader>
          <IconButton onClick={() => setOpenDrawer(false)}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <SideNav />
        <Divider />
      </Drawer>
      <Main open={openDrawer}>
        <DrawerHeader />

        <Routes>
          {currentUserRole && // TODO: avoid calling the map function on every render of the drawer
            routes.map(
              (r) =>
                r.allowedRoles.includes(currentUserRole) && (
                  <Route key={r.path} path={r.path} element={r.element} />
                )
            )}
        </Routes>
      </Main>
    </Box>
  );
}
