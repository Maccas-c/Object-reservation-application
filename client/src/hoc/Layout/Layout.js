import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useDarkMode } from './LayoutStyles';
import Content from '../../components/Navigation/SideDrawer/SideDrawer';
import Footer from '../../components/Navigation/Footer/Footer';
import Home from '../../components/Home/Home';
import Login from '../../components/Login/Login';
import UserProfile from '../../components/UserProfile/UserProfile';
import UsersList from '../../components/UsersList/UsersList';
import Calendar from '../../components/Calendar/Calendar';
import NotFound from '../../components/Errors/NotFound';
import Register from '../../components/Register/Register';
import RememberPassword from '../../components/RememberPassword/RememberPassword';

import { MENU_ROUTES } from '../../constansts/routes/routes';
import * as authActions from '../../store/actions/index';
import { useConstructor } from '../../utils/customHooks';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

const Layout = (props) => {
  console.log('layout');
  const [updatedTheme, toggleMode] = useDarkMode();
  const theme = createMuiTheme(updatedTheme);

  const dispatch = useDispatch();
  useConstructor(() => dispatch(authActions.checkUser()));
  const isLoggedIn = useSelector((state) => state.user);

  return (
    <ThemeProvider theme={theme}>
      <Content isLoggedIn={isLoggedIn}>
        <Switch>
          <ProtectedRoute path={MENU_ROUTES.HOME} exact component={Home} />
          <ProtectedRoute
            path={MENU_ROUTES.USER_PROFILE}
            component={UserProfile}
          />
          <ProtectedRoute path={MENU_ROUTES.CALENDAR} component={Calendar} />
          <ProtectedRoute path={MENU_ROUTES.USERS_LIST} component={UsersList} />
          <Route
            path={MENU_ROUTES.REMEMBER_PASSWORD}
            component={RememberPassword}
            exact
          />
          <Route path={MENU_ROUTES.REGISTER} component={Register} />
          <Route path={MENU_ROUTES.LOGIN} component={Login} />
          <ProtectedRoute path={MENU_ROUTES.NOT_FOUND} component={NotFound} />
        </Switch>
      </Content>
      <Footer switch={toggleMode} />
    </ThemeProvider>
  );
};

export default Layout;
