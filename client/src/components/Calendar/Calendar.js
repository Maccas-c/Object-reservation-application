import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Calendar from 'react-calendar';
import './Calendar.css'
import Court from './Court'
import InteractiveList from './Hours'
import Spinner from '../UI/Spinner/Spinner';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container } from '@material-ui/core';
import * as calendarActions from '../../store/actions/index';
import { useConstructor } from '../../utils/customHooks';

const Calendars = () => {
  const [ value, setValue ] = useState(new Date());
  const isLoading = useSelector((state) => state.utils.isLoading);
  const dispatch = useDispatch();

  useConstructor(() => {
    setValue(value);
    console.log(value);
    let date = `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`;
    dispatch(calendarActions.checkDayStart(date));
  });

  let reservationTable = null;

  const checkDay = (event) => {
    console.log(event);
    let date = `${event.getFullYear()}-${event.getMonth() + 1}-${event.getDate()}`;
    dispatch(calendarActions.checkDayStart(date));
  }

  reservationTable = isLoading ? (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Spinner></Spinner>
      </Container>
    ) : (
    <div>
      <Court />
      <InteractiveList/>
    </div>
  );

  return (
  <Fragment>
        <Calendar
        onChange = { setValue }
        value = { value }
        onClickDay = { (event) => checkDay(event) }
        />
  { reservationTable }
  </Fragment>
  );
};

export default Calendars;
