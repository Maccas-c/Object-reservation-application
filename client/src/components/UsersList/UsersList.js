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
import { MENU_ROUTES } from '../../constansts/routes/routes';
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

  const getUserHandler = (event, id) => {
    event.preventDefault();
    dispatch(userActions.getUserStart(id));
    props.history.push(MENU_ROUTES.ADMIN_USER_PROFILE);
  };

  let table = <Spinner></Spinner>;
  let activeUsers = [];

  if (users) {
    activeUsers = users.filter((user) => user.isActive);
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
                <TableCell
                  align="left"
                  onClick={(event) => getUserHandler(event, user._id)}
                >
                  {user.longing2.email}
                </TableCell>
                <TableCell
                  align="left"
                  onClick={(event) => getUserHandler(event, user._id)}
                >
                  {user.name}
                </TableCell>
                <TableCell
                  align="left"
                  onClick={(event) => getUserHandler(event, user._id)}
                >
                  {user.surname}
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
export default UserLists;
