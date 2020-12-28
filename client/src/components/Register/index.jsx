import React, { useState } from 'react';

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
  Radio,
  RadioGroup,
  FormLabel,
  FormControl,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { useDispatch } from 'react-redux';

import * as regActions from '../../store/actions/index';

import { MENU_ROUTES } from '../../constants/routes';

import useStyles from './styles';

const Register = ({ history }) => {
  const classes = useStyles();

  const [check, setCheck] = useState({ ChangeState: false });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [is_email_valid, setEmailValid] = useState(false);
  const [is_password_valid, setPasswordValid] = useState(false);
  const [sex, setSex] = useState('male');

  const dispatch = useDispatch();

  const loginHandler = event => {
    event.preventDefault();
    history.push(MENU_ROUTES.LOGIN);
  };

  const handleChange = event => {
    setSex(event.target.value);
  };
  const changeNameHandler = event => {
    setName(event.target.value);
  };

  const changeSurnameHandler = event => {
    setSurname(event.target.value);
  };

  const changePasswordHandler = event => {
    setPassword(event.target.value);
  };
  const changeEmailHandler = event => {
    setEmail(event.target.value);
  };

  const handleChangedTrue = () => {
    setCheck(check => ({
      ChangeState: !check.ChangeState,
    }));
  };

  const userRegisterHandler = event => {
    event.preventDefault();
    // eslint-disable-next-line
    let passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    // eslint-disable-next-line
    let mail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (password.match(passw) && email.match(mail)) {
      const userInput = {
        email: email,
        password: password,
        name: name,
        surname: surname,
        sex: sex,
        check: check,
      };
      dispatch(regActions.registerStart(userInput, history));
    } else if (password.match(passw) && !email.match(mail)) {
      setEmailValid(true);
      setPasswordValid(false);
    } else if (!password.match(passw) && email.match(mail)) {
      setEmailValid(false);
      setPasswordValid(true);
    } else {
      setPasswordValid(true);
      setEmailValid(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          style={{ fontFamily: 'roboto' }}
          component="h1"
          variant="h5"
        >
          Rejestracja
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
                error={is_email_valid}
                helperText={is_email_valid ? 'Niepoprawny format mail' : ''}
                value={email}
                onChange={event => changeEmailHandler(event)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="name"
                label="Imię"
                type="name"
                id="name"
                value={name}
                onChange={event => changeNameHandler(event)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="surname"
                label="Nazwisko"
                type="surname"
                id="surname"
                value={surname}
                onChange={event => changeSurnameHandler(event)}
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
                error={is_password_valid}
                helperText={
                  is_password_valid
                    ? 'Hasło musi się składać z co najmniej 6 i co najwyżej 20 znaków. Prawidłowe hasło musi zawierać co najmniej jedną małą literę, co najmniej jedna duża literę, jeden znak specjalny oraz jedną cyfrę.'
                    : ''
                }
                autoComplete="current-password"
                value={password}
                onChange={event => changePasswordHandler(event)}
              />
            </Grid>
            <FormControl component="fieldset">
              <FormLabel component="legend">Płeć</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={sex}
                onChange={event => handleChange(event)}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Kobieta"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Mężczyzna"
                />
              </RadioGroup>
            </FormControl>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    style={{ fontFamily: 'roboto' }}
                    value={check}
                    onChange={event => handleChangedTrue(event)}
                    required
                    color="primary"
                  />
                }
                label="Zapoznałem się z regulaminem aplikacji."
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={
              !email ||
              !password ||
              !name ||
              !surname ||
              !sex ||
              !check.ChangeState
            }
            onClick={event => userRegisterHandler(event)}
          >
            Załóż konto
          </Button>

          <Grid container justify="flex-end">
            <Grid item>
              <Link
                variant="body2"
                onClick={event => loginHandler(event)}
                href=""
              >
                Posiadasz już konto? Zaloguj się
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
};
export default Register;
