import { MENU_ROUTES } from '../../constants/routes/routes';
import * as actionTypes from './actionTypes';
import { startLoadingUser, endLoadingUser } from './auth';
import axios from '../../axios/axios-auth';

export const checkDayStart = (date) => {
  return (dispatch) => {
    dispatch(startLoadingUser());
    axios
      .get(
        MENU_ROUTES.CHECK_DAY,
        {
          params: {
            time: date
          }
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

export const checkDaySuccess = (days) => {
  return {
    type: actionTypes.CHECK_DAY,
    days: days
  };
};

export const changeCurrentCourt = (courtId) => {
  return {
    type: actionTypes.CHANGE_COURT,
    courtId: courtId
  };
};
