import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import {
    Avatar,
    Link,
    Grid,
    Box,
    Typography,
    Container,
    Radio
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
    Formik,
    Form,
} from 'formik';
import {MENU_ROUTES} from '../../constants/routes/routes';

import useStyles from './styles';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";


const Register = ({history}) => {
    const classes = useStyles();
    const initialValues = {
        email: '',
        name: '',
        surname: '',
        sex:'male',
        password: ''
    }


    const loginHandler = event => {
        event.preventDefault();
        history.push(MENU_ROUTES.LOGIN);
    };


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography
                    style={{fontFamily: 'roboto'}}
                    component="h1"
                    variant="h5"
                >
                    Rejestracja
                </Typography>
                <form className={classes.form} noValidate>
                    <Formik initialValues={initialValues}
                            onSubmit={(values, actions) => {
                                console.log({values, actions});
                                alert(JSON.stringify(values, null, 2));
                                actions.setSubmitting(false);
                            }}
                    render={({handleSubmit,handleChange,handleBlur}) =>(
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
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Płeć</FormLabel>
                                    <RadioGroup
                                        aria-label="gender"
                                        name="sex"
                                        onChange={event => handleChange(event)}
                                    >
                                        <FormControlLabel
                                            value="female"
                                            control={<Radio/>}
                                            label="Kobieta"
                                        />
                                        <FormControlLabel
                                            value="male"
                                            control={<Radio/>}
                                            label="Mężczyzna"
                                        />
                                    </RadioGroup>
                                </FormControl>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                style={{fontFamily: 'roboto'}}
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
                            <button type="submit">Submit</button>
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
            <Box mt={5}/>
        </Container>
    );
};
export default Register;
