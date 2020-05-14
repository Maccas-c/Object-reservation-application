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
  Container
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { MENU_ROUTES } from '../../constansts/routes/routes';

import useStyles from './RememberPasswordStyle';

const RememberPassword = (props) => {
  const classes = useStyles();

  const changeLoginHandler = (event) => {
    event.preventDefault();
    props.history.replace(MENU_ROUTES.LOGIN);
  };

  return (
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
              <TextField variant="outlined" required fullWidth label="E-mail" />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
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
};
export default RememberPassword;
