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

export const logout = () => {
  return (dispatch) => {
    axios
      .get(MENU_ROUTES.USER_LOGOUT, { withCredentials: true })
      .then((response) => {
        dispatch(logoutSuccess());
        localStorage.removeItem('user');
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const authStart = (userInput) => {
  return (dispatch) => {
    axios
      .post(MENU_ROUTES.LOGIN, userInput, {
        withCredentials: true
      })
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data));
        dispatch(loginSuccess(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const checkUser = () => {
  return (dispatch) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      if (user.isStudent) {
        dispatch(checkUsosUser());
      }
      return {
        type: actionTypes.CHECK_USER,
        user: user
      };
    }
  };
};

export const checkUsosUser = () => {
  return (dispatch) => {
    axios
      .get('/loginUsos', {
        withCredentials: true
      })
      .then((response) => {
        dispatch(checkUsosUserSuccess(response.data));
      })
      .catch((err) => {
        dispatch(checkUsosUserFail());
      });
  };
};

export const checkUsosUserSuccess = (user) => {
  user.isStudent = true;
  localStorage.setItem('user', JSON.stringify(user));
  return {
    type: actionTypes.CHECK_USOS_USER_SUCCESS,
    user: user
  };
};

export const checkUsosUserFail = () => {
  return {
    type: actionTypes.CHECK_USOS_USER_FAIL
  };
};

export const authUsosStart = () => {
  axios
    .get('/loginUsos/connect', {
      withCredentials: true
    })
    .catch((err) => {
      console.log(err);
    });
};
