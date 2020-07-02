import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { AppBar, IconButton, Toolbar, Button, Switch } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import * as authActions from '../../../store/actions/index';

import makeStyles from './HeaderStyles';

const Header = (props) => {
  const classes = makeStyles();
  const dispatch = useDispatch();

  let [value] = useState(0);
  if (value.toString() !== props.value) {
    value = props.value;
  }
  let [switchMode, setSwitchMode] = useState(props.value !== 0);

  const switchTheme = (event) => {
    if (event.target.checked) {
      value = 1;
      setSwitchMode(true);
    } else {
      value = 0;
      setSwitchMode(false);
    }
    dispatch(authActions.switchModeTheme(props.switch, value));
  };

  const logoutHandler = (event) => {
    event.preventDefault();
    dispatch(authActions.logout());
  };

  const logoutUsosHandler = (event) => {
    event.preventDefault();
    dispatch(authActions.startLoadingUser());
    dispatch(authActions.logoutUsos());
  };

  let logoutBtn = null;
  let menuIcon = null;
  if (props.user) {
    logoutBtn = (
      <Button
        color="inherit"
        className={classes.loginButton}
        style={{ fontFamily: 'roboto' }}
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
    if (!props.user.isStudent) {
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
    } else {
      logoutBtn = (
        <Button
          color="inherit"
          className={classes.loginButton}
          style={{ fontFamily: 'Segoe UI' }}
          onClick={(event) => logoutUsosHandler(event)}
        >
          Wyloguj
        </Button>
      );
    }
  }

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        {menuIcon}
        <Switch
          className={classes.switchButton}
          checked={switchMode}
          onChange={(event) => switchTheme(event)}
          name="checkedA"
        />
        {logoutBtn}
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(Header);
