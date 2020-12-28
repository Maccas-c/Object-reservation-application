import React from 'react';

import Header from './Header';
import SideDrawer from './SideDrawer';

import CssBaseline from '@material-ui/core/CssBaseline';

import { useNavigationService } from './service';

const Navigation = ({ user, toggleMode, value, children }) => {
  const { classes, handleDrawerToggle, mobileOpen } = useNavigationService();

  return (
    <div {...{ className: classes.root }}>
      <CssBaseline />
      <Header {...{ open: handleDrawerToggle, user, toggleMode, value }} />

      <SideDrawer {...{ user, mobileOpen, handleDrawerToggle }} />

      <div {...{ className: classes.content }}>
        <div {...{ className: classes.toolbar }} />
        {children}
      </div>
    </div>
  );
};

export default Navigation;
