import React, {
  useState,
  useEffect
} from 'react';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import {
  withRouter
} from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Spinner from '../UI/Spinner/Spinner';

import {
  useConstructor
} from '../../utils/customHooks';
import {
  MENU_ROUTES
} from '../../constansts/routes/routes';
import * as recoveryActions from '../../store/actions/index';

import useStyles from './ResetPasswordStyle';

const ResetPassword = (props) => {
  const classes = useStyles();
  const [is_password_valid, setPasswordValid] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.utils.isLoading);
  const isValidToken = useSelector(
    (state) => state.recoveryPassword.isValidToken
  );
  const email = useSelector((state) => state.recoveryPassword.email);

  const [error, setError] = useState(true);
  const [password, setPassword] = useState('');
  const token = props.match.params.token;

  useConstructor(() => {
    dispatch(recoveryActions.resetPasswordStart(props.match.params.token));
  });

  const changePasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const resetPassword = (event) => {
    // eslint-disable-next-line
    let passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    event.preventDefault();
    if (password.match(passw)) {
      const userEmail = email.email;
      dispatch(
        recoveryActions.updatePasswordStart(
          userEmail,
          token,
          password,
          props.history
        )
      );
    } else {
      setPasswordValid(true)
    }
  };

  let content = ( <
    Container component = "main"
    maxWidth = "xs" >
    <
    CssBaseline / >
    <
    Spinner > < /Spinner> <
    /Container>
  );

  if (isValidToken) {
    content = isLoading ? ( <
      Container component = "main"
      maxWidth = "xs" >
      <
      CssBaseline / >
      <
      Spinner > < /Spinner> <
      /Container>
    ) : ( <
      Container component = "main"
      maxWidth = "xs" >
      <
      CssBaseline / >
      <
      div className = {
        classes.paper
      } >
      <
      Avatar className = {
        classes.avatar
      } >
      <
      LockOutlinedIcon / >
      <
      /Avatar> <
      Typography component = "h1"
      variant = "h5" >
      Reset hasła <
      /Typography> <
      form className = {
        classes.form
      }
      noValidate >
      <
      Grid container spacing = {
        2
      } >
      <
      Grid item xs = {
        12
      } >
      <
      TextField variant = "outlined"
      required fullWidth name = "password"
      label = "Hasło"
      type = "password"
      id = "password"
      error = {
        is_password_valid
      }
      helperText = {
        is_password_valid ?
        'Hasło musi się składać z co najmniej 7 i co najwyżej 14 znaków. Prawidłowe hasło musi zawierać co najmniej jedną małą literę, co najmniej jedna duża literę,jeden znak specjalny oraz jedną cyfrę.' :
          ''
      }
      onChange = {
        (event) => changePasswordHandler(event)
      }
      /> <
      /Grid> <
      /Grid> <
      Button fullWidth variant = "contained"
      color = "primary"
      className = {
        classes.submit
      }
      onClick = {
        (event) => resetPassword(event)
      } >
      Zmień <
      /Button> <
      /form> <
      /div> <
      Box mt = {
        5
      } > < /Box> <
      /Container>
    );
  } else {
    content = ( <
      Container component = "main"
      maxWidth = "xs" >
      <
      CssBaseline / >
      <
      Spinner > < /Spinner> <
      /Container>
    );
  }

  return content;
};
export default withRouter(ResetPassword);