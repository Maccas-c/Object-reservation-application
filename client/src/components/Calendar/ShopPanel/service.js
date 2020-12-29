import { useSelector, useDispatch } from 'react-redux';

import useStyles from '../tableStyles';

import * as calendarActions from '@actions/index';

export const useShopPanelService = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const listReservation = useSelector(
    ({ calendar }) => calendar.reservationList,
  );

  const handleDeleteReservation = uuid =>
    dispatch(calendarActions.deleteReservationToList(uuid));

  const handleSubmitReservation = listReservation =>
    dispatch(calendarActions.bookListReservation(listReservation));

  return {
    classes,
    listReservation,
    handleDeleteReservation,
    handleSubmitReservation,
  };
};
