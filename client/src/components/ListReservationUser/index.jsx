import React from 'react';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

import Spinner from '@UI/Spinner';

import { useListReservationUser } from './service';

import { TABLE_RESERVATION_USER_ROWS } from '@constants/usersList';

const ListReservationUser = () => {
  const { classes, reservations, isLoading } = useListReservationUser();

  let table = <Spinner />;

  if (reservations) {
    table = isLoading ? (
      <Spinner />
    ) : (
      <TableContainer {...{ className: classes.container, component: Paper }}>
        <Table {...{ className: classes.table }} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell {...{ align: 'left' }}>
                {TABLE_RESERVATION_USER_ROWS[3]}
              </TableCell>
              <TableCell {...{ align: 'left' }}>
                {TABLE_RESERVATION_USER_ROWS[2]}
              </TableCell>
              <TableCell {...{ align: 'left' }}>
                {TABLE_RESERVATION_USER_ROWS[1]}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map(({ _id, start_time, hour, courtId }) => (
              <TableRow key={_id} {...{ hover: true }}>
                <TableCell {...{ align: 'left' }}>{start_time}</TableCell>
                <TableCell {...{ align: 'left' }}>{hour}</TableCell>
                <TableCell {...{ align: 'left' }}>
                  {courtId.toUpperCase()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return table;
};
export default ListReservationUser;
