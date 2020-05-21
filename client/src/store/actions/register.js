import axios from '../../axios/axios-auth';

import * as actionTypes from './actionTypes';

import { MENU_ROUTES } from '../../constansts/routes/routes';

export const registerSuccess = () => {
  return {
    type: actionTypes.REGISTER_SUCCESS,
  };
};

export const registerFailure = () => {
  return {
    type: actionTypes.REGISTER_FAILURE,
  };
};
export const isExistEmail = () => {
  return {
    type: actionTypes.IS_EXIST_EMAIL,
  };
};

export const registerStart = (userInput, route) => {
  return dispatch => {
    axios
      .post(MENU_ROUTES.REGISTER, userInput, {
        withCredentials: true,
      })
      .then(response => {
        dispatch(registerSuccess(response.data));
        route.push(MENU_ROUTES.LOGIN);
      })
      .catch(error => {
        if (error.response.status === 422) {
          dispatch(isExistEmail());
          alert('Mail ma już przypisane konto');
        }
      });
  };
};
