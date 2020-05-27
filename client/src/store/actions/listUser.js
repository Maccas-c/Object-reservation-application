import axios from '../../axios/axios-auth';
import * as actionTypes from './actionTypes';
import { MENU_ROUTES } from '../../constansts/routes/routes';
import { startLoadingUser, endLoadingUser } from './auth';

export const loadAllUserSuccess = users => {
  return {
    type: 'GET_USERS',
    users: users,
  };
};

export const loadAllUserStart = () => {
  return dispatch => {
    return axios
      .get(MENU_ROUTES.USERS_LIST, {
        withCredentials: true,
      })
      .then(response => {
        dispatch(startLoadingUser);
        dispatch(loadAllUserSuccess(response.data));
        console.log('pobralem dane');
        dispatch(endLoadingUser());
      })
      .catch(error => {
        console.log(error.response.status);
      });
  };
};
