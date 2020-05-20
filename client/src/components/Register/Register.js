import React, { useState } from 'react';
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
  FormHelperText,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { MENU_ROUTES } from '../../constansts/routes/routes';
import * as regActions from '../../store/actions/index';
import useStyles from './RegisterStyles';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';

const Register = props => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const dispatch = useDispatch();
  const loginHandler = event => {
    event.preventDefault();
    props.history.push(MENU_ROUTES.LOGIN);
  };
  const [sex, setSex] = useState('male');

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

  const userRegisterHandler = event => {
    event.preventDefault();
    const userInput = {
      email: email,
      password: password,
      name: name,
      surname: surname,
      sex: sex,
    };
    dispatch(regActions.registerStart(userInput, props.history));
  };
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Rejestracja
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
                error={email.length === 0 ? true : false}
                name='email'
                autoComplete='email'
                value={email}
                onChange={event => changeEmailHandler(event)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='name'
                label='Imię'
                type='name'
                error={name.length === 0 ? true : false}
                id='name'
                value={name}
                onChange={event => changeNameHandler(event)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='surname'
                label='Nazwisko'
                type='surname'
                error={surname.length === 0 ? true : false}
                id='surname'
                value={surname}
                onChange={event => changeSurnameHandler(event)}
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
                error={password.length === 0 ? true : false}
                autoComplete='current-password'
                value={password}
                onChange={event => changePasswordHandler(event)}
              />
            </Grid>
            <FormControl component='fieldset'>
              <FormLabel component='legend'>Płeć</FormLabel>
              <RadioGroup
                aria-label='gender'
                name='gender1'
                value={sex}
                onChange={event => handleChange(event)}>
                <FormControlLabel
                  value='female'
                  control={<Radio />}
                  label='Kobieta'
                />
                <FormControlLabel
                  value='male'
                  control={<Radio />}
                  label='Mężczyzna'
                />
              </RadioGroup>
            </FormControl>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value='allowExtraEmails' color='primary' />}
                label='Zapoznałem się z regulaminem aplikacji.'
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={event => userRegisterHandler(event)}
            disabled={!email || !password || !name || !surname || !sex}>
            Załóż konto
          </Button>

          <Grid container justify='flex-end'>
            <Grid item>
              <Link
                variant='body2'
                onClick={event => loginHandler(event)}
                href=''>
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
