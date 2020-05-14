import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { MENU_ROUTES } from '../../constansts/routes/routes';
import * as authActions from '../../store/actions/index';

import useStyles from './LoginStyles';

const Login = (props) => {
  const classes = useStyles();
  const isLoggedIn = useSelector((state) => state.user);
  const dispatch = useDispatch();

  let userLoggedIn = null;

  if (isLoggedIn) {
    userLoggedIn = <Redirect to={MENU_ROUTES.HOME}></Redirect>;
  }

  const userLoginHandler = () => {
    dispatch(authActions.authStart());
    props.history.replace(MENU_ROUTES.HOME);
  };

  const registerHandler = (event) => {
    event.preventDefault();
    props.history.replace(MENU_ROUTES.REGISTER);
  };

  const rememberPasswordHandler = (event) => {
    event.preventDefault();
    props.history.replace(MENU_ROUTES.REMEMBER_PASSWORD);
  };

  return (
    <Fragment>
      {userLoggedIn}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Logowanie
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="E-mail"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Hasło"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="
                Zapamiętaj mnie"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={userLoginHandler}
            >
              Zaloguj się
            </Button>
            <Grid container justify="flex-end">
              <Link
                variant="body2"
                onClick={(event) => registerHandler(event)}
                href=""
              >
                Nie posiadasz konta? Zarejestruj się!
              </Link>
              <Grid item>
                <Link
                  variant="body2"
                  onClick={(event) => rememberPasswordHandler(event)}
                  href=""
                >
                  Nie pamiętasz hasła? Przypomnij hasło!
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}></Box>
      </Container>
    </Fragment>
  );
};

export default Login;
