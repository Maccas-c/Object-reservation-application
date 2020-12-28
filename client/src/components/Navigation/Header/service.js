import { useState } from 'react';
import { useDispatch } from 'react-redux';

import * as authActions from '../../../store/actions/index';

import useStyles from './styles';

export const useHeaderService = (value, toggleMode) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  let [valueHelper] = useState(0);
  if (valueHelper.toString() !== value) {
    valueHelper = value;
  }
  let [switchMode, setSwitchMode] = useState(value !== 0);

  let logoutButton = null;
  let menuIcon = null;

  const switchTheme = event => {
    if (event.target.checked) {
      valueHelper = 1;
      setSwitchMode(true);
    } else {
      valueHelper = 0;
      setSwitchMode(false);
    }
    dispatch(authActions.switchModeTheme(toggleMode, valueHelper));
  };

  const logoutHandler = event => {
    event.preventDefault();
    dispatch(authActions.logout());
  };

  const logoutUsosHandler = event => {
    event.preventDefault();
    dispatch(authActions.startLoadingUser());
    dispatch(authActions.logoutUsos());
  };

  return {
    classes,
    switchMode,
    switchTheme,
    logoutHandler,
    logoutUsosHandler,
    logoutButton,
    menuIcon,
  };
};
