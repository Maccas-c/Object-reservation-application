import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import * as calendarActions from '../../store/actions/index';

import { useConstructor } from '../../utils/customHooks';
import { uuidv4 } from '../../utils/customFunction';

import { RESERVATIONS_TIMES } from '../../constants/calendar/reservetionListHelper';

import useStyles from './tableStyles';
import './styles.css';

export const useCalendarService = () => {
  const [value, setValue] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [day, setDay] = useState('');
  const classes = useStyles();
  const isLoading = useSelector(({ utils }) => utils.isLoading);
  const currentCourtId = useSelector(({ calendar: { courtId } }) => courtId);
  const reservations = useSelector(({ calendar: { days } }) => days);
  const userId = useSelector(({ auth: { user } }) => user._id);
  const listReservation = useSelector(
    ({ calendar }) => calendar.reservationList,
  );
  const dispatch = useDispatch();

  const checkDay = event => {
    let dateInHook = `${event.getFullYear()}-${
      event.getMonth() + 1
    }-${event.getDate()}`;
    setDate(dateInHook);
    setDay(event.getDay());
    dispatch(calendarActions.checkDayStart(dateInHook));
  };

  const bookHourHandler = reservation => {
    const reservationData = {
      start_time: date,
      hour: reservation.reservationStart,
      courtId: currentCourtId,
      userId: userId,
    };

    dispatch(calendarActions.bookHourStart(reservationData));
  };

  const handleClickOpen = timeReservation => {
    setOpen(true);
    setTime(timeReservation);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseBook = () => {
    bookHourHandler(time);
    setOpen(false);
  };

  const handleAddReservation = reservation => {
    const reservationData = {
      uuid: uuidv4(),
      start_time: date,
      hour: reservation.reservationStart,
      courtId: currentCourtId,
      userId: userId,
    };
    dispatch(calendarActions.addReservationToList(reservationData));
  };
  useConstructor(() => {
    setValue(value);
    setDay(value.getDay());
    let dateInHook = `${value.getFullYear()}-${
      value.getMonth() + 1
    }-${value.getDate()}`;
    setDate(dateInHook);
    dispatch(calendarActions.checkDayStart(dateInHook));
  });

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
        if (resDay.hour === res.reservationStart) {
          res.isActive = false;
        }
      });
    });
  }

  return {
    open,
    day,
    classes,
    isLoading,
    checkDay,
    handleClickOpen,
    handleClose,
    handleCloseBook,
    handleAddReservation,
    currentCourtId,
    listReservation,
    setValue,
    value,
    dispatch,
  };
};
