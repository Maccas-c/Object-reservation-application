import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import useStyles from './styles';

import * as calendarActions from '@actions/index';

export const useShopPanelService = () => {
  const classes = useStyles();

  const [isExpanded, setIsExpanded] = useState(true);

  const dispatch = useDispatch();

  const listReservation = useSelector(
    ({ calendar }) => calendar.reservationList,
  );

  const handleDeleteReservation = uuid =>
    dispatch(calendarActions.deleteReservationToList(uuid));

  const handleSubmitReservation = listReservation =>
    dispatch(calendarActions.bookListReservation(listReservation));

  const handleCancelReservations = () =>
    dispatch(calendarActions.clearReservationList());

  const expandHandler = () => setIsExpanded(!isExpanded);

  return {
    classes,
    listReservation,
    handleDeleteReservation,
    handleSubmitReservation,
    handleCancelReservations,
    expandHandler,
    isExpanded,
  };
};
