import { useState } from 'react';
import { Tooltip, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';

const UserMenu = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const settings = ['Profile', 'Logout'];

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <Tooltip title='Open settings'>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt='user'>{'D H'}</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id='menu-appbar'
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <Typography textAlign='center'>{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default UserMenu;
