import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Spinner from '../UI/Spinner/Spinner';

import { MENU_ROUTES } from '../../constants/routes/routes';
import * as recoveryActions from '../../store/actions/index';

import useStyles from './RememberPasswordStyle';

const RememberPassword = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.utils.isLoading);

  const [email, setEmail] = useState('');

  const changeEmailHandler = (event) => {
    setEmail(event.target.value);
  };

  const recoveryPassword = (event, email) => {
    event.preventDefault();
    const userEmail = { email: email };
    dispatch(recoveryActions.recoveryPasswordStart(userEmail));
  };

  const changeLoginHandler = (event) => {
    event.preventDefault();
    props.history.push(MENU_ROUTES.LOGIN);
  };

  let content = (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Spinner></Spinner>
    </Container>
  );
  content = isLoading ? (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Spinner></Spinner>
    </Container>
  ) : (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Przypomnij Hasło
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="E-mail"
                onChange={(event) => changeEmailHandler(event)}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(event) => recoveryPassword(event, email)}
          >
            Przypomnij hasło
          </Button>
          <Grid container justify="flex-end">
            <Link
              variant="body2"
              onClick={(event) => changeLoginHandler(event)}
              href=""
            >
              Cofnij się do logowania!
            </Link>
          </Grid>
        </form>
      </div>
      <Box mt={5}></Box>
    </Container>
  );

  return content;
};
export default RememberPassword;
