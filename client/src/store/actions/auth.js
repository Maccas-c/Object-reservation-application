import axios from '../../axios/axios-auth';

import * as actionTypes from './actionTypes';

export const loginSuccess = (response) => {
  localStorage.setItem('user', JSON.stringify(response.data));
  const user = JSON.parse(localStorage.getItem('user'));
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

export const registration = () => {
  return {
    type: actionTypes.REGISTRATION
  };
};

export const rememberPassword = () => {
  return {
    type: actionTypes.REMEMBER_PASSWORD
  };
};
export const checkUser = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    type: actionTypes.CHECK_USER,
    user: user
  };
};

export const logout = () => {
  return (dispatch) => {
    axios
      .get('/logout', { withCredentials: true })
      .then((response) => {
        dispatch(logoutSuccess());
        localStorage.removeItem('user');
        console.log(response);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
};

export const authStart = () => {
  return (dispatch) => {
    const authData = {
      email: 'lol@wp.pl',
      password: 'Lol21'
    };
    axios
      .post('/login', authData, {
        withCredentials: true
      })
      .then((response) => {
        dispatch(loginSuccess(response));
        console.log(response);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};
