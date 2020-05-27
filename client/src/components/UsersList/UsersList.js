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
import DeleteIcon from '@material-ui/icons/Delete';
import PersonIcon from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const UserLists = props => {
  const users = useSelector(state => state.listUser.users);
  const isLoading = useSelector(state => state.utils.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userActions.loadAllUserStart());
  }, [dispatch]);
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  const classes = useStyles();

  const table = isLoading ? (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Spinner></Spinner>
    </Container>
  ) : (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='caption table'>
        <TableRow hover='true'>
          <TableCell align='left'>Akcje</TableCell>
          <TableCell align='left'>E-mail</TableCell>
          <TableCell align='left'>Imie</TableCell>
          <TableCell align='left'>Nazwisko</TableCell>
          <TableCell align='left'>Płeć</TableCell>
        </TableRow>
        <TableBody>
          {users.map(row => (
            <TableRow key={row.id}>
              <TableCell component='th' scope='row'>
                <Tooltip title='Person'>
                  <IconButton aria-label='Show Profile'>
                    <PersonIcon />
                  </IconButton>
                </Tooltip>{' '}
                <Tooltip title='Delete'>
                  <IconButton aria-label='delete'>
                    <DeleteIcon
                      onClick={() => {
                        dispatch(userActions.deleteContactStart(row._id));
                      }}
                    />
                  </IconButton>
                </Tooltip>{' '}
                {row.idk}
              </TableCell>
              <TableCell align='left'>
                {row.longing2.email && row.isActive ? row.longing2.email : null}
              </TableCell>
              <TableCell align='left'>
                {row.name && row.isActive ? row.name : null}
              </TableCell>
              <TableCell align='left'>
                {row.surname && row.isActive ? row.surname : null}
              </TableCell>
              <TableCell align='left'>
                {row.sex && row.isActive ? row.sex : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
  return table;
};
export default UserLists;
