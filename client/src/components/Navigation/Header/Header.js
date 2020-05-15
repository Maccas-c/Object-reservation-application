import React from 'react';
import { useDispatch } from 'react-redux';

import MenuIcon from '@material-ui/icons/Menu';
import { AppBar, IconButton, Toolbar, Button } from '@material-ui/core';

import * as authActions from '../../../store/actions/index';

import makeStyles from './HeaderStyles';

const Header = (props) => {
  const classes = makeStyles();
  const dispatch = useDispatch();

  const logoutHandler = (event) => {
    event.preventDefault();
    dispatch(authActions.logout(props.history));
  };

  let logoutBtn = null;
  let menuIcon = null;
  if (props.user) {
    logoutBtn = (
      <Button
        color="inherit"
        className={classes.loginButton}
        style={{ fontFamily: 'Segoe UI' }}
        onClick={(event) => logoutHandler(event)}
      >
        Wyloguj
      </Button>
    );
    menuIcon = (
      <IconButton
        color="inherit"
        aria-label="Open drawer"
        edge="start"
        onClick={props.open}
        className={classes.menuButton}
      >
        <MenuIcon />
      </IconButton>
    );
  }

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        {menuIcon}
        {logoutBtn}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
