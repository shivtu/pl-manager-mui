import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import SideNav from '../components/side-nav/SideNav';
import ResponsiveAppBar from '../components/app-bar/ResponsiveAppBar';
import LoginPage from './login/LoginPage';
import { sideNavItems } from '../components/side-nav/sideNavHelper';

import useIsMobile from '../hooks/useIsMobile';
import CurrentProjectsPage from './projects/CurrentProjectsPage';

const ParentContainer = () => {
  const [appData, setAppData] = useState<any>();
  const navigate = useNavigate();

  const isMobile = useIsMobile();

  const isAuthenticated = localStorage.getItem('authToken');

  useEffect(() => {
    if (!appData) navigate('/');
  }, []);

  const userNameInitials = `${appData?.account.name
    .split(' ')[0]
    .charAt(0)}${appData?.account.name.split(' ')[1].charAt(0)}`;

  return (
    <>
      {isAuthenticated ? (
        <Grid
          container
          direction='row'
          justifyContent='flex-start'
          alignItems='center'
          // spacing={2}
        >
          <Grid item xs={12}>
            <ResponsiveAppBar userNameInitials={userNameInitials} />
          </Grid>
          {!isMobile && (
            <Grid item>
              <SideNav />
            </Grid>
          )}
          <Grid item sx={{ marginLeft: 40, position: 'static' }}>
            <Routes>
              <Route
                path='/current-projects'
                element={<CurrentProjectsPage />}
              />
              {/* {sideNavItems.map((items) => {
                if (items.routeTo) {
                  return (
                    <Route
                      key={items.routeTo}
                      path={items.routeTo}
                      element={items.component}
                    />
                  );
                }

                return items.subMenu?.map((subMenutItem) => (
                  <Route
                    key={subMenutItem.routeTo}
                    path={subMenutItem.routeTo}
                    element={subMenutItem.component}
                  />
                ));
              })} */}
            </Routes>
          </Grid>
        </Grid>
      ) : (
        <LoginPage />
      )}
    </>
  );
};

export default ParentContainer;
