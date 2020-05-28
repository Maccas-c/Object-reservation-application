import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isExistEmail: false,
  users: null
};

const isExistEmail = (state, action) => {
  return {
    ...state,
    isExistEmail: true
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.IS_EXIST_EMAIL:
      return isExistEmail(state, action);
    default:
      return state;
  }
};

export default reducer;
