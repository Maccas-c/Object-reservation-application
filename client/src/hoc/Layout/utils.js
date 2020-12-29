import Home from '../../components/Home';

import { MENU_ROUTES } from '../../constants/routes';
import Login from '../../components/Login';
import UserProfile from '../../components/UserProfile';
import UsersList from '../../components/Users/UsersList';
import AdminUserProfile from '../../components/Users/UserProfile';
import Calendar from '../../components/Calendar';
import NotFound from '../../components/Errors';
import Register from '../../components/Register';
import RememberPassword from '../../components/PasswordActivity/RememberPassword';
import ResetPassword from '../../components/PasswordActivity/ResetPassword';
import ListReservationUser from '../../components/ListReservationUser';

export const ROUTES = [
  { path: MENU_ROUTES.HOME, isProtected: true, component: Home },
  { path: MENU_ROUTES.LOGIN, isProtected: false, component: Login },
  { path: MENU_ROUTES.REGISTER, isProtected: false, component: Register },
  {
    path: MENU_ROUTES.PASSWORD_REC,
    isProtected: false,
    component: RememberPassword,
  },
  { path: MENU_ROUTES.USER_PROFILE, isProtected: true, component: UserProfile },
  {
    path: MENU_ROUTES.ADMIN_USER_PROFILE,
    isProtected: true,
    component: AdminUserProfile,
  },
  { path: MENU_ROUTES.CALENDAR, isProtected: true, component: Calendar },
  { path: MENU_ROUTES.USERS_LIST, isProtected: true, component: UsersList },
  {
    path: MENU_ROUTES.RESET_PASSWORD + '/:token',
    isProtected: false,
    component: ResetPassword,
  },
  {
    path: MENU_ROUTES.LIST_USER_RESERVATION,
    isProtected: true,
    component: ListReservationUser,
  },
  { path: MENU_ROUTES.NOT_FOUND, isProtected: true, component: NotFound },
];
