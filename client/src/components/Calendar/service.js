import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import * as calendarActions from '@actions/index';

import { useConstructor } from '@utils/customHooks';

import './styles.css';

export const useCalendarService = () => {
  const [value, setValue] = useState(new Date());
  const [date, setDate] = useState('');
  const [day, setDay] = useState('');

  const isLoading = useSelector(({ utils: { isLoading } }) => isLoading);
  const currentCourtId = useSelector(({ calendar: { courtId } }) => courtId);
  const price = useSelector(({ calendar: { price } }) => price);
  const sectionData = useSelector(({ home: { courts } }) => courts);
  const dispatch = useDispatch();

  const checkDay = event => {
    let dateInHook = `${event.getFullYear()}-${
      event.getMonth() + 1
    }-${event.getDate()}`;
    setDate(dateInHook);
    setDay(event.getDay());
    dispatch(calendarActions.checkDayStart(dateInHook));
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

  return {
    day,
    isLoading,
    checkDay,
    currentCourtId,
    setValue,
    value,
    dispatch,
    date,
    sectionData,
    price,
  };
};
