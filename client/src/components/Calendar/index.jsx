import React from 'react';

import Calendar from 'react-calendar';

import CourtChanger from './TabPanels';
import ShopPanel from './ShopPanel';

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
    date,
    sectionData,
    price,
  } = useCalendarService();

  const { reservationTable } = useCalendarContainer(isLoading, date, price);

  return (
    <div className={'container'}>
      <Calendar
        {...{
          onChange: setValue,
          value: value,
          onClickDay: event => {
            checkDay(event);
          },
        }}
      />
      <CourtChanger {...{ color: currentCourtId, day, sectionData }} />
      {reservationTable}
      <ShopPanel {...{ price }} />
    </div>
  );
};

export default Calendars;
