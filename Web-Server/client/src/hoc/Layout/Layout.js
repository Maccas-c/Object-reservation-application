import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

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
import { MENU_ROUTES } from '../../constansts/routes/routes';

const Layout = (props) => {
  const [updatedTheme, toggleMode] = useDarkMode();
  const theme = createMuiTheme(updatedTheme);
  const isLoggedIn = useSelector((state) => state.user);

  let loginPage = null;
  if (!isLoggedIn) {
    loginPage = <Redirect to={MENU_ROUTES.LOGIN} />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Content isLoggedIn={isLoggedIn}>
        {loginPage}
        <Switch>
          <Route path={MENU_ROUTES.HOME} exact component={Home} />
          <Route path={MENU_ROUTES.LOGIN} component={Login} />
          <Route path={MENU_ROUTES.USER_PROFILE} component={UserProfile} />
          <Route path={MENU_ROUTES.CALENDAR} component={Calendar} />
          <Route path={MENU_ROUTES.USERS_LIST} component={UsersList} />
          <Route path={MENU_ROUTES.NOT_FOUND} component={NotFound} />
        </Switch>
      </Content>
      <Footer switch={toggleMode} />
    </ThemeProvider>
  );
};

export default Layout;
