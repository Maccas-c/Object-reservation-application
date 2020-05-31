import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';
import {
  Avatar,
  TextField,
  Grid,
  Box,
  Typography,
  Container
} from '@material-ui/core';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Spinner from '../UI/Spinner/Spinner';

import useStyles from './UserProfileStyles';

const UserProfile = (props) => {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [sex, setSex] = useState('');

  const userProfile = useSelector((state) => state.usersList.user);
  const isLoading = useSelector((state) => state.utils.isLoading);

  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name);
      setSurname(userProfile.surname);
      setEmail(userProfile.email);
      setPhoneNumber(userProfile.phone_number);
      setAge(userProfile.age);
      setCity(userProfile.adress_city);
      setStreet(userProfile.adress_street);
      setPostalCode(userProfile.adress_postalCode);
      setSex(userProfile.sex);
    }
  }, [userProfile]);

  let userPanel = (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Spinner></Spinner>
    </Container>
  );
  userPanel = isLoading ? (
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
                  disabled={true}
                  variant="outlined"
                  fullWidth
                  id="name"
                  label="Imię"
                  name="name"
                  value={name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  disabled={true}
                  variant="outlined"
                  fullWidth
                  id="surname"
                  label="Nazwisko"
                  name="surname"
                  value={surname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  disabled={true}
                  variant="outlined"
                  fullWidth
                  name="email"
                  label="E-mail"
                  id="email"
                  value={email}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  disabled={true}
                  variant="outlined"
                  fullWidth
                  name="phoneNumber"
                  label="Numer telefonu"
                  id="phoneNumber"
                  value={phoneNumber ? phoneNumber : 'Nie podano'}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  disabled={true}
                  variant="outlined"
                  fullWidth
                  name="age"
                  label="Wiek"
                  id="age"
                  value={age ? age : 'Nie podano'}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  disabled={true}
                  variant="outlined"
                  fullWidth
                  name="city"
                  label="Miasto"
                  id="city"
                  value={city ? city : 'Nie podano'}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  disabled={true}
                  variant="outlined"
                  fullWidth
                  name="postalCode"
                  label="Kod pocztowy"
                  id="postalCode"
                  value={postalCode ? postalCode : 'Nie podano'}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  disabled={true}
                  variant="outlined"
                  fullWidth
                  name="street"
                  label="Ulica"
                  id="street"
                  value={street ? street : 'Nie podano'}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  disabled={true}
                  variant="outlined"
                  fullWidth
                  name="sex"
                  label="Płeć"
                  id="sex"
                  value={sex ? sex : 'Nie podano'}
                />
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}></Box>
      </Container>
    </Fragment>
  );

  return userPanel;
};

export default UserProfile;
