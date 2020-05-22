import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: null,

  isStudent: false,
  isLoading: false,
  modeId: '0',
  isExistEmail: false,
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

const isExistEmail = (state, action) => {
  return {
    ...state,
    isExistEmail: true,
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

const startLoadingUser = (state, action) => {
  return {
    ...state,
    isLoading: true,
  };
};
const endLoadingUser = (state, action) => {
  return {
    ...state,
    isLoading: false,
  };
};
const switchModeTheme = (state, action) => {
  return {
    ...state,
    modeId: action.modeId,
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
    case actionTypes.START_LOADING_USER:
      return startLoadingUser(state, action);
    case actionTypes.END_LOADING_USER:
      return endLoadingUser(state, action);
    case actionTypes.SWITCH_MODE_THEME:
      return switchModeTheme(state, action);
    case actionTypes.IS_EXIST_EMAIL:
      return isExistEmail(state, action);

    default:
      return state;
  }
};

export default reducer;
