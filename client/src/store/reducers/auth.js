import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: null
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return auth(state, action);
    case actionTypes.AUTH_LOGOUT:
      return logout(state, action);
    case actionTypes.CHECK_USER:
      return checkUser(state, action);
    default:
      return state;
  }
};

export default reducer;
