import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';
import {Avatar, Box, Button, Container, FormControlLabel, Grid, TextField, Typography,} from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Spinner from '../UI/Spinner';

import * as userActions from '../../store/actions/index';

import useStyles from './styles';
import {Form, Formik} from "formik";

const UserProfile = ({history}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isStudent, setIsStudent] = useState(false);

    const userProfile = useSelector(state => state.userProfile.user);
    const isLoading = useSelector(state => state.utils.isLoading);

    const updatedUser = {
        id: '',
        name: '',
        surname: '',
        phone_number: '',
        age: '',
        adress_city: '',
        adress_postalCode: '',
        adress_street: '',
        sex: '',
        role: '',
        email: '',
        isStudent: '',
        nip: '',
    };


    useEffect(() => {
        if (!userProfile) {
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch(userActions.getUserProfileStart(user._id));
        }
        if (userProfile) {
            setIsStudent(userProfile.isStudent);
        }
    }, [dispatch, userProfile]);

    // const nipValid = /^((\d{3}[-]\d{3}[-]\d{2}[-]\d{2})|(\d{3}[-]\d{2}[-]\d{2}[-]\d{3}))$/;
    // const postcode = /^\d{2}[- ]{0,1}\d{3}$/;
    // const phoneN = /(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/;
    // const mail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // dispatch(userActions.updateUserProfileStart(updatedUser, history));
    // dispatch(userActions.updateAuthUserStart(updatedUser));


    return isLoading ? (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Spinner/>
        </Container>
    ) : (
        <Fragment>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <PersonPinIcon/>
                    </Avatar>
                    <Typography
                        style={{fontFamily: 'roboto'}}
                        component="h1"
                        variant="h5"
                    >
                        Profil użytkownika
                    </Typography>
                    <form className={classes.form} noValidate autoComplete="off">
                        <Formik initialValues={updatedUser}
                                onSubmit={(values, actions) => {
                                    console.log({values, actions});
                                    alert(JSON.stringify(values, null, 2));
                                    actions.setSubmitting(false);
                                }}
                                render={({handleSubmit, handleChange, handleBlur, errors}) => (
                                    <Form onSubmit={handleSubmit}>
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
                                                    value={updatedUser.email}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
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
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
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
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    name="phoneNumber"
                                                    label="Numer telefonu"
                                                    id="phoneNumber"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    name="age"
                                                    label="Wiek"
                                                    id="age"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    name="city"
                                                    label="Miasto"
                                                    id="city"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    name="postalCode"
                                                    label="Kod pocztowy"
                                                    id="postalCode"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
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
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    name="NIP"
                                                    label="NIP"
                                                    id="NIP"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                />
                                            </Grid>

                                            <FormControl>
                                                <FormLabel>Płeć</FormLabel>
                                                <RadioGroup
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                >
                                                    <FormControlLabel
                                                        disabled={isStudent}
                                                        value="female"
                                                        control={<Radio/>}
                                                        label="Kobieta"
                                                    />
                                                    <FormControlLabel
                                                        disabled={isStudent}
                                                        value="male"
                                                        control={<Radio/>}
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
                                            type="submit"
                                        >
                                            Zapisz
                                        </Button>
                                    </Form>
                                )}
                        />
                    </form>
                </div>
                <Box mt={5}/>
            </Container>
        </Fragment>
    );
};

export default UserProfile;
