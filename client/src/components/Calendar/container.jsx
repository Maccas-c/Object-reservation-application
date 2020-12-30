import React from 'react';

import { Container, CssBaseline } from '@material-ui/core';

import Spinner from '@UI/Spinner';
import ReservationTable from './ReservationTable';

import { RESERVATIONS_TIMES } from '@constants/calendar';

export const useCalendarContainer = (isLoading, date) => {
  const reservationTable =
    isLoading || !RESERVATIONS_TIMES ? (
      <Container {...{ component: 'main', maxWidth: 'xs' }}>
        <CssBaseline />
        <Spinner />
      </Container>
    ) : (
      <ReservationTable {...{ date }} />
    );

  return { reservationTable };
};
