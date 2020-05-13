import * as actionTypes from './actionTypes';

export const auth = () => {
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
