import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import useStyles from './styles';

import * as calendarActions from '@actions/index';

export const useShopPanelService = () => {
  const classes = useStyles();

  const [isExpanded, setIsExpanded] = useState(true);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const listReservation = useSelector(
    ({ calendar }) => calendar.reservationList,
  );

  const price = useSelector(({ calendar }) => calendar.price);

  const handleDeleteReservation = uuid =>
    dispatch(calendarActions.deleteReservationToList(uuid));

  const handleSubmitReservation = listReservation => {
    dispatch(calendarActions.bookListReservation(listReservation));
    dispatch(calendarActions.setPrice(0));
    setOpen(false);
  };

  const handleCancelReservations = () => {
    dispatch(calendarActions.clearReservationList());
    dispatch(calendarActions.setPrice(0));
  };

  const expandHandler = () => setIsExpanded(!isExpanded);

  const getButtonContent = price => (price ? `Zapłać: ${price}` : 'Zapłać');

  const handleClickOpen = () => {
    setOpen(true);
    dispatch(calendarActions.getPrice(listReservation));
    dispatch(calendarActions.getPayuToken());
  };

  const handleClickClose = () => setOpen(false);

  return {
    classes,
    listReservation,
    handleDeleteReservation,
    handleSubmitReservation,
    handleCancelReservations,
    expandHandler,
    isExpanded,
    getButtonContent,
    open,
    handleClickOpen,
    handleClickClose,
    price,
  };
};
