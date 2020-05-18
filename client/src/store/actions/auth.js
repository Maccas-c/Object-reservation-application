import axios from '../../axios/axios-auth';

import * as actionTypes from './actionTypes';

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

export const logout = () => {
  return (dispatch) => {
    axios
      .get('/logout', { withCredentials: true })
      .then((response) => {
        dispatch(logoutSuccess());
        localStorage.removeItem('user');
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
};

export const authStart = (userInput) => {
  return (dispatch) => {
    axios
      .post('/login', userInput, {
        withCredentials: true
      })
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data));
        dispatch(loginSuccess(response.data));
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};
