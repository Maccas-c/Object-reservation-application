import { useState } from 'react';

import { useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { useConstructor } from '@utils/customHooks';
import * as recoveryActions from '@actions/index';

import useStyles from './styles';

export const useResetPasswordService = ({ match }) => {
  const classes = useStyles();

  const history = useHistory();

  const [is_password_valid, setPasswordValid] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector(({ utils }) => utils.isLoading);
  const isValidToken = useSelector(
    ({ recoveryPassword }) => recoveryPassword.isValidToken,
  );
  const email = useSelector(({ recoveryPassword }) => recoveryPassword.email);

  const [password, setPassword] = useState('');
  const token = match.params.token;

  useConstructor(() =>
    dispatch(recoveryActions.resetPasswordStart(match.params.token)),
  );

  const changePasswordHandler = event => setPassword(event.target.value);

  const resetPassword = event => {
    event.preventDefault();
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
          history,
        ),
      );
    } else {
      setPasswordValid(true);
    }
  };

  return {
    classes,
    is_password_valid,
    isLoading,
    isValidToken,
    changePasswordHandler,
    resetPassword,
  };
};
