import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { MENU_ROUTES } from '../../constansts/routes/routes';
import * as authActions from '../../store/actions/index';

const Login = (props) => {
  const isLoggedIn = useSelector((state) => state.user);
  const dispatch = useDispatch();

  let userLoggedIn = null;

  if (isLoggedIn) {
    userLoggedIn = <Redirect to={MENU_ROUTES.HOME}></Redirect>;
  }

  const userLoginHandler = () => {
    dispatch(authActions.auth());
    props.history.replace(MENU_ROUTES.HOME);
  };

  return (
    <Fragment>
      {userLoggedIn}
      <button onClick={userLoginHandler}>Login</button>
    </Fragment>
  );
};
export default Login;
