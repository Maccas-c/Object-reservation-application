import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
  CssBaseline,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

import Calendar from "react-calendar";
import { useConstructor } from "../../utils/customHooks";
import CourtChanger from "./CourtChanger";
import Spinner from "../UI/Spinner/Spinner";

import { RESERVATIONS_TIMES } from "../../constants/calendar/reservetionListHelper";
import * as calendarActions from "../../store/actions/index";

import "./Calendar.css";
import useStyles from "./TableStyles";
import FewReservations from "./FewReservations";

const Calendars = (props) => {
  const [value, setValue] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const classes = useStyles();
  const isLoading = useSelector(({ utils }) => utils.isLoading);
  const currentCourtId = useSelector(({ calendar: { courtId } }) => courtId);
  const reservations = useSelector(({ calendar: { days } }) => days);
  const userId = useSelector(({ auth: { user } }) => user._id);
  const listReservation = useSelector(
    (state) => state.calendar.reservationList
  );
  const dispatch = useDispatch();

  const checkDay = (event) => {
    let dateInHook = `${event.getFullYear()}-${
      event.getMonth() + 1
    }-${event.getDate()}`;
    setDate(dateInHook);
    dispatch(calendarActions.checkDayStart(dateInHook));
  };

  const bookHourHandler = (reservation) => {
    const reservationData = {
      start_time: date,
      hour: reservation.reservationStart,
      courtId: currentCourtId,
      userId: userId,
    };

    dispatch(calendarActions.bookHourStart(reservationData));
  };

  const handleClickOpen = (timeReservation) => {
    setOpen(true);
    setTime(timeReservation);
  };

  const handleClose = (event) => {
    setOpen(false);
  };

  const handleCloseBook = (reservation) => {
    bookHourHandler(time);
    setOpen(false);
  };

  const handleAddReservation = (reservation) => {
    const reservationData = {
      start_time: date,
      hour: reservation.reservationStart,
      courtId: currentCourtId,
      userId: userId,
    };
    dispatch(calendarActions.addReservationToList(reservationData));
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
        <Spinner />
      </Container>
    ) : (
      <div>
        <div className={classes.court}>
          <CourtChanger color={currentCourtId} />
        </div>
        <TableContainer className={classes.table} component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Wolne godziny</TableCell>
                <TableCell align="center">Rezerwacja</TableCell>
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
                        <Button
                          style={{ marginRight: "10px" }}
                          variant="outlined"
                          size="small"
                          color="primary"
                          onClick={() => {
                            handleAddReservation(reservation);
                          }}
                        >
                          Dodaj do koszyka!
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          color="primary"
                          onClick={() => handleClickOpen(reservation)}
                        >
                          Rezerwuj
                        </Button>
                        <Dialog open={open} keepMounted onClose={handleClose}>
                          <DialogTitle>
                            {"Potwierdzenie rezerwacji"}
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                              Czy jesteś pewny, że chcesz zarezerwować boisko?
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              onClick={() => {
                                handleCloseBook();
                              }}
                              color="primary"
                            >
                              TAK
                            </Button>
                            <Button
                              onClick={() => {
                                handleClose();
                              }}
                              color="primary"
                            >
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
        {listReservation ? <FewReservations /> : null}
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
