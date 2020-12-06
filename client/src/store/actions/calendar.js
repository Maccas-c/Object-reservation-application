import { MENU_ROUTES } from "../../constants/routes/routes";
import * as actionTypes from "./actionTypes";
import { startLoadingUser, endLoadingUser } from "./auth";
import axios from "../../axios/axios-auth";

export const checkDayStart = (date) => {
  return (dispatch) => {
    dispatch(startLoadingUser());
    axios
      .get(
        MENU_ROUTES.CHECK_DAY,
        {
          params: {
            time: date,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        let reservationList = response.data;
        if (reservationList.length === 0) {
          reservationList = null;
        }
        dispatch(checkDaySuccess(reservationList));
        dispatch(endLoadingUser());
      })
      .catch((error) => {
        dispatch(endLoadingUser());
        console.log(error.message);
      });
  };
};

export const bookHourStart = (reservation) => {
  return (dispatch) => {
    axios
      .post(MENU_ROUTES.BOOK_HOUR, reservation, {
        withCredentials: true,
      })
      .then(() => {
        dispatch(checkDayStart(reservation.start_time));
      })

      .catch((error) => {
        console.log(error.message);
      });
  };
};

export const bookListReservation = (reservation) => {
  return () => {
    axios
      .post(MENU_ROUTES.LIST_RESERVATION, reservation, {
        withCredentials: true,
      })
      .then(() => {
        console.log("ok");
      })
      .catch(() => {
        console.log("lol");
      });
  };
};

export const bookListReservations = (reservation) => {
  return {
    type: actionTypes.SEND_RESERVATION_LIST,
    reservation: reservation,
  };
};

export const checkDaySuccess = (days) => {
  return {
    type: actionTypes.CHECK_DAY,
    days: days,
  };
};

export const changeCurrentCourt = (courtId) => {
  return {
    type: actionTypes.CHANGE_COURT,
    courtId: courtId,
  };
};

export const addReservationToList = (reservation) => {
  return {
    type: actionTypes.ADD_RESERVATIONS_TO_LIST,
    reservation: reservation,
  };
};

export const deleteReservationToList = (uuid) => {
  return {
    type: actionTypes.DELETE_RESERVATION_LIST,
    uuid: uuid,
  };
};
