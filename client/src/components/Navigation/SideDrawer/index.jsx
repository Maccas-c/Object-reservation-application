import React from 'react';
import { Link } from 'react-router-dom';

import { Drawer, Hidden } from '@material-ui/core';

import MenuList from './MenuList';

import { MENU_ROUTES } from '../../../constants/routes';

import { useSideDrawerService } from './service';

const SideDrawer = ({ user, mobileOpen, handleDrawerToggle }) => {
  let {
    classes,
    location,
    userRoute,
    menu,
    sideDrawer,
    getAvatar,
  } = useSideDrawerService();

  if (user) {
    const avatar = getAvatar(user);

    menu = (
      <MenuList
        {...{
          link: Link,
          routes: MENU_ROUTES,
          location,
        }}
      />
    );

    sideDrawer = (
      <nav {...{ className: classes.drawer }}>
        <Hidden smUp>
          <Drawer
            {...{
              variant: 'temporary',
              open: mobileOpen,
              onClose: handleDrawerToggle,
            }}
          >
            <div {...{ className: classes.userProfile, onClick: userRoute }}>
              <img
                {...{
                  src: avatar,
                  alt: 'Your avatar',
                  height: '80',
                  width: '80',
                }}
              />
              <h5 {...{ className: classes.userName }}>
                {user.name} {user.surname}
              </h5>
              <h5 {...{ className: classes.userMail }}>{user.email}</h5>
            </div>
            {menu}
          </Drawer>
        </Hidden>
        <Hidden xsDown>
          <Drawer
            {...{
              className: classes.drawer,
              variant: 'permanent',
              classes: { paper: classes.drawerPaper },
            }}
          >
            <div {...{ className: classes.toolbar }} />
            <div {...{ className: classes.userProfile, onClick: userRoute }}>
              <img
                {...{
                  src: avatar,
                  alt: 'Your avatar',
                  height: '120',
                  width: '120',
                }}
              />
              <h5 {...{ className: classes.userName }}>
                {user.name} {user.surname}
              </h5>
              <h5 {...{ className: classes.userMail }}>{user.email}</h5>
            </div>
            {menu}
          </Drawer>
        </Hidden>
      </nav>
    );
  }

  return sideDrawer;
};

export default SideDrawer;
