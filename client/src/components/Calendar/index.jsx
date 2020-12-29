import React from 'react';

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
} from '@material-ui/core';

import Calendar from 'react-calendar';

import Spinner from '@UI/Spinner';
import CourtChanger from './TabPanels';
import FewReservations from './ShopPanel';

import * as calendarActions from '@actions/index';

import { useCalendarService } from './service';

import { RESERVATIONS_TIMES } from '@constants/calendar';

import './styles.css';

const Calendars = () => {
  const {
    open,
    day,
    classes,
    isLoading,
    checkDay,
    handleClickOpen,
    handleClose,
    handleCloseBook,
    handleAddReservation,
    currentCourtId,
    listReservation,
    setValue,
    value,
    dispatch,
  } = useCalendarService();

  let reservationTable;
  reservationTable =
    isLoading || !RESERVATIONS_TIMES ? (
      <Container {...{ component: 'main', maxWidth: 'xs' }}>
        <CssBaseline />
        <Spinner />
      </Container>
    ) : (
      <div>
        <div {...{ className: classes.court }}>
          <CourtChanger {...{ color: currentCourtId, day }} />
        </div>
        <TableContainer {...{ className: classes.table, component: Paper }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell {...{ align: 'center' }}>Wolne godziny</TableCell>
                <TableCell {...{ align: 'center' }}>Rezerwacja</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {RESERVATIONS_TIMES.map(reservation => {
                if (reservation.isActive) {
                  return (
                    <TableRow hover={true} key={reservation.id}>
                      <TableCell align="center">
                        {reservation.reservationTime}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          style={{ marginRight: '10px' }}
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
                          {...{
                            variant: 'outlined',
                            size: 'small',
                            color: 'primary',
                            onClick: () => handleClickOpen(reservation),
                          }}
                        >
                          Rezerwuj
                        </Button>
                        <Dialog keepMounted {...{ open, onClose: handleClose }}>
                          <DialogTitle>
                            {'Potwierdzenie rezerwacji'}
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                              Czy jesteś pewny, że chcesz zarezerwować boisko?
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              {...{
                                onClick: () => handleCloseBook(),
                                color: 'primary',
                              }}
                            >
                              TAK
                            </Button>
                            <Button
                              {...{
                                onClick: () => handleClose(),
                                color: 'primary',
                              }}
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
    <>
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
      {reservationTable}
    </>
  );
};

export default Calendars;
