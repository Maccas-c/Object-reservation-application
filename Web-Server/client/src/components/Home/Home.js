import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { MENU_ROUTES } from '../../constansts/routes/routes';

const Home = () => {
  const isLoggedIn = useSelector((state) => state.user);

  let userLoggedIn = null;

  if (!isLoggedIn) {
    userLoggedIn = <Redirect to={MENU_ROUTES.LOGIN}></Redirect>;
  }

  return (
    <Fragment>
      {userLoggedIn}
      <div>Home</div>
    </Fragment>
  );
};

export default Home;
