import { useState } from 'react';

import { useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import * as authActions from '@actions/index';

import { MENU_ROUTES } from '@routes';

import useStyles from './styles';

export const useLoginService = () => {
  const history = useHistory();

  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLoading = useSelector(state => state.utils.isLoading);
  const dispatch = useDispatch();

  const userLoginHandler = event => {
    event.preventDefault();
    const userInput = { email: email, password: password };
    dispatch(authActions.authStart(userInput));
  };
  const userUsosLoginHandler = event => {
    event.preventDefault();
    window.location.href =
      'https://devcourt.projektstudencki.pl/api/loginUsos/connect';
  };

  const registerHandler = event => {
    event.preventDefault();
    history.push(MENU_ROUTES.REGISTER);
  };

  const rememberPasswordHandler = event => {
    event.preventDefault();
    history.push(MENU_ROUTES.PASSWORD_REC);
  };

  const changeNameHandler = event => {
    setEmail(event.target.value);
  };

  const changeEmailHandler = event => {
    setPassword(event.target.value);
  };

  return {
    classes,
    isLoading,
    userLoginHandler,
    userUsosLoginHandler,
    registerHandler,
    rememberPasswordHandler,
    changeNameHandler,
    changeEmailHandler,
    email,
    password,
  };
};
