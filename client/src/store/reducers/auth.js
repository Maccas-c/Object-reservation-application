import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: null,
  isStudent: false,
  login: '',
  password: ''
};

const auth = (state, action) => {
  return {
    ...state,
    user: action.user,
    isStudent: false
  };
};

const logout = (state, action) => {
  return {
    ...state,
    user: null,
    isStudent: false
  };
};

const checkUser = (state, action) => {
  return {
    ...state,
    user: action.user
  };
};

const checkUsosUserSuccess = (state, action) => {
  return {
    ...state,
    user: action.user,
    isStudent: true
  };
};

const checkUsosUserFail = (state, action) => {
  return {
    ...state
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return auth(state, action);
    case actionTypes.AUTH_LOGOUT:
      return logout(state, action);
    case actionTypes.CHECK_USER:
      return checkUser(state, action);
    case actionTypes.CHECK_USOS_USER_SUCCESS:
      return checkUsosUserSuccess(state, action);
    case actionTypes.CHECK_USOS_USER_FAIL:
      return checkUsosUserFail(state, action);
    default:
      return state;
  }
};

export default reducer;
