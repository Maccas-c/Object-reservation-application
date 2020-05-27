import axios from '../../axios/axios-auth';

import { MENU_ROUTES } from '../../constansts/routes/routes';
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

export const updateUserProfileStart = (user) => {
  return (dispatch) => {
    axios
      .patch(MENU_ROUTES.UPDATE_USER_PROFILE, user, { withCredentials: true })
      .then((response) => {
        dispatch(updateUserProfileStartSuccess(user));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateUserProfileStartSuccess = (user) => {
  const updatedUser = {
    id: user.id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    phone_number: user.phoneNumber,
    age: user.age,
    adress_city: user.city,
    adress_postalCode: user.postalCode,
    adress_street: user.street,
    sex: user.sex,
    role: user.role
  };
  return {
    type: actionTypes.UPDATE_USER_PROFILE,
    user: updatedUser
  };
};

export const endLoadingUser = () => {
  return {
    type: actionTypes.END_LOADING_USER
  };
};
