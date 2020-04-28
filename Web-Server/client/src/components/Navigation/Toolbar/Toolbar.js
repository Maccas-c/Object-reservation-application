import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import {
  AppBar,
  IconButton,
  Typography,
  Toolbar,
  Button
} from '@material-ui/core';

import makeStyles from './ToolbarStyles';

const toolbar = (props) => {
  const classes = makeStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          edge="start"
          onClick={props.open}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          DevTeam
        </Typography>
        <Button color="inherit" className={classes.loginButton}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default toolbar;
