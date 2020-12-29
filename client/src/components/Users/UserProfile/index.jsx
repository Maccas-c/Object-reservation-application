import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import {
  Avatar,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from '@material-ui/core';
import PersonPinIcon from '@material-ui/icons/PersonPin';

import Spinner from '@UI/Spinner';

import { useUserProfileService } from './service';

const UserProfile = () => {
  const {
    classes,
    name,
    surname,
    email,
    phoneNumber,
    age,
    city,
    street,
    postalCode,
    sex,
    nip,
    isLoading,
  } = useUserProfileService();

  let userPanel = (
    <Container {...{ component: 'main', maxWidth: 'xs' }}>
      <CssBaseline />
      <Spinner />
    </Container>
  );
  userPanel = isLoading ? (
    <Container {...{ component: 'main', maxWidth: 'xs' }}>
      <CssBaseline />
      <Spinner />
    </Container>
  ) : (
    <Container {...{ component: 'main', maxWidth: 'xs' }}>
      <CssBaseline />
      <div {...{ className: classes.paper }}>
        <Avatar {...{ className: classes.avatar }}>
          <PersonPinIcon />
        </Avatar>
        <Typography
          {...{
            component: 'h1',
            variant: 'h5',
            style: { fontFamily: 'roboto' },
          }}
        >
          Profil użytkownika
        </Typography>
        <form
          noValidate
          {...{
            className: classes.form,
            autoComplete: 'off',
          }}
        >
          <Grid container {...{ spacing: 2 }}>
            <Grid item {...{ xs: 12 }}>
              <TextField
                {...{
                  disabled: true,
                  variant: 'outlined',
                  id: 'name',
                  label: 'Imię',
                  name: 'name',
                  value: name,
                }}
                fullWidth
              />
            </Grid>
            <Grid item {...{ xs: 12 }}>
              <TextField
                {...{
                  disabled: true,
                  variant: 'outlined',
                  id: 'surname',
                  label: 'Nazwisko',
                  name: 'surname',
                  value: surname,
                }}
                fullWidth
              />
            </Grid>
            <Grid {...{ xs: 12 }}>
              <TextField
                {...{
                  disabled: true,
                  variant: 'outlined',
                  id: 'email',
                  label: 'E-mail',
                  name: 'email',
                  value: email,
                }}
                fullWidth
              />
            </Grid>
            <Grid {...{ xs: 6 }}>
              <TextField
                {...{
                  disabled: true,
                  variant: 'outlined',
                  id: 'email',
                  label: 'Numer telefonu',
                  name: 'phoneNumber',
                  value: phoneNumber ? phoneNumber : 'Nie podano',
                }}
                fullWidth
              />
            </Grid>
            <Grid item {...{ xs: 6 }}>
              <TextField
                {...{
                  disabled: true,
                  variant: 'outlined',
                  id: 'age',
                  label: 'Wiek',
                  name: 'age',
                  value: age ? age : 'Nie podano',
                }}
                fullWidth
              />
            </Grid>
            <Grid item {...{ xs: 6 }}>
              <TextField
                {...{
                  disabled: true,
                  variant: 'outlined',
                  id: 'city',
                  label: 'Miasto',
                  name: 'city',
                  value: city ? city : 'Nie podano',
                }}
                fullWidth
              />
            </Grid>
            <Grid item {...{ xs: 6 }}>
              <TextField
                {...{
                  disabled: true,
                  variant: 'outlined',
                  id: 'postalCode',
                  label: 'Kod pocztowy',
                  name: 'postalCode',
                  value: postalCode ? postalCode : 'Nie podano',
                }}
                fullWidth
              />
            </Grid>
            <Grid item {...{ xs: 12 }}>
              <TextField
                {...{
                  disabled: true,
                  variant: 'outlined',
                  id: 'street',
                  label: 'Ulica',
                  name: 'street',
                  value: street ? street : 'Nie podano',
                }}
                fullWidth
              />
            </Grid>
            <Grid item {...{ xs: 12 }}>
              <TextField
                {...{
                  disabled: true,
                  variant: 'outlined',
                  id: 'NIP',
                  label: 'NIP',
                  name: 'NIP',
                  value: nip,
                }}
                fullWidth
                required
              />
            </Grid>
            <Grid item {...{ xs: 12 }}>
              <TextField
                {...{
                  disabled: true,
                  variant: 'outlined',
                  id: 'sex',
                  label: 'Płeć',
                  name: 'sex',
                  value: sex ? sex : 'Nie podano',
                }}
                fullWidth
              />
            </Grid>
          </Grid>
        </form>
      </div>
      <Box {...{ mt: 5 }} />
    </Container>
  );

  return userPanel;
};

export default UserProfile;
