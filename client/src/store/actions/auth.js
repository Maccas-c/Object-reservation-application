import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authe = () => {
  return {
    type: actionTypes.AUTH
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

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = () => {
  return (dispatch) => {
    const authData = {
      email: 'lol@wp.pl',
      password: 'Lol21'
    };
    axios
      .post('http://localhost:3001/api/login', authData, {
        withCredentials: true
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};
