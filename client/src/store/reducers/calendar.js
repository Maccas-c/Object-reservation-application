import * as actionTypes from '../actions/actionTypes';

const initialState = {
  days: null,
  courtId: 'a'
};

const checkDay = (state, action) => {
  return {
    ...state,
    days: action.days
  };
};

const changeCourt = (state, action) => {
  return {
    ...state,
    courtId: action.courtId
  };
};

const addNewReservation = (state, action) => {
  return {
    ...state,
    days: [...state.days, action.reservation]
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHECK_DAY:
      return checkDay(state, action);
    case actionTypes.CHANGE_COURT:
      return changeCourt(state, action);
    case actionTypes.ADD_NEW_RESERVATION:
      return addNewReservation(state, action);
    default:
      return state;
  }
};

export default reducer;
