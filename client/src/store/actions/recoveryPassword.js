import { MENU_ROUTES } from '../../constants/routes';
import * as actionTypes from './actionTypes';
import { startLoadingUser, endLoadingUser } from './auth';
import axios from '../../axios/axios-auth';

export const resetPasswordStart = token => {
  return dispatch => {
    dispatch(startLoadingUser());
    axios
      .get(
        MENU_ROUTES.RESET_PASSWORD,
        {
          params: {
            resetPasswordToken: token,
          },
        },
        { withCredentials: true },
      )
      .then(response => {
        dispatch(resetPasswordSuccess(response.data));
        dispatch(endLoadingUser());
      })
      .catch(error => {
        dispatch(resetPasswordFail());
        dispatch(endLoadingUser());
        console.log(error.message);
      });
  };
};

export const recoveryPasswordStart = (email, route) => {
  return dispatch => {
    dispatch(startLoadingUser());
    axios
      .post(MENU_ROUTES.RECOVERY_PASSWORD, email, { withCredentials: true })
      .then(response => {
        dispatch(recoveryPasswordSuccess());
        dispatch(endLoadingUser());
        route.push(MENU_ROUTES.HOME);
      })
      .catch(error => {
        dispatch(endLoadingUser());
        console.log(error.message);
      });
  };
};

export const updatePasswordStart = (email, token, password, route) => {
  const data = { email: email, resetPasswordToken: token, password: password };
  return dispatch => {
    dispatch(startLoadingUser());
    axios
      .patch(MENU_ROUTES.UPDATE_PASSWORD, data, { withCredentials: true })
      .then(response => {
        dispatch(updatePasswordSuccess());
        dispatch(endLoadingUser());
        route.push(MENU_ROUTES.HOME);
      })
      .catch(error => {
        dispatch(endLoadingUser());
        console.log(error.message);
      });
  };
};

export const recoveryPasswordSuccess = () => {
  return {
    type: actionTypes.RECOVERY_PASSWORD_SUCCESS,
  };
};
export const resetPasswordSuccess = email => {
  return {
    type: actionTypes.RESET_PASSWORD_SUCCESS,
    email: email,
  };
};
export const resetPasswordFail = () => {
  return {
    type: actionTypes.RESET_PASSWORD_FAIL,
  };
};
export const updatePasswordSuccess = email => {
  return {
    type: actionTypes.UPDATE_PASSWORD_SUCCESS,
    email: email,
  };
};
