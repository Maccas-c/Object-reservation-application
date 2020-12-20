import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from '@material-ui/core';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Spinner from '../UI/Spinner';

import * as userActions from '../../store/actions/index';

import useStyles from './styles';
import {Form, Formik} from "formik";
import {userProfileEdit} from "../../constants/validation/validationSchema";
import {userProfileTransform} from "../../constants/validation/initialValuesValidation";

const UserProfile = ({history}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState('')

    const userProfile = useSelector(state => state.userProfile.user);
    const isLoading = useSelector(({utils}) => utils.isLoading);

    useEffect(() => {
        if (!userProfile) {
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch(userActions.getUserProfileStart(user._id));
        }
        if (userProfile) {
            setFormValues(userProfile)
        }
    }, [dispatch, userProfile]);

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
                    <form className={classes.form}>
                        <Formik
                            enableReinitialize={true}
                            initialValues={userProfileTransform(formValues)}
                            validationSchema={userProfileEdit}
                            onSubmit={(values, actions) => {
                                dispatch(userActions.updateUserProfileStart(values, history));
                                dispatch(userActions.updateAuthUserStart(values));
                                actions.setSubmitting(false);
                            }}
                            render={({
                                         handleSubmit,
                                         handleChange,
                                         handleBlur,
                                         errors: {adress_postalCode, age, nip, phone_number},
                                         values: {adress_city, adress_postalCode: adress_postalCode1, adress_street, age: age1, email, name, nip: nip1, phone_number: phone_number1, sex, surname}
                                     }) => (
                                <Form onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                disabled={userProfile?.isStudent ?? null}
                                                required
                                                fullWidth
                                                id="name"
                                                label="Imię"
                                                name="name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={name}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                disabled={userProfile?.isStudent ?? null}
                                                required
                                                fullWidth
                                                id="surname"
                                                label="Nazwisko"
                                                name="surname"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={surname}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                disabled={userProfile?.isStudent ?? null}
                                                required
                                                fullWidth
                                                name="email"
                                                label="E-mail"
                                                id="email"
                                                type='email'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={email}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="phone_number"
                                                type='number'
                                                label="Numer telefonu"
                                                id="phone_number"
                                                helperText={phone_number}
                                                error={phone_number}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={phone_number1}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="age"
                                                label="Wiek"
                                                type='number'
                                                helperText={age}
                                                error={age}
                                                id="age"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={age1}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="adress_city"
                                                label="Miasto"
                                                id="city"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={adress_city}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="adress_postalCode"
                                                helperText={adress_postalCode}
                                                error={adress_postalCode}
                                                label="Kod pocztowy"
                                                id="adress_postalCode"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={adress_postalCode1}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="adress_street"
                                                label="Ulica"
                                                id="adress_street"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={adress_street}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="nip"
                                                label="NIP"
                                                id="nip"
                                                error={nip}
                                                helperText={nip}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={nip1}
                                            />
                                        </Grid>
                                        <FormControl>
                                            <FormLabel>Płeć</FormLabel>
                                            <RadioGroup
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={sex}
                                            >
                                                <FormControlLabel
                                                    disabled={true}
                                                    value="female"
                                                    control={<Radio/>}
                                                    label="Kobieta"
                                                />
                                                <FormControlLabel
                                                    disabled={true}
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
