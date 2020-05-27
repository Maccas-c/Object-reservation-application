import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: null,
  isStudent: false,
};

const auth = (state, action) => {
  return {
    ...state,
    user: action.user,
    isStudent: false,
  };
};

const logout = (state, action) => {
  return {
    ...state,
    user: null,
    isStudent: false,
  };
};

const loadUser = (state, action) => {
  return {
    ...state,
    user: action.user,
  };
};

const checkUsosUserSuccess = (state, action) => {
  return {
    ...state,
    user: action.user,
    isStudent: true,
  };
};

const checkUserFail = (state, action) => {
  return {
    ...state,
    user: null,
    isStudent: false,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return auth(state, action);
    case actionTypes.AUTH_LOGOUT:
      return logout(state, action);
    case actionTypes.LOAD_USER:
      return loadUser(state, action);
    case actionTypes.CHECK_USOS_USER_SUCCESS:
      return checkUsosUserSuccess(state, action);
    case actionTypes.CHECK_USER_FAIL:
      return checkUserFail(state, action);

    default:
      return state;
  }
};

export default reducer;
