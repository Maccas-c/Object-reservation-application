import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: null,
  registrationStart: false,
  rememberPasswordStart: false
};

const auth = (state, action) => {
  return {
    ...state,
    user: action.user
  };
};

const logout = (state, action) => {
  return {
    ...state,
    user: null
  };
};

const checkUser = (state, action) => {
  return {
    ...state,
    user: action.user
  };
};

const registration = (state, action) => {
  return {
    ...state,
    registrationStart: !state.registrationStart
  };
};

const rememberPassword = (state, action) => {
  return {
    ...state,
    rememberPasswordStart: !state.rememberPasswordStart
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return auth(state, action);
    case actionTypes.REGISTRATION:
      return registration(state, action);
    case actionTypes.REMEMBER_PASSWORD:
      return rememberPassword(state, action);
    case actionTypes.AUTH_LOGOUT:
      return logout(state, action);
    case actionTypes.CHECK_USER:
      return checkUser(state, action);
    default:
      return state;
  }
};

export default reducer;
