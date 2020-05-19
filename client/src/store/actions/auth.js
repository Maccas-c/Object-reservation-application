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

export const logoutUsosSuccess = () => {
  return {
    type: actionTypes.AUTH_LOGOUT_USOS
  };
};

export const logout = () => {
  return (dispatch) => {
    axios
      .get(MENU_ROUTES.USER_LOGOUT, { withCredentials: true })
      .then((response) => {
        localStorage.removeItem('user');
        dispatch(logoutSuccess());
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const logoutUsos = () => {
  localStorage.removeItem('user');
  return {
    type: actionTypes.AUTH_LOGOUT
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

export const loadUser = (user) => {
  return {
    type: actionTypes.CHECK_USER,
    user: user
  };
};

export const checkUser = () => {
  return (dispatch) => {
    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    if (!user) {
      dispatch(checkUsosUser());
      user = JSON.parse(localStorage.getItem('user'));
    }
    dispatch(loadUser(user));
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
