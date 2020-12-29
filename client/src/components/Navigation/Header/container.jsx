import React from 'react';

import { IconButton, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

export const useHeaderContainer = (
  user,
  logoutHandler,
  logoutUsosHandler,
  logoutButtonHelper,
  menuIconHelper,
  open,
  classes,
) => {
  if (user) {
    logoutButtonHelper = (
      <Button
        {...{
          color: 'inherit',
          className: classes.loginButton,
          style: { fontFamily: 'Segoe UI' },
          onClick: event => logoutHandler(event),
        }}
      >
        Wyloguj
      </Button>
    );
    menuIconHelper = (
      <IconButton
        className={classes.menuButton}
        {...{
          color: 'inherit',
          ariaLabel: 'Open drawer',
          className: classes.menuButton,
          onClick: open,
          edge: 'start',
        }}
      >
        <MenuIcon />
      </IconButton>
    );
    if (!user.isStudent) {
      logoutButtonHelper = (
        <Button
          {...{
            color: 'inherit',
            className: classes.loginButton,
            style: { fontFamily: 'Segoe UI' },
            onClick: event => logoutHandler(event),
          }}
        >
          Wyloguj
        </Button>
      );
    } else {
      logoutButtonHelper = (
        <Button
          {...{
            color: 'inherit',
            className: classes.loginButton,
            style: { fontFamily: 'Segoe UI' },
            onClick: event => logoutUsosHandler(event),
          }}
        >
          Wyloguj
        </Button>
      );
    }
  }

  return { logoutButton: logoutButtonHelper, menuIcon: menuIconHelper };
};
