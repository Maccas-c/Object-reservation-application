import React from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

const FreeRoute = ({ component: Component, ...rest }) => {
  const user = { ...rest };
  console.log(user);
  return (
    <Route
      {...rest}
      render={(props) =>
        !rest.user ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  );
};

export default FreeRoute;
