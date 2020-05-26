import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: null
};

const getUserProfile = (state, action) => {
  return {
    ...state,
    user: action.user
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_PROFILE:
      return getUserProfile(state, action);
    default:
      return state;
  }
};

export default reducer;
