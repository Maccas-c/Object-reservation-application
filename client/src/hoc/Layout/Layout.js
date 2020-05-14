import React from 'react';
import { Switch } from 'react-router-dom';
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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import FreeRoute from '../ProtectedRoute/FreeRoute';

import { MENU_ROUTES } from '../../constansts/routes/routes';
import * as authActions from '../../store/actions/index';
import { useConstructor } from '../../utils/customHooks';

const Layout = (props) => {
  console.log('xd');
  const [updatedTheme, toggleMode] = useDarkMode();
  const theme = createMuiTheme(updatedTheme);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useConstructor(() => dispatch(authActions.checkUser()));

  return (
    <ThemeProvider theme={theme}>
      <Content user={user}>
        <Switch>
          <ProtectedRoute
            path={MENU_ROUTES.HOME}
            exact
            component={Home}
            user={user}
          />
          <ProtectedRoute
            path={MENU_ROUTES.USER_PROFILE}
            component={UserProfile}
            user={user}
          />
          <ProtectedRoute
            path={MENU_ROUTES.CALENDAR}
            component={Calendar}
            user={user}
          />
          <ProtectedRoute
            path={MENU_ROUTES.USERS_LIST}
            component={UsersList}
            user={user}
          />
          <FreeRoute
            path={MENU_ROUTES.PASSWORD_REC}
            component={RememberPassword}
            user={user}
          />
          <FreeRoute
            path={MENU_ROUTES.REGISTER}
            component={Register}
            user={user}
          />
          <FreeRoute path={MENU_ROUTES.LOGIN} component={Login} user={user} />
          <ProtectedRoute
            path={MENU_ROUTES.NOT_FOUND}
            component={NotFound}
            user={user}
          />
        </Switch>
      </Content>
      <Footer switch={toggleMode} />
    </ThemeProvider>
  );
};

export default Layout;
