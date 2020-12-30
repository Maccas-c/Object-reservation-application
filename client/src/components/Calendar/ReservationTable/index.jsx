import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
  Button,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { useReservationTableService } from './service';

import { RESERVATIONS_TIMES } from '@constants/calendar';

const ReservationTable = ({ date, setDate }) => {
  const { handleAddReservation } = useReservationTableService(date, setDate);

  return (
    <TableContainer {...{ component: Paper }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell {...{ align: 'center' }}>Wolne godziny</TableCell>
            <TableCell {...{ align: 'center' }}></TableCell>
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
                      startIcon={<AddCircleIcon />}
                      style={{ marginRight: '10px' }}
                      variant="contained"
                      size="small"
                      color="default"
                      onClick={() => {
                        handleAddReservation(reservation);
                      }}
                    >
                      Rezerwuj
                    </Button>
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
  );
};

export default ReservationTable;
