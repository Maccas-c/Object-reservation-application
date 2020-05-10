import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import {
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Button
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import Header from '../Header/Header';
import { MENU_ITEMS } from '../../../constansts/menuList/menuItems';
import { MENU_ROUTES } from '../../../constansts/routes/routes';

import makeStyles from './SideDrawerStyles';

const SideDrawer = (props) => {
  const classes = makeStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const {
    location: { pathname }
  } = props;

  const menuList = Object.values(MENU_ITEMS);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getKeyByValue = (object, value) => {
    return Object.keys(object).find((key) => object[key] === value);
  };

  const drawer = (
    <div>
      <List>
        {menuList.map((item) => {
          const key = getKeyByValue(MENU_ITEMS, item);
          return (
            <ListItem
              button
              component={Link}
              to={MENU_ROUTES[key]}
              selected={MENU_ROUTES[key] === pathname}
              key={item}
            >
              <ListItemText primary={item} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header open={handleDrawerToggle} />

      <nav className={classes.drawer}>
        <Hidden smUp>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <IconButton
              onClick={handleDrawerToggle}
              className={classes.closeMenuButton}
            >
              <CloseIcon />
            </IconButton>
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div className={classes.toolbar} />
            {drawer}
          </Drawer>
        </Hidden>
      </nav>

      <div className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
        <Button onClick={props.switch}>SWITCH</Button>
      </div>
    </div>
  );
};

export default withRouter(SideDrawer);
