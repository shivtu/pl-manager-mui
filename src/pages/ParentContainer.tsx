import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
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

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
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
      <AppBar position='fixed' open={openDrawer}>
        <Toolbar>
          <Grid
            container
            direction='row'
            justifyContent='space-between'
            alignItems='center'
          >
            <Grid item>
              <IconButton
                color='inherit'
                aria-label='open drawer'
                onClick={handleOpenNavMenu}
                edge='start'
                sx={{ mr: 2, ...(openDrawer && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted={false}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={() => setAnchorElNav(null)}
                sx={{
                  display: { xs: 'flex', md: 'none' },
                }}
              >
                <SideNav />
              </Menu>
            </Grid>
            <Grid item>
              <Typography variant='h6' noWrap component='div'>
                Magnum Engineers (MUI)
              </Typography>
            </Grid>
            <Grid item>
              <UserMenu />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
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
          <Route path='/projects' element={<CurrentProjectsPage />} />
          <Route path='/new-project' element={<CreateNewProjectPage />} />
        </Routes>
      </Main>
    </Box>
  );
}
