import React from 'react';

import { Switch } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/core/styles';

import Navigation from '@components/Navigation';

import ProtectedRoute from '@hoc/custom-routes/protected';
import FreeRoute from '@hoc/custom-routes/free';

import { useLayoutService } from './service';

import { ROUTES } from './utils';

const Layout = () => {
  const { toggleMode, theme, user, value } = useLayoutService();

  return (
    <ThemeProvider {...{ theme }}>
      <Navigation {...{ user, toggleMode, value }}>
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
      </Navigation>
    </ThemeProvider>
  );
};

export default Layout;