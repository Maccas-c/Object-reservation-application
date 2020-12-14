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

import Spinner from '../../UI/Spinner';

import { useRememberPasswordService } from './service';

const RememberPassword = () => {
  const {
    classes,
    isLoading,
    email,
    inputMailHandler,
    sendResetMailHandler,
    backToLoginHandler,
  } = useRememberPasswordService();

  let content = (
    <Container {...{ component: 'main', maxWidth: 'xs' }}>
      <CssBaseline />
      <Spinner />
    </Container>
  );
  content = isLoading ? (
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
        <Typography {...{ component: 'h1', variant: 'h5' }}>
          Przypomnij Hasło
        </Typography>
        <form {...{ className: classes.form }} noValidate>
          <Grid container {...{ spacing: 2 }}>
            <Grid item {...{ xs: 12 }}>
              <TextField
                {...{
                  variant: 'outlined',
                  label: 'E-mail',
                  onChange: event => inputMailHandler(event),
                }}
                required
                fullWidth
              />
            </Grid>
          </Grid>
          <Button
            {...{
              variant: 'contained',
              type: 'submit',
              color: 'primary',
              className: classes.submit,
              onClick: event => sendResetMailHandler(event, email),
            }}
            fullWidth
          >
            Przypomnij hasło
          </Button>
          <Grid container justify="flex-end">
            <Link
              {...{
                variant: 'body2',
                href: '',
                onClick: event => backToLoginHandler(event),
              }}
            >
              Cofnij się do logowania!
            </Link>
          </Grid>
        </form>
      </div>
      <Box {...{ mt: 5 }}></Box>
    </Container>
  );

  return content;
};
export default RememberPassword;
