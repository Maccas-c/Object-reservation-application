import * as actionTypes from '../actions/actionTypes';

const initialState = {
  days: null,
};

const checkDay = (state, action) => {
  return {
    ...state,
    days: action.days
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHECK_DAY:
      return checkDay(state, action);
    default:
      return state;
  }
};

export default reducer;
