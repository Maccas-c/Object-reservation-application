import React from 'react';

import { AppBar, Toolbar, Switch } from '@material-ui/core';

import { useHeaderContainer } from './container';
import { useHeaderService } from './service';

const Header = ({ open, user, toggleMode, value }) => {
  let {
    classes,
    switchMode,
    switchTheme,
    logoutHandler,
    logoutUsosHandler,
    logoutButtonHelper,
    menuIconHelper,
  } = useHeaderService(value, toggleMode);

  let { logoutButton, menuIcon } = useHeaderContainer(
    user,
    logoutHandler,
    logoutUsosHandler,
    logoutButtonHelper,
    menuIconHelper,
    open,
    classes,
  );

  return (
    <AppBar {...{ position: 'fixed', className: classes.appBar }}>
      <Toolbar>
        {menuIcon}
        <Switch
          {...{
            className: classes.switchButton,
            checked: switchMode,
            onChange: event => switchTheme(event),
            name: 'checkedA',
          }}
        />
        {logoutButton}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
