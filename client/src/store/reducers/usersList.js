import * as actionTypes from '../actions/actionTypes';

const initialState = {
  users: null,
  user: null
};

const getUsers = (state, action) => {
  return {
    ...state,
    users: action.users
  };
};
const getUser = (state, action) => {
  return {
    ...state,
    user: action.user
  };
};
const clearUsers = (state, action) => {
  return {
    ...state,
    users: null,
    user: null
  };
};

const deleteUser = (state, action) => {
  const newUsers = Object.assign([], state.users);
  const updatedUsers = newUsers.filter((user) => user._id !== action.id);
  console.log(action.id);
  console.log(updatedUsers);
  return {
    ...state,
    users: updatedUsers
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USERS:
      return getUsers(state, action);
    case actionTypes.GET_USER:
      return getUser(state, action);
    case actionTypes.CLEAR_USERS_LIST:
      return clearUsers(state, action);
    case actionTypes.DELETE_USER:
      return deleteUser(state, action);
    default:
      return state;
  }
};

export default reducer;
