import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
  Tooltip
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import Spinner from '../UI/Spinner/Spinner';
import * as userActions from '../../store/actions/index';

import useStyles from './UsersListStyles';
import { TABLE_ROWS } from '../../constansts/usersList/usersList';

const UserLists = (props) => {
  const classes = useStyles();
  const users = useSelector((state) => state.usersList.users);
  const isLoading = useSelector((state) => state.utils.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.loadUsersStart());
  }, [dispatch]);

  const deleteUserHandler = (id) => {
    dispatch(userActions.deleteUserStart(id));
  };

  let table = <Spinner></Spinner>;
  let activeUsers = [];

  if (users) {
    activeUsers = users.filter((user) => user.isActive);
    activeUsers.filter((user) => {
      if (user.sex.toLowerCase().startsWith('m')) {
        user.sex = 'male';
      } else if (user.sex.toLowerCase().startsWith('f')) {
        user.sex = 'female';
      }
      return user;
    });
    table = isLoading ? (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Spinner></Spinner>
      </Container>
    ) : (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell align="left">{TABLE_ROWS[0]}</TableCell>
              <TableCell align="left">{TABLE_ROWS[1]}</TableCell>
              <TableCell align="left">{TABLE_ROWS[2]}</TableCell>
              <TableCell align="left">{TABLE_ROWS[3]}</TableCell>
              <TableCell align="left">{TABLE_ROWS[4]}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activeUsers.map((user) => (
              <TableRow hover={true} key={user._id}>
                <TableCell>
                  <Tooltip title="Delete">
                    <DeleteIcon
                      onClick={(event) => deleteUserHandler(user._id)}
                    />
                  </Tooltip>
                </TableCell>
                <TableCell align="left">{user.longing2.email}</TableCell>
                <TableCell align="left">{user.name}</TableCell>
                <TableCell align="left">{user.surname}</TableCell>
                <TableCell align="left">{user.sex}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return table;
};
export default UserLists;
