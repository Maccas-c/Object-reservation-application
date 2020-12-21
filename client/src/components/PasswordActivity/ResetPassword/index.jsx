import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import Spinner from '../../UI/Spinner';

import { useResetPasswordService } from './service';

const ResetPassword = ({ match }) => {
  const {
    classes,
    is_password_valid,
    isLoading,
    isValidToken,
    changePasswordHandler,
    resetPassword,
  } = useResetPasswordService(match);

  let content = (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Spinner></Spinner>
    </Container>
  );

  if (isValidToken) {
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
            Reset hasła
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Hasło"
                  type="password"
                  id="password"
                  error={is_password_valid}
                  helperText={
                    is_password_valid
                      ? 'Hasło musi się składać z co najmniej 7 i co najwyżej 14 znaków. Prawidłowe hasło musi zawierać co najmniej jedną małą literę, co najmniej jedna duża literę,jeden znak specjalny oraz jedną cyfrę.'
                      : ''
                  }
                  onChange={event => changePasswordHandler(event)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={event => resetPassword(event)}
            >
              Zmień
            </Button>
          </form>
        </div>
        <Box mt={5}></Box>
      </Container>
    );
  } else {
    content = (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Spinner></Spinner>
      </Container>
    );
  }

  return content;
};
export default ResetPassword;
