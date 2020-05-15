import axios from '../../axios/axios-auth';

import * as actionTypes from './actionTypes';
import { MENU_ROUTES } from '../../constansts/routes/routes';

export const loginSuccess = (user) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    user: user
  };
};

export const logoutSuccess = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkUser = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    type: actionTypes.CHECK_USER,
    user: user
  };
};

export const logout = (route) => {
  return (dispatch) => {
    axios
      .get(MENU_ROUTES.USER_LOGOUT, { withCredentials: true })
      .then((response) => {
        dispatch(logoutSuccess());
        localStorage.removeItem('user');
        route.push(MENU_ROUTES.LOGIN);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
};

export const authStart = (userInput, route) => {
  return (dispatch) => {
    axios
      .post(MENU_ROUTES.LOGIN, userInput, {
        withCredentials: true
      })
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data));
        dispatch(loginSuccess(response.data));
        route.push(MENU_ROUTES.HOME);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};
