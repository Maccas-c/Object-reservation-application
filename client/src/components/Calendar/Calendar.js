import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TableHead,
    Paper,
} from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Calendar from 'react-calendar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useConstructor } from '../../utils/customHooks';
import CourtChanger from './CourtChanger';
import Spinner from '../UI/Spinner/Spinner';
import './Calendar.css';
import useStyles from './TableStyles';
import { RESERVATIONS_TIMES } from '../../constants/calendar/reservetionListHelper';
import * as calendarActions from '../../store/actions/index';

const Calendars = props => {
    const [value, setValue] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState('');
    const classes = useStyles();
    const isLoading = useSelector(state => state.utils.isLoading);
    const currentCourtId = useSelector(state => state.calendar.courtId);
    const reservations = useSelector(state => state.calendar.days);
    const dispatch = useDispatch();

    const checkDay = event => {
        let dateInHook = `${event.getFullYear()}-${
            event.getMonth() + 1
        }-${event.getDate()}`;
        setDate(dateInHook);
        dispatch(calendarActions.checkDayStart(dateInHook));
    };

    const bookHourHandler = reservation => {
        const reservationData = {
            start_time: date,
            hour: reservation.reservationStart,
            courtid: currentCourtId,
        };

        dispatch(calendarActions.bookHourStart(reservationData));
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = event => {
        setOpen(false);
    };

    const handleCloseBook = reservation => {
        bookHourHandler(reservation);
        setOpen(false);
    };

    useConstructor(() => {
        setValue(value);
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
            res => res.courtid === currentCourtId
        );
        RESERVATIONS_TIMES.forEach(res => {
            reservationsByDay.forEach(resDay => {
                if (resDay.hour === res.reservationStart) {
                    res.isActive = false;
                }
            });
        });
    }

    let reservationTable = null;
    reservationTable =
        isLoading || !RESERVATIONS_TIMES ? (
            <Container component='main' maxWidth='xs'>
                <CssBaseline />
                <Spinner></Spinner>
            </Container>
        ) : (
            <div>
                <div className={classes.court}>
                    <CourtChanger color={currentCourtId} />
                </div>
                <TableContainer
                    component={Paper}
                    style={{ width: '70%', marginLeft: '9%' }}>
                    <Table
                        className={classes.table}
                        aria-label='spanning table'>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>
                                    Wolne godziny
                                </TableCell>
                                <TableCell align='center'>Zarezerwuj</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {RESERVATIONS_TIMES.map(reservation => {
                                if (reservation.isActive) {
                                    return (
                                        <TableRow
                                            hover={true}
                                            key={reservation.id}>
                                            <TableCell align='center'>
                                                {reservation.reservationTime}
                                            </TableCell>
                                            <TableCell align='center'>
                                                <Button
                                                    variant='outlined'
                                                    color='primary'
                                                    onClick={handleClickOpen}>
                                                    Zarezerwuj!
                                                </Button>
                                                <Dialog
                                                    open={open}
                                                    keepMounted
                                                    onClose={handleClose}>
                                                    <DialogTitle id='alert-dialog-slide-title'>
                                                        {
                                                            'Potwierdzenie rezerwacji'
                                                        }
                                                    </DialogTitle>
                                                    <DialogContent>
                                                        <DialogContentText id='alert-dialog-slide-description'>
                                                            Czy jesteś pewny, że
                                                            chcesz zarezerwować
                                                            boisko?
                                                        </DialogContentText>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button
                                                            onClick={() =>
                                                                handleCloseBook(
                                                                    reservation
                                                                )
                                                            }
                                                            color='primary'>
                                                            TAK
                                                        </Button>
                                                        <Button
                                                            onClick={
                                                                handleClose
                                                            }
                                                            color='primary'>
                                                            NIE
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>
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
                onClickDay={event => checkDay(event)}
            />
            {reservationTable}
        </Fragment>
    );
};

export default Calendars;
