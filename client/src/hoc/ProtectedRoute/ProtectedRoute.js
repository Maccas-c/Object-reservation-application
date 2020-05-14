import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as authActions from '../../store/actions/index';
import { useConstructor } from '../../utils/customHooks';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  useConstructor(() => dispatch(authActions.checkUser()));
  const isLoggedIn = useSelector((state) => state.user);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
