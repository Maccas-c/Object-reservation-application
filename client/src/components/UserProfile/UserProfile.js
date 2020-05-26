import React, { Fragment, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import * as userActions from '../../store/actions/index';

const UserProfile = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(userActions.getUserProfileStart(user.id));
  }, [dispatch]);

  return <Fragment></Fragment>;
};

export default UserProfile;
