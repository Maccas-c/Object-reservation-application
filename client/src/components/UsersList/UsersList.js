import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import * as userActions from '../../store/actions/index';
import { Container } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Spinner from '../UI/Spinner/Spinner';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonIcon from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const UserLists = (props) => {
  const users = useSelector((state) => state.listUser.users);
  const isLoading = useSelector((state) => state.utils.isLoading);
  const dispatch = useDispatch();

  const useStyles = makeStyles({
    table: {
      minWidth: 650
    }
  });
  const classes = useStyles();

  useEffect(() => {
    dispatch(userActions.loadAllUserStart());
  }, [dispatch]);

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
    });
    table = isLoading ? (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Spinner></Spinner>
      </Container>
    ) : (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="caption table">
          <TableRow hover="true">
            <TableCell align="left">Akcje</TableCell>
            <TableCell align="left">E-mail</TableCell>
            <TableCell align="left">Imię</TableCell>
            <TableCell align="left">Nazwisko</TableCell>
            <TableCell align="left">Płeć</TableCell>
          </TableRow>
          <TableBody>
            {activeUsers.map((user) => (
              <TableRow>
                <TableCell component="th" scope="row">
                  <Tooltip title="Person">
                    <IconButton aria-label="Show Profile">
                      <PersonIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton>
                      <DeleteIcon
                        onClick={(event) =>
                          dispatch(userActions.deleteContactStart(user._id))
                        }
                      />
                    </IconButton>
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
