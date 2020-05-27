import * as actionTypes from '../actions/actionTypes';

const initialState = {
  users: null
};

const getUsers = (state, action) => {
  return {
    ...state,
    users: action.users
  };
};
const clearUsers = (state, action) => {
  return {
    ...state,
    users: null
  };
};

const deleteUser = (state, action) => {
  return {
    ...state,
    isActive: false
  };
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USERS:
      return getUsers(state, action);
    case actionTypes.CLEAR_USERS_LIST:
      return clearUsers(state, action);
    case actionTypes.REMOVE_CONTACT:
      return deleteUser(state, action);
    default:
      return state;
  }
};

export default reducer;
