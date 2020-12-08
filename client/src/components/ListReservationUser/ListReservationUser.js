import React, { useEffect } from 'react';
import useStyles from '../ListReservationUser/ListReservationUserStyles';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../store/actions';
import Spinner from '../UI/Spinner/Spinner';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { TABLE_RESERVATION_USER_ROWS } from '../../constants/usersList/usersList';

const ListReservationUser = () => {
  const classes = useStyles();
  const reservations = useSelector(state => state.auth.reservation);
  const isLoading = useSelector(state => state.utils.isLoading);
  const userId = useSelector(state => state.auth.user._id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.fetchReservationUser(userId));
  }, [dispatch, userId]);

  let table = <Spinner />;

  if (reservations) {
    table = isLoading ? (
      <Container component='main' maxWidth='xs'>
        <Spinner />
      </Container>
    ) : (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='caption table'>
          <TableHead>
            <TableRow>
              <TableCell align='left'>
                {TABLE_RESERVATION_USER_ROWS[3]}
              </TableCell>
              <TableCell align='left'>
                {TABLE_RESERVATION_USER_ROWS[2]}
              </TableCell>
              <TableCell align='left'>
                {TABLE_RESERVATION_USER_ROWS[1]}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map(reservation => (
              <TableRow hover={true} key={reservation._id}>
                <TableCell align='left'>{reservation.start_time}</TableCell>
                <TableCell align='left'>{reservation.hour}</TableCell>
                <TableCell align='left'>
                  {reservation.courtId.toUpperCase()}
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
