import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import * as appActions from '@actions';

import useStyles from './styles';

export const useTilesListService = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const courts = useSelector(({ home }) => home.courts);

  useEffect(() => {
    dispatch(appActions.getCourts());
  }, [dispatch]);

  return {
    classes,
    courts,
  };
};
