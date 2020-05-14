import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useDarkMode } from './LayoutStyles';
import Content from '../../components/Navigation/SideDrawer/SideDrawer';
// import Footer from '../../components/Navigation/Footer/Footer';
import Home from '../../components/Home/Home';
import Login from '../../components/Login/Login';
import UserProfile from '../../components/UserProfile/UserProfile';
import UsersList from '../../components/UsersList/UsersList';
import Calendar from '../../components/Calendar/Calendar';
import NotFound from '../../components/Errors/NotFound';
import Register from '../../components/Register/Register';
import RememberPassword from '../../components/RememberPassword/RememberPassword';

import { MENU_ROUTES } from '../../constansts/routes/routes';

const Layout = (props) => {
	// const [updatedTheme, toggleMode] = useDarkMode();
	// const theme = createMuiTheme(updatedTheme);
	const isLoggedIn = useSelector((state) => state.user);
	const isRegistrationStarted = useSelector(
		(state) => state.registrationStart
	);
	const isRememberPasswordStarted = useSelector(
		(state) => state.rememberPasswordStart
	);

	let loginPage = null;
	if (!isLoggedIn && !isRegistrationStarted && !isRememberPasswordStarted) {
		loginPage = <Redirect to={MENU_ROUTES.LOGIN} />;
	}

	return (
		<ThemeProvider>
			<Content isLoggedIn={isLoggedIn}>
				{loginPage}
				<Switch>
					<Route path={MENU_ROUTES.HOME} exact component={Home} />
					<Route
						path={MENU_ROUTES.REMEMBER_PASSWORD}
						component={RememberPassword}
						exact
					/>
					<Route path={MENU_ROUTES.LOGIN} component={Login} />
					<Route
						path={MENU_ROUTES.USER_PROFILE}
						component={UserProfile}
					/>
					<Route path={MENU_ROUTES.CALENDAR} component={Calendar} />
					<Route
						path={MENU_ROUTES.USERS_LIST}
						component={UsersList}
					/>
					<Route path={MENU_ROUTES.REGISTER} component={Register} />
					<Route path={MENU_ROUTES.NOT_FOUND} component={NotFound} />
				</Switch>
			</Content>
			{/* <Footer switch={toggleMode} /> */}
		</ThemeProvider>
	);
};

export default Layout;
