import * as actionTypes from "../actions/actionTypes";

const initialState = {
  days: null,
  courtId: "a",
  reservationList: [],
};

const checkDay = (state, action) => {
  return {
    ...state,
    days: action.days,
  };
};

const changeCourt = (state, action) => {
  return {
    ...state,
    courtId: action.courtId,
  };
};

const addNewReservation = (state, action) => {
  return {
    ...state,
    days: [...state.days, action.reservation],
  };
};

const addReservationToList = (state, action) => {
  return {
    ...state,
    reservationList: [...state.reservationList, action.reservation],
  };
};

const sendReservationList = (state, action) => {
  return {
    ...state,
    reservation: action.reservation,
  };
};

const deleteReservationList = (state, action) => {
  return {
    ...state,
    reservationList: state.reservationList.filter(
      (reservation) => reservation.uuid !== action.uuid
    ),
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
    case actionTypes.ADD_RESERVATIONS_TO_LIST:
      return addReservationToList(state, action);
    case actionTypes.SEND_RESERVATION_LIST:
      return sendReservationList(state, action);
    case actionTypes.DELETE_RESERVATION_LIST:
      return deleteReservationList(state, action);
    default:
      return state;
  }
};

export default reducer;
