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
    Container,
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

    const [is_phoneNumber_valid, setPhoneValid] = useState(false);
    const [is_postalCode_valid, setPostalCodeValid] = useState(false);
    const [is_email_valid, setEmailValid] = useState(false);
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
    const [nip, setNIP] = useState('');
    const [is_nip_valid, setNipVaild] = useState(false);

    const userProfile = useSelector((state) => state.userProfile.user);
    const isLoading = useSelector((state) => state.utils.isLoading);

    useEffect(() => {
        if (!userProfile) {
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch(userActions.getUserProfileStart(user._id));
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
            setNIP(userProfile.nip);
        }
    }, [dispatch, userProfile]);

    const updateUserHandler = (event) => {
        event.preventDefault();
        const nipValid = /^((\d{3}[-]\d{3}[-]\d{2}[-]\d{2})|(\d{3}[-]\d{2}[-]\d{2}[-]\d{3}))$/;
        const postcode = /^\d{2}[- ]{0,1}\d{3}$/;
        const phoneN = /(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/;
        // eslint-disable-next-line
        const mail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (
            email.match(mail) &&
            phoneNumber.match(phoneN) &&
            postalCode.match(postcode) &&
            nip.match(nipValid)
        ) {
            const updatedUser = {
                id: id,
                name: name,
                surname: surname,
                phone_number: phoneNumber,
                age: age,
                adress_city: city,
                adress_postalCode: postalCode,
                adress_street: street,
                sex: sex,
                role: role,
                email: email,
                isStudent: isStudent,
                nip: nip,
            };
            dispatch(
                userActions.updateUserProfileStart(updatedUser, props.history)
            );
            dispatch(userActions.updateAuthUserStart(updatedUser));
        } else if (
            !email.match(mail) &&
            phoneNumber.match(phoneN) &&
            postalCode.match(postcode) &&
            nip.match(nipValid)
        ) {
            setEmailValid(true);
        } else if (
            email.match(mail) &&
            !phoneNumber.match(phoneN) &&
            postalCode.match(postcode) &&
            nip.match(nipValid)
        ) {
            setPhoneValid(true);
        } else if (
            email.match(mail) &&
            phoneNumber.match(phoneN) &&
            !postalCode.match(postcode) &&
            nip.match(nipValid)
        ) {
            setPostalCodeValid(true);
        } else if (
            email.match(mail) &&
            phoneNumber.match(phoneN) &&
            postalCode.match(postcode) &&
            !nip.match(nipValid)
        ) {
            setNipVaild(true);
        } else if (
            !email.match(mail) &&
            !phoneNumber.match(phoneN) &&
            postalCode.match(postcode) &&
            nip.match(nipValid)
        ) {
            setPhoneValid(true);
            setEmailValid(true);
        } else if (
            !email.match(mail) &&
            phoneNumber.match(phoneN) &&
            !postalCode.match(postcode) &&
            nip.match(nipValid)
        ) {
            setPhoneValid(true);
            setEmailValid(true);
        } else if (
            !email.match(mail) &&
            phoneNumber.match(phoneN) &&
            postalCode.match(postcode) &&
            !nip.match(nipValid)
        ) {
            setEmailValid(true);
            setNipVaild(true);
        } else if (
            email.match(mail) &&
            !phoneNumber.match(phoneN) &&
            !postalCode.match(postcode) &&
            nip.match(nipValid)
        ) {
            setPostalCodeValid(true);
            setPhoneValid(true);
        } else if (
            email.match(mail) &&
            !phoneNumber.match(phoneN) &&
            postalCode.match(postcode) &&
            !nip.match(nipValid)
        ) {
            setPhoneValid(true);
            setNipVaild(true);
        } else if (
            !email.match(mail) &&
            !phoneNumber.match(phoneN) &&
            postalCode.match(postcode) &&
            !nip.match(nipValid)
        ) {
            setEmailValid(true);
            setNipVaild(true);
            setPhoneValid(true);
        } else if (
            email.match(mail) &&
            !phoneNumber.match(phoneN) &&
            !postalCode.match(postcode) &&
            !nip.match(nipValid)
        ) {
            setPhoneValid(true);
            setPostalCodeValid(true);
            setNipVaild(true);
        } else if (
            !email.match(mail) &&
            phoneNumber.match(phoneN) &&
            !postalCode.match(postcode) &&
            !nip.match(nipValid)
        ) {
            setNipVaild(true);
            setEmailValid(true);
            setPostalCodeValid(true);
        } else if (
            !email.match(mail) &&
            !phoneNumber.match(phoneN) &&
            postalCode.match(postcode) &&
            !nip.match(nipValid)
        ) {
            setNipVaild(true);
            setEmailValid(true);
            setPhoneValid(true);
        } else if (
            !email.match(mail) &&
            !phoneNumber.match(phoneN) &&
            !postalCode.match(postcode) &&
            nip.match(nipValid)
        ) {
            setEmailValid(true);
            setPhoneValid(true);
            setPostalCodeValid(true);
        } else if (
            email.match(mail) &&
            phoneNumber.match(phoneN) &&
            !postalCode.match(postcode) &&
            !nip.match(nipValid)
        ) {
            setNipVaild(true);
            setPostalCodeValid(true);
        } else {
            setPostalCodeValid(true);
            setEmailValid(true);
            setPhoneValid(true);
            setNipVaild(true);
        }
    };

    const changeNIPHandler = (event) => {
        setNIP(event.target.value);
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

    let userPanel = (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <Spinner></Spinner>
        </Container>
    );
    userPanel = isLoading ? (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <Spinner></Spinner>
        </Container>
    ) : (
        <Fragment>
            <Container component='main' maxWidth='xs'>
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <PersonPinIcon />
                    </Avatar>
                    <Typography
                        style={{ fontFamily: 'roboto' }}
                        component='h1'
                        variant='h5'>
                        Profil użytkownika
                    </Typography>
                    <form
                        className={classes.form}
                        noValidate
                        autoComplete='off'>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant='outlined'
                                    disabled={isStudent}
                                    required
                                    fullWidth
                                    id='name'
                                    label='Imię'
                                    name='name'
                                    value={name}
                                    onChange={(event) =>
                                        changeNameHandler(event)
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant='outlined'
                                    disabled={isStudent}
                                    required
                                    fullWidth
                                    id='surname'
                                    label='Nazwisko'
                                    name='surname'
                                    value={surname}
                                    onChange={(event) =>
                                        changeSurnameHandler(event)
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant='outlined'
                                    disabled={isStudent}
                                    required
                                    fullWidth
                                    name='email'
                                    label='E-mail'
                                    id='email'
                                    error={is_email_valid}
                                    helperText={
                                        is_email_valid
                                            ? 'Niepoprawny format mail'
                                            : ''
                                    }
                                    value={email}
                                    onChange={(event) =>
                                        changeEmailHandler(event)
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    variant='outlined'
                                    required
                                    fullWidth
                                    name='phoneNumber'
                                    label='Numer telefonu'
                                    id='phoneNumber'
                                    error={is_phoneNumber_valid}
                                    helperText={
                                        is_phoneNumber_valid
                                            ? 'Niepoprawny format numeru'
                                            : ''
                                    }
                                    value={phoneNumber}
                                    onChange={(event) =>
                                        changePhoneNumberHandler(event)
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    variant='outlined'
                                    required
                                    fullWidth
                                    name='age'
                                    label='Wiek'
                                    id='age'
                                    value={age}
                                    onChange={(event) =>
                                        changeAgeHandler(event)
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    variant='outlined'
                                    required
                                    fullWidth
                                    name='city'
                                    label='Miasto'
                                    id='city'
                                    value={city}
                                    onChange={(event) =>
                                        changeCityHandler(event)
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    variant='outlined'
                                    required
                                    fullWidth
                                    name='postalCode'
                                    label='Kod pocztowy'
                                    id='postalCode'
                                    error={is_postalCode_valid}
                                    helperText={
                                        is_postalCode_valid
                                            ? 'Niepoprawny kod-pocztowy'
                                            : ''
                                    }
                                    value={postalCode}
                                    onChange={(event) =>
                                        changePostalCodeHandler(event)
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant='outlined'
                                    required
                                    fullWidth
                                    name='street'
                                    label='Ulica'
                                    id='street'
                                    value={street}
                                    onChange={(event) =>
                                        changeStreetHandler(event)
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant='outlined'
                                    required
                                    fullWidth
                                    name='NIP'
                                    label='NIP'
                                    id='NIP'
                                    value={nip}
                                    error={is_nip_valid}
                                    helperText={
                                        is_nip_valid
                                            ? 'Niepoprawny kod-pocztowy'
                                            : ''
                                    }
                                    onChange={(event) =>
                                        changeNIPHandler(event)
                                    }
                                />
                            </Grid>

                            <FormControl>
                                <FormLabel>Płeć</FormLabel>
                                <RadioGroup
                                    value={sex}
                                    onChange={(event) =>
                                        changeSexHandler(event)
                                    }>
                                    <FormControlLabel
                                        disabled={isStudent}
                                        value='female'
                                        control={<Radio />}
                                        label='Kobieta'
                                    />
                                    <FormControlLabel
                                        disabled={isStudent}
                                        value='male'
                                        control={<Radio />}
                                        label='Mężczyzna'
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Button
                            fullWidth
                            variant='contained'
                            color='primary'
                            disabled={
                                !name ||
                                !surname ||
                                !email ||
                                !phoneNumber ||
                                !age ||
                                !postalCode
                            }
                            className={classes.submit}
                            onClick={(event) => {
                                updateUserHandler(event);
                            }}>
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
