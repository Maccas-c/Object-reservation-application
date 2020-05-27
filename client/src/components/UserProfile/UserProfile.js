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
import Spinner from '../UI/Spinner/Spinner';

import * as userActions from '../../store/actions/index';

import useStyles from './UserProfileStyles';

const UserProfile = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [isValid, setValid] = useState(false);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [sex, setSex] = useState('');
  const [id, setId] = useState('');
  const [role, setRole] = useState('');
  const [isStudent, setIsStudent] = useState(false);

  const userProfile = useSelector((state) => state.userProfile.user);
  const isLoading = useSelector((state) => state.utils.isLoading);

  useEffect(() => {
    if (!userProfile) {
      const user = JSON.parse(localStorage.getItem('user'));
      dispatch(userActions.getUserProfileStart(user.id));
    }
    if (userProfile) {
      setId(userProfile._id);
      setName(userProfile.name);
      setSurname(userProfile.surname);
      setEmail(userProfile.email);
      setPhoneNumber(userProfile.phone_number);
      setAge(userProfile.age);
      setCity(userProfile.adress_city);
      setStreet(userProfile.adress_street);
      setPostalCode(userProfile.adress_postalCode);
      setSex(userProfile.sex);
      setRole(userProfile.role);
      setIsStudent(userProfile.isStudent);
    }
  }, [dispatch, userProfile]);

  const updateUserHandler = (event) => {
    event.preventDefault();
    const updatedUser = {
      id: id,
      name: name,
      surname: surname,
      'login.email': email,
      phone_number: phoneNumber,
      age: age,
      adress_city: city,
      adress_postalCode: postalCode,
      adress_street: street,
      sex: sex,
      role: role,
      email: email
    };
    dispatch(userActions.updateUserProfileStart(updatedUser));
    dispatch(userActions.updateAuthUserStart(updatedUser, props.history));
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

  const userPanel = isLoading ? (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Spinner></Spinner>
    </Container>
  ) : (
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
                  disabled={isStudent}
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
                  disabled={isStudent}
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
                  disabled={isStudent}
                  required
                  fullWidth
                  name="email"
                  label="E-mail"
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
                    disabled={isStudent}
                    value="female"
                    control={<Radio />}
                    label="Kobieta"
                  />
                  <FormControlLabel
                    disabled={isStudent}
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

  return userPanel;
};

export default UserProfile;
