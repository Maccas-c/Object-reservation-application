import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { MENU_ROUTES } from '../../constansts/routes/routes';

const NotFound = () => {
  const isLoggedIn = useSelector((state) => state.user);

  let userLoggedIn = null;

  if (!isLoggedIn) {
    userLoggedIn = <Redirect to={MENU_ROUTES.LOGIN}></Redirect>;
  }

  return (
    <Fragment>
      {userLoggedIn}
      <div>Not Found</div>
    </Fragment>
  );
};

export default NotFound;
