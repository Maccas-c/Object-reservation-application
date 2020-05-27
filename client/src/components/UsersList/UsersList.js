import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import * as userActions from '../../store/actions/index';
import { Container } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Spinner from '../UI/Spinner/Spinner';
const UserLists = props => {
  const isLoading = useSelector(state => state.utils.isLoading);
  const dispatch = useDispatch();
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  const classes = useStyles();

  useEffect(() => {
    dispatch(userActions.loadAllUserStart());
  }, [dispatch]);

  const users = useSelector(state => state.listUser.users);

  function createData(idk, calories, fat, carbs, protein) {
    return { idk, calories, fat, carbs, protein };
  }
  console.log(users);

  const table = isLoading ? (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Spinner></Spinner>
    </Container>
  ) : (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='caption table'>
        <TableRow hover='true' selected='true'>
          <TableCell align='left'></TableCell>
          <TableCell align='left'>E-mail</TableCell>
          <TableCell align='left'>Imie</TableCell>
          <TableCell align='left'>Nazwisko</TableCell>
          <TableCell align='left'>Płeć</TableCell>
        </TableRow>

        <TableBody>
          {users.map(row => (
            <TableRow key={row.id}>
              <TableCell component='th' scope='row'>
                {row.idk}
              </TableCell>
              <TableCell align='left'>{row.longing2.email}</TableCell>
              <TableCell onclick={event => {}} align='left'>
                {row.name}
              </TableCell>
              <TableCell align='left'>{row.surname}</TableCell>
              <TableCell align='left'>{row.sex}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
  return table;
};
export default UserLists;
