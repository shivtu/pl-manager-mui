import { Toolbar, Grid, IconButton, Menu, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import SideNav from '../components/side-nav/SideNav';
import UserMenu from '../components/user-menu/UserMenu';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const CustomAppBar = ({
  openDrawer,
  handleOpenNavMenu,
  anchorElNav,
  setAnchorElNav,
  drawerWidth,
}: {
  openDrawer: boolean;
  handleOpenNavMenu: (event: React.MouseEvent<HTMLElement>) => void;
  anchorElNav: HTMLElement | null;
  setAnchorElNav: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  drawerWidth: number;
}) => {
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

  return (
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
  );
};

export default CustomAppBar;
