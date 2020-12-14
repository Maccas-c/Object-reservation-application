import { useState } from 'react';

import { useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import * as recoveryActions from '../../../store/actions/index';

import { MENU_ROUTES } from '../../../constants/routes/routes';

import useStyles from './styles';

export const useRememberPasswordService = () => {
  const classes = useStyles();

  const history = useHistory();

  const dispatch = useDispatch();
  const isLoading = useSelector(({ utils }) => utils.isLoading);

  const [email, setEmail] = useState('');

  const inputMailHandler = event => setEmail(event.target.value);

  const sendResetMailHandler = (event, email) => {
    event.preventDefault();
    const userEmail = { email: email };
    dispatch(recoveryActions.recoveryPasswordStart(userEmail, history));
  };

  const backToLoginHandler = event => {
    event.preventDefault();
    history.push(MENU_ROUTES.LOGIN);
  };

  return {
    classes,
    isLoading,
    email,
    inputMailHandler,
    sendResetMailHandler,
    backToLoginHandler,
  };
};
