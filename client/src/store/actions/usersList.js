import axios from '../../axios/axios-auth';
import * as actionTypes from './actionTypes';
import { MENU_ROUTES } from '../../constants/routes';
import { startLoadingUser, endLoadingUser } from './auth';

export const loadUserSuccess = users => {
  return {
    type: 'GET_USERS',
    users: users,
  };
};

export const loadUsersStart = () => {
  return dispatch => {
    dispatch(startLoadingUser());
    return axios
      .get(MENU_ROUTES.USERS_LIST, {
        withCredentials: true,
      })
      .then(response => {
        dispatch(loadUserSuccess(response.data));
        dispatch(endLoadingUser());
      })
      .catch(error => {
        console.log(error.response);
        dispatch(endLoadingUser());
      });
  };
};

export const deleteUserStart = id => {
  return dispatch => {
    return axios
      .patch(MENU_ROUTES.DELETE_USER + id, { withCredentials: true })
      .then(response => {
        dispatch(deleteUserSuccess(id));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getUserStart = id => {
  return dispatch => {
    dispatch(startLoadingUser());
    return axios
      .get(MENU_ROUTES.GET_USER + id, {
        withCredentials: true,
      })
      .then(response => {
        dispatch(getUserSuccess(response.data));
        dispatch(endLoadingUser());
      })
      .catch(error => {
        console.log(error.response);
        dispatch(endLoadingUser());
      });
  };
};

export const deleteUserSuccess = id => {
  return {
    type: actionTypes.DELETE_USER,
    id: id,
  };
};

export const getUserSuccess = user => {
  return {
    type: actionTypes.GET_USER,
    user: user,
  };
};
