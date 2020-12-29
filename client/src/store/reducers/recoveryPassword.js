import * as actionTypes from '@actionTypes';

const initialState = {
  email: null,
  isValidToken: false,
};

const recoveryPassword = (state, action) => {
  return {
    ...state,
    email: null,
    isValidToken: false,
  };
};
const resetPasswordSuccess = (state, action) => {
  return {
    ...state,
    email: action.email,
    isValidToken: true,
  };
};
const resetPasswordFail = (state, action) => {
  return {
    ...state,
    email: null,
    isValidToken: false,
  };
};
const updatePasswordSuccess = (state, action) => {
  return {
    ...state,
    email: null,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RECOVERY_PASSWORD_SUCCESS:
      return recoveryPassword(state, action);
    case actionTypes.RESET_PASSWORD_SUCCESS:
      return resetPasswordSuccess(state, action);
    case actionTypes.RESET_PASSWORD_FAIL:
      return resetPasswordFail(state, action);
    case actionTypes.UPDATE_PASSWORD_SUCCESS:
      return updatePasswordSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
