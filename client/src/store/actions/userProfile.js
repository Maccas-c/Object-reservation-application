import axios from '../../axios/axios-auth';

import { MENU_ROUTES } from '../../constants/routes/routes';
import * as actionTypes from './actionTypes';
import { startLoadingUser } from './auth';

export const getUserProfileStart = (userId) => {
  return (dispatch) => {
    dispatch(startLoadingUser());
    axios
      .get(MENU_ROUTES.GET_USER_PROFILE + userId, { withCredentials: true })
      .then((response) => {
        dispatch(getUserProfileSuccess(response.data));
        dispatch(endLoadingUser());
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

export const updateUserProfileStart = (user, route) => {
  return (dispatch) => {
    axios
      .patch(MENU_ROUTES.UPDATE_USER_PROFILE, user, { withCredentials: true })
      .then((response) => {
        dispatch(clearUserProfileStartSuccess(route));
      })
      .catch((error) => {
        if (error.response.status === 422) {
          alert('Zły format wieku!');
        }
      });
  };
};

export const clearUserProfileStartSuccess = (route) => {
  route.push(MENU_ROUTES.HOME);
  return {
    type: actionTypes.CLEAR_USER_PROFILE
  };
};

export const endLoadingUser = () => {
  return {
    type: actionTypes.END_LOADING_USER
  };
};
