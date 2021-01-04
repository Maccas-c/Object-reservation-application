import axios from '@axios/axios-auth';

import { startLoadingUser, endLoadingUser } from './auth';

import * as actionTypes from './actionTypes';

import { MENU_ROUTES } from '@routes';
import {getPayuToken} from "./payment";

export const checkDayStart = date => {
  return dispatch => {
    dispatch(startLoadingUser());
    axios
      .get(
        MENU_ROUTES.CHECK_DAY,
        {
          params: {
            time: date,
          },
        },
        { withCredentials: true },
      )
      .then(response => {
        let reservationList = response.data;
        if (reservationList.length === 0) {
          reservationList = null;
        }
        dispatch(checkDaySuccess(reservationList));
        dispatch(endLoadingUser());
      })
      .catch(error => {
        dispatch(endLoadingUser());
        console.log(error.message);
      });
  };
};

export const getPrice = reservationsList => {
  return dispatch => {
    dispatch(startLoadingUser());
    axios
      .post(MENU_ROUTES.GET_PRICE, reservationsList, { withCredentials: true })
      .then(response => {
        dispatch(setPrice(response.data));
        dispatch(getPayuToken(response.data))
        dispatch(endLoadingUser());
      })
      .catch(error => {
        console.log(error.message);
        dispatch(endLoadingUser());
      });
  };
};

export const bookHourStart = reservation => {
  return dispatch => {
    axios
      .post(MENU_ROUTES.BOOK_HOUR, reservation, {
        withCredentials: true,
      })
      .then(() => {
        dispatch(checkDayStart(reservation.start_time));
      })

      .catch(error => {
        console.log(error.message);
      });
  };
};

export const bookListReservation = reservation => {
  return dispatch => {
    axios
      .post(MENU_ROUTES.LIST_RESERVATION, reservation, {
        withCredentials: true,
      })
      .then(() => {
        reservation.map(({ start_time }) => {
          return dispatch(checkDayStart(start_time));
        });

        return dispatch(clearReservationList());
      })
      .catch(() => {
        console.log('error');
      });
  };
};

export const bookListReservations = reservation => {
  return {
    type: actionTypes.SEND_RESERVATION_LIST,
    reservation: reservation,
  };
};

export const checkDaySuccess = days => {
  return {
    type: actionTypes.CHECK_DAY,
    days: days,
  };
};

export const addReservationToList = reservation => {
  return {
    type: actionTypes.ADD_RESERVATIONS_TO_LIST,
    reservation: reservation,
  };
};

export const deleteReservationToList = uuid => {
  return {
    type: actionTypes.DELETE_RESERVATION_LIST,
    uuid: uuid,
  };
};

export const clearReservationList = () => {
  return {
    type: actionTypes.CLEAR_RESERVATION_LIST,
  };
};

export const setCourtId = courtId => {
  return {
    type: actionTypes.SET_COURT_ID,
    courtId: courtId,
  };
};

export const setPrice = price => {
  return {
    type: actionTypes.GET_PRICE,
    price: price,
  };
};
