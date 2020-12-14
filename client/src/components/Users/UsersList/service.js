import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MENU_ROUTES } from '../../../constants/routes/routes';
import * as userActions from '../../../store/actions/index';

import useStyles from './styles';

export const useUsersListService = ({ history }) => {
  const classes = useStyles();

  const users = useSelector(state => state.usersList.users);
  const isLoading = useSelector(state => state.utils.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.loadUsersStart());
  }, [dispatch]);

  const deleteUserHandler = id => {
    dispatch(userActions.deleteUserStart(id));
  };

  const getUserHandler = (event, id) => {
    event.preventDefault();
    dispatch(userActions.getUserStart(id));
    history.push(MENU_ROUTES.ADMIN_USER_PROFILE);
  };

  return { classes, users, isLoading, deleteUserHandler, getUserHandler };
};
