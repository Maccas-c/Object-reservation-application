import React from 'react';
import {Switch} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {useDarkMode} from './LayoutStyles';
import Content from '../../components/Navigation/SideDrawer/SideDrawer';
import Home from '../../components/Home/Home';
import Login from '../../components/Login/Login';
import UserProfile from '../../components/UserProfile/UserProfile';
import UsersList from '../../components/UsersList/UsersList';
import AdminUserProfile from '../../components/UsersList/UserProfile';
import Calendar from '../../components/Calendar/Calendar';
import NotFound from '../../components/Errors/NotFound';
import Register from '../../components/Register/Register';
import RememberPassword from '../../components/RememberPassword/RememberPassword';
import ResetPassword from '../../components/RememberPassword/ResetPassword';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import ListReservationUser from "../../components/ListReservationUser/ListReservationUser";


import FreeRoute from '../ProtectedRoute/FreeRoute';
import {MENU_ROUTES} from '../../constants/routes/routes';
import * as authActions from '../../store/actions/index';
import {useConstructor} from '../../utils/customHooks';
import ListAdminReservations from "../../components/ListAdminReservations/ListAdminReservations";

const Layout = (props) => {
    const [updatedTheme, toggleMode] = useDarkMode();
    const theme = createMuiTheme(updatedTheme);
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);
    let value = parseInt(useSelector((state) => state.utils.modeId));

    useConstructor(() => {
        dispatch(authActions.checkUser());
        const localStorageModeId = localStorage.getItem('mode');
        if (localStorageModeId !== null) {
            dispatch(authActions.switchModeTheme(toggleMode, localStorageModeId));
            value = parseInt(localStorageModeId);
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <Content user={user} switch={toggleMode} value={value}>
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
                    <ProtectedRoute
                        path={MENU_ROUTES.ADMIN_USER_PROFILE}
                        component={AdminUserProfile}
                        user={user}
                    />
                    <FreeRoute
                        path={MENU_ROUTES.PASSWORD_REC}
                        component={RememberPassword}
                        user={user}
                    />
                    <ProtectedRoute
                        path={MENU_ROUTES.LIST_USER_RESERVATION}
                        component={ListReservationUser}
                        user={user}
                    />
                    <ProtectedRoute
                        path={MENU_ROUTES.LIST_ADMIN_RESERVATION}
                        component={ListAdminReservations}
                        user={user}
                    />

                    <FreeRoute
                        path={MENU_ROUTES.REGISTER}
                        component={Register}
                        user={user}
                    />
                    <FreeRoute path={MENU_ROUTES.LOGIN} component={Login} user={user}/>
                    <FreeRoute
                        path={MENU_ROUTES.RESET_PASSWORD + '/:token'}
                        component={ResetPassword}
                        user={user}
                    />
                    <ProtectedRoute
                        path={MENU_ROUTES.NOT_FOUND}
                        component={NotFound}
                        user={user}
                    />
                </Switch>
            </Content>
        </ThemeProvider>
    );
};

export default Layout;
