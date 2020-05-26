import axios from '../../axios/axios-auth';

import { MENU_ROUTES } from '../../constansts/routes/routes';
import * as actionTypes from './actionTypes';

export const getUserProfileStart = (userId) => {
  return (dispatch) => {
    axios
      .get(MENU_ROUTES.USER_PROFILE + userId, { withCredentials: true })
      .then((response) => {
        dispatch(getUserProfileSuccess(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getUserProfileSuccess = (user) => {
  return {
    type: actionTypes.GET_USER_PROFILE,
    user: user
  };
};
