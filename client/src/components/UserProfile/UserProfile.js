import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  FormControlLabel,
  Container
} from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import PersonPinIcon from '@material-ui/icons/PersonPin';

import * as userActions from '../../store/actions/index';

import useStyles from './UserProfileStyles';

const UserProfile = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [isValid, setValid] = useState(false);
  const [name, setName] = useState(user.name);
  const [surname, setSurname] = useState(user.surname);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phone_number);
  const [age, setAge] = useState(user.age);
  const [city, setCity] = useState(user.adress_city);
  const [street, setStreet] = useState(user.adress_street);
  const [postalCode, setPostalCode] = useState(user.postalCode);
  const [sex, setSex] = useState(user.sex);
  const [id] = useState(user.id);

  useEffect(() => {
    dispatch(userActions.getUserProfileStart(user.id));
  }, [dispatch, user.id]);

  const updateUserHandler = (event) => {
    event.preventDefault();
    const updatedUser = {
      id: id,
      name: name,
      surname: surname,
      email: email,
      phone_number: phoneNumber,
      age: age,
      adress_city: city,
      adress_postalCode: postalCode,
      sex: sex
    };
    console.log(updatedUser);
    dispatch(userActions.updateUserProfileStart(updatedUser, props.history));
  };

  const changeNameHandler = (event) => {
    setName(event.target.value);
  };

  const changeSurnameHandler = (event) => {
    setSurname(event.target.value);
  };

  const changeEmailHandler = (event) => {
    setEmail(event.target.value);
  };

  const changePhoneNumberHandler = (event) => {
    setPhoneNumber(event.target.value);
  };

  const changeAgeHandler = (event) => {
    setAge(event.target.value);
  };

  const changeCityHandler = (event) => {
    setCity(event.target.value);
  };

  const changeStreetHandler = (event) => {
    setStreet(event.target.value);
  };

  const changePostalCodeHandler = (event) => {
    setPostalCode(event.target.value);
  };

  const changeSexHandler = (event) => {
    setSex(event.target.value);
  };

  const checkValidHandler = () => {
    setValid(true);
  };

  return (
    <Fragment>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonPinIcon />
          </Avatar>
          <Typography
            style={{ fontFamily: 'roboto' }}
            component="h1"
            variant="h5"
          >
            Profil użytkownika
          </Typography>
          <form className={classes.form} noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Imię"
                  name="name"
                  value={name}
                  onChange={(event) => changeNameHandler(event)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="surname"
                  label="Nazwisko"
                  name="surname"
                  value={surname}
                  onChange={(event) => changeSurnameHandler(event)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="email"
                  label="E-mail"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(event) => changeEmailHandler(event)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="phoneNumber"
                  label="Numer telefonu"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(event) => changePhoneNumberHandler(event)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="age"
                  label="Wiek"
                  id="age"
                  value={age}
                  onChange={(event) => changeAgeHandler(event)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="city"
                  label="Miasto"
                  id="city"
                  value={city}
                  onChange={(event) => changeCityHandler(event)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="street"
                  label="Ulica"
                  id="street"
                  value={street}
                  onChange={(event) => changeStreetHandler(event)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="postalCode"
                  label="Kod pocztowy"
                  id="postalCode"
                  value={postalCode}
                  onChange={(event) => changePostalCodeHandler(event)}
                />
              </Grid>
              <FormControl>
                <FormLabel>Płeć</FormLabel>
                <RadioGroup
                  value={sex}
                  onChange={(event) => changeSexHandler(event)}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Kobieta"
                  />
                  <FormControlLabel
                    className={classes.sexPanel}
                    value="male"
                    control={<Radio />}
                    label="Mężczyzna"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={updateUserHandler}
            >
              Zapisz
            </Button>
          </form>
        </div>
        <Box mt={5}></Box>
      </Container>
    </Fragment>
  );
};

export default UserProfile;
