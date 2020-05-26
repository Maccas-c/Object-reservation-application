import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MaterialTable from 'material-table';
import { withRouter } from 'react-router-dom';
import { MENU_ROUTES } from '../../constansts/routes/routes';
import * as userActions from '../../store/actions/index';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
const UserLists = props => {
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

  const rows = [
    createData(1, 159, 6.0, 24, 4.0),
    createData(2, 237, 9.0, 37, 4.3),
    createData(3, 262, 16.0, 24, 6.0),
  ];

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='caption table'>
        <caption>A basic table example with a caption</caption>
        <TableHead>
          <TableRow>
            <TableCell>Lista użytkowników</TableCell>
            <TableCell align='right'>E-mail</TableCell>
            <TableCell align='right'>Imie&nbsp;</TableCell>
            <TableCell align='right'>Nazwisko&nbsp;</TableCell>
            <TableCell align='right'>Płeć&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component='th' scope='row'>
                {row.idk}
              </TableCell>
              <TableCell align='right'>{}</TableCell>
              <TableCell align='right'>{row.fat}</TableCell>
              <TableCell align='right'>{row.carbs}</TableCell>
              <TableCell align='right'>{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default UserLists;
