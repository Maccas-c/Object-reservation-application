import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Spinner from '../UI/Spinner';

import { useLoginService } from './service';

const Login = () => {
  const {
    classes,
    isLoading,
    userLoginHandler,
    userUsosLoginHandler,
    registerHandler,
    rememberPasswordHandler,
    changeNameHandler,
    changeEmailHandler,
    email,
    password,
  } = useLoginService();

  const loginPanel = isLoading ? (
    <Container {...{ component: 'main', maxWidth: 'xs' }}>
      <CssBaseline />
      <Spinner />
    </Container>
  ) : (
    <Container {...{ component: 'main', maxWidth: 'xs' }}>
      <CssBaseline />
      <div {...{ className: classes.paper }}>
        <Avatar {...{ className: classes.avatar }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          {...{
            style: { fontFamily: 'roboto' },
            component: 'h1',
            variant: 'h5',
          }}
        >
          Logowanie
        </Typography>
        <form {...{ className: classes.form }} noValidate>
          <Grid container {...{ spacing: 2 }}>
            <Grid item {...{ xs: 12 }}>
              <TextField
                required
                fullWidth
                {...{
                  variant: 'outlined',
                  id: 'email',
                  label: 'E-mail',
                  name: 'email',
                  autoComplete: 'email',
                  value: email,
                  onChange: event => changeNameHandler(event),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...{
                  variant: 'outlined',
                  id: 'password',
                  label: 'Hasło',
                  name: 'password',
                  type: 'password',
                  autoComplete: 'current-password',
                  value: password,
                  onChange: changeEmailHandler,
                }}
                required
                fullWidth
              />
            </Grid>
          </Grid>
          <Button
            {...{
              variant: 'contained',
              id: 'password',
              label: 'Hasło',
              name: 'password',
              type: 'submit',
              onClick: event => userLoginHandler(event),
              color: 'primary',
              disabled: !password || !email,
              className: classes.submit,
            }}
            fullWidth
          >
            Zaloguj się
          </Button>
          <Button
            fullWidth
            {...{
              type: 'submit',
              variant: 'contained',
              color: 'primary',
              className: classes.submit,
              onClick: event => userUsosLoginHandler(event),
            }}
          >
            Zaloguj się przez USOS
          </Button>
          <Grid container {...{ justify: 'flex-end' }}>
            <Link
              {...{
                variant: 'body2',
                onClick: event => registerHandler(event),
                href: '',
              }}
            >
              Nie posiadasz konta? Zarejestruj się!
            </Link>
            <Grid item>
              <Link
                {...{
                  variant: 'body2',
                  onClick: event => rememberPasswordHandler(event),
                  href: '',
                }}
              >
                Nie pamiętasz hasła? Przypomnij hasło!
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box {...{ mt: 5 }}></Box>
    </Container>
  );

  return loginPanel;
};

export default Login;
