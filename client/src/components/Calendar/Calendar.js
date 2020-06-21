import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Calendar from 'react-calendar';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
  Tooltip
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useConstructor } from '../../utils/customHooks';
import CourtChanger from './CourtChanger';
import Spinner from '../UI/Spinner/Spinner';
import './Calendar.css';
import useStyles from './TableStyles';

import { RESERVATIONS_TIMES } from '../../constants/calendar/reservetionListHelper';
import * as calendarActions from '../../store/actions/index';

const Calendars = () => {
  const [value, setValue] = useState(new Date());
  const classes = useStyles();
  const isLoading = useSelector((state) => state.utils.isLoading);
  const currentCourtId = useSelector((state) => state.calendar.courtId);
  const reservations = useSelector((state) => state.calendar.days);
  const dispatch = useDispatch();

  useConstructor(() => {
    setValue(value);
    let date = `${value.getFullYear()}-${
      value.getMonth() + 1
    }-${value.getDate()}`;
    dispatch(calendarActions.checkDayStart(date));
  });

  const checkDay = (event) => {
    let date = `${event.getFullYear()}-${
      event.getMonth() + 1
    }-${event.getDate()}`;
    dispatch(calendarActions.checkDayStart(date));
  };

  const bookHourHandler = () => {};

  let reservationsByDay = null;
  RESERVATIONS_TIMES.forEach((res) => (res.isActive = true));
  if (reservations) {
    reservationsByDay = reservations.filter(
      (res) => res.courtid === currentCourtId
    );
    RESERVATIONS_TIMES.forEach((res) => {
      reservationsByDay.forEach((resDay) => {
        if (resDay.hour === res.reservationStart) {
          res.isActive = false;
        }
      });
    });
  }

  let reservationTable = null;

  reservationTable =
    isLoading || !RESERVATIONS_TIMES ? (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Spinner></Spinner>
      </Container>
    ) : (
      <div>
        <CourtChanger />

        <TableContainer
          component={Paper}
          style={{ width: '60%', margin: 'auto' }}
        >
          <Table className={classes.table} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Wolne godziny</TableCell>
                <TableCell align="center">Zarezerwuj</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {RESERVATIONS_TIMES.map((reservation) => {
                if (reservation.isActive) {
                  return (
                    <TableRow hover={true} key={reservation.id}>
                      <TableCell align="center">
                        {reservation.reservationTime}
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="Rezerwuj">
                          <AddCircleIcon onClick={() => bookHourHandler()} />
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                } else {
                  return null;
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );

  return (
    <Fragment>
      <Calendar
        onChange={setValue}
        value={value}
        onClickDay={(event) => checkDay(event)}
      />
      {reservationTable}
    </Fragment>
  );
};

export default Calendars;
