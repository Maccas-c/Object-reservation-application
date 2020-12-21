import React from 'react';

import { Switch } from 'react-router-dom';

import Content from '../../components/Navigation/SideDrawer/SideDrawer';

import ProtectedRoute from '../custom-routes/protected';
import FreeRoute from '../custom-routes/free';

import { ThemeProvider } from '@material-ui/core/styles';

import { useLayoutService } from './service';

import { ROUTES } from './utils';

const Layout = () => {
  const { toggleMode, theme, user, value } = useLayoutService();

  return (
    <ThemeProvider {...{ theme }}>
      <Content {...{ user, switch: toggleMode, value }}>
        <Switch>
          {ROUTES.map(route =>
            route.isProtected ? (
              <ProtectedRoute
                {...{
                  path: route.path,
                  component: route.component,
                  user,
                  exact: true,
                }}
              />
            ) : (
              <FreeRoute
                {...{
                  path: route.path,
                  component: route.component,
                  user,
                  exact: true,
                }}
              />
            ),
          )}
        </Switch>
      </Content>
    </ThemeProvider>
  );
};

export default Layout;
