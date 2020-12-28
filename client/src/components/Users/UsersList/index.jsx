import React from 'react';

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
  Tooltip,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import Spinner from '../../UI/Spinner';

import { useUsersListService } from './service';

import { TABLE_ROWS } from '../../../constants/usersList';

const UserLists = ({ history }) => {
  const {
    classes,
    users,
    isLoading,
    deleteUserHandler,
    getUserHandler,
  } = useUsersListService(history);

  let table = <Spinner></Spinner>;

  if (users) {
    table = isLoading ? (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Spinner />
      </Container>
    ) : (
      <TableContainer {...{ component: Paper }}>
        <Table aria-label="caption table" {...{ className: classes.table }}>
          <TableHead>
            <TableRow>
              {TABLE_ROWS.map((row, index) => (
                <TableCell align="left">{row[index]}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user._id} {...{ hover: true }}>
                <TableCell>
                  <Tooltip {...{ title: 'Usuń' }}>
                    <DeleteIcon {...{ onClick: deleteUserHandler(user._id) }} />
                  </Tooltip>
                </TableCell>
                <TableCell
                  {...{
                    align: 'left',
                    onClick: event => getUserHandler(event, user._id),
                  }}
                >
                  {user.email}
                </TableCell>
                <TableCell
                  {...{
                    align: 'left',
                    onClick: event => getUserHandler(event, user._id),
                  }}
                >
                  {user.name}
                </TableCell>
                <TableCell
                  {...{
                    align: 'left',
                    onClick: event => getUserHandler(event, user._id),
                  }}
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
