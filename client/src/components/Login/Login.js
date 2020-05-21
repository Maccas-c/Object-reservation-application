import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';

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
  Container,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { MENU_ROUTES } from '../../constansts/routes/routes';
import * as authActions from '../../store/actions/index';

import useStyles from './LoginStyles';

const Login = props => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const userLoginHandler = event => {
    event.preventDefault();

    const userInput = { email: email, password: password };
    dispatch(authActions.authStart(userInput, props.history));
  };

  const registerHandler = event => {
    event.preventDefault();
    props.history.push(MENU_ROUTES.REGISTER);
  };

  const rememberPasswordHandler = event => {
    event.preventDefault();
    props.history.push(MENU_ROUTES.PASSWORD_REC);
  };

  const changeNameHandler = event => {
    setEmail(event.target.value);
  };

  const changeEmailHandler = event => {
    setPassword(event.target.value);
  };

  return (
    <Fragment>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Logowanie
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='email'
                  label='E-mail'
                  name='email'
                  autoComplete='email'
                  value={email}
                  onChange={event => changeNameHandler(event)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  name='password'
                  label='Hasło'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                  value={password}
                  onChange={changeEmailHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value='allowExtraEmails' color='primary' />
                  }
                  label='
                Zapamiętaj mnie'
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={event => userLoginHandler(event)}>
              Zaloguj się
            </Button>
            <Grid container justify='flex-end'>
              <Link
                variant='body2'
                onClick={event => registerHandler(event)}
                href=''>
                Nie posiadasz konta? Zarejestruj się!
              </Link>
              <Grid item>
                <Link
                  variant='body2'
                  onClick={event => rememberPasswordHandler(event)}
                  href=''>
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
