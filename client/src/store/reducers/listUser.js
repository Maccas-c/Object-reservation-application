import * as actionTypes from '../actions/actionTypes';

const initialState = {
  users: null,
};
const getUsers = (state, action) => {
  return {
    ...state,
    users: action.users,
  };
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USERS:
      return getUsers(state, action);
    default:
      return state;
  }
};

export default reducer;
