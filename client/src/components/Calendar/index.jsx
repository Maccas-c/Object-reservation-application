import React from 'react';

import Calendar from 'react-calendar';

import CourtChanger from './TabPanels';
import ShopPanel from './ShopPanel';

import * as calendarActions from '@actions/index';

import { useCalendarContainer } from './container';
import { useCalendarService } from './service';

import './styles.css';

const Calendars = () => {
  const {
    day,
    isLoading,
    checkDay,
    currentCourtId,
    setValue,
    value,
    dispatch,
    date,
  } = useCalendarService();

  const { reservationTable } = useCalendarContainer(isLoading, date);

  return (
    <div className={'container'}>
      <Calendar
        {...{
          onChange: setValue,
          value: value,
          onClickDay: event => {
            checkDay(event);
            if (event.getDay() !== 6 && event.getDay() !== 0) {
              dispatch(calendarActions.changeCurrentCourt('a'));
            }
          },
        }}
      />
      <CourtChanger {...{ color: currentCourtId, day }} />
      {reservationTable}
      <ShopPanel />
    </div>
  );
};

export default Calendars;
