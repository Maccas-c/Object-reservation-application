import React from 'react';

import { Form, Formik } from 'formik';

import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Link,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import * as appAction from '@actions/index';

import { useRegisterService } from './service';

import { initialValuesRegister } from '@constants/validation/initialValuesValidation';
import { registerSchema } from '@constants/validation/validationSchema';

const Register = ({ history }) => {
  const { classes, loginHandler, dispatch } = useRegisterService();

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
          <Formik
            initialValues={initialValuesRegister}
            validationSchema={registerSchema}
            onSubmit={(values, actions) => {
              dispatch(appAction.registerStart(values, history));
              actions.setSubmitting(false);
            }}
            render={({
              handleSubmit,
              handleChange,
              handleBlur,
              errors: { name, password, surname },
            }) => (
              <Form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      type={'email'}
                      label={'E-mail'}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
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
                      error={name}
                      helperText={name}
                      onBlur={handleBlur}
                      onChange={handleChange}
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
                      error={surname}
                      helperText={surname}
                      onBlur={handleBlur}
                      onChange={handleChange}
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
                      error={password}
                      helperText={password}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </Grid>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Płeć</FormLabel>
                    <RadioGroup
                      aria-label="gender"
                      name="sex"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      defaultValue={'female'}
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
                          onChange={handleChange}
                          onBlur={handleBlur}
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
                  type="submit"
                >
                  Załóż konto
                </Button>
              </Form>
            )}
          />

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
      <Box mt={5} />
    </Container>
  );
};

export default Register;
