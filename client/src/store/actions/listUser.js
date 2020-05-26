import axios from '../../axios/axios-auth';
import * as actionTypes from './actionTypes';
import { MENU_ROUTES } from '../../constansts/routes/routes';

export const loadAllUserSuccess = users => {
  return {
    type: 'GET_USERS',
    users: users,
  };
};

export const loadAllUserStart = () => {
  return dispatch => {
    axios
      .get(MENU_ROUTES.USERS_LIST, {
        withCredentials: true,
      })
      .then(response => {
        dispatch(loadAllUserSuccess(response.data));
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };
};
