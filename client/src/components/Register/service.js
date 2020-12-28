import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { MENU_ROUTES } from '../../constants/routes';

import useStyles from './styles';

export const useRegisterService = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const history = useHistory();

  const loginHandler = event => {
    event.preventDefault();
    history.push(MENU_ROUTES.LOGIN);
  };

  return { classes, loginHandler, dispatch };
};
