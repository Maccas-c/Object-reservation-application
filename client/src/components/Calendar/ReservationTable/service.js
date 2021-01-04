import { useSelector, useDispatch } from 'react-redux';

import * as calendarActions from '@actions/index';

import { uuidv4 } from '@utils/customFunction';

import { RESERVATIONS_TIMES } from '@constants/calendar';

export const useReservationTableService = date => {
  const dispatch = useDispatch();
  const currentCourtId = useSelector(({ calendar: { courtId } }) => courtId);
  const reservations = useSelector(({ calendar: { days } }) => days);
  const userId = useSelector(({ auth: { user } }) => user._id);
  const listReservation = useSelector(
    ({ calendar }) => calendar.reservationList,
  );

  const handleAddReservation = reservation => {
    const reservationData = {
      uuid: uuidv4(),
      start_time: date,
      hour: reservation.reservationStart,
      courtId: currentCourtId,
      userId: userId,
    };
    dispatch(calendarActions.addReservationToList(reservationData));
    dispatch(calendarActions.getPrice(listReservation));
  };

  let reservationsByDay = null;
  RESERVATIONS_TIMES.forEach(res => (res.isActive = true));

  if (reservations) {
    reservationsByDay = reservations.filter(
      res => res.courtId === currentCourtId,
    );
    RESERVATIONS_TIMES.forEach(res => {
      reservationsByDay.forEach(resDay => {
        if (resDay.hour === res.reservationStart) {
          res.isActive = false;
        }
      });
    });
  }
  if (listReservation) {
    reservationsByDay = listReservation.filter(
      res => res.courtId === currentCourtId,
    );
    RESERVATIONS_TIMES.forEach(res => {
      reservationsByDay.forEach(resDay => {
        if (
          resDay.hour === res.reservationStart &&
          resDay.start_time === date
        ) {
          res.isActive = false;
        }
      });
    });
  }

  return {
    handleAddReservation,
  };
};
