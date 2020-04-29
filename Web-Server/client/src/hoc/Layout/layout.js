import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import NavigationMenu from '../../components/Navigation/SideDrawer/SideDrawer';
import BottomNavigation from '../../components/Navigation/BottomNavigation/BottomNavigation';
import Home from '../../components/Home/Home';
import Login from '../../components/Login/Login';
import UserProfile from '../../components/UserProfile/UserProfile';
import UsersList from '../../components/UsersList/UsersList';
import Calendar from '../../components/Calendar/Calendar';
import NotFound from '../../components/Errors/NotFound';
import { MENU_ROUTES } from '../../constansts/routes/routes';

const Layout = (props) => {
  return (
    <Fragment>
      <NavigationMenu>
        <Switch>
          <Route path={MENU_ROUTES.HOME} exact component={Home} />
          <Route path={MENU_ROUTES.LOGIN} component={Login} />
          <Route path={MENU_ROUTES.USER_PROFILE} component={UserProfile} />
          <Route path={MENU_ROUTES.CALENDAR} component={Calendar} />
          <Route path={MENU_ROUTES.USERS_LIST} component={UsersList} />
          <Route path={MENU_ROUTES.NOT_FOUND} component={NotFound} />
        </Switch>
      </NavigationMenu>
      <BottomNavigation />
    </Fragment>
  );
};

export default Layout;
