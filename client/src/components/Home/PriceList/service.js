import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import * as appActions from '@actions';

import useStyles from './styles';

export const usePriceListService = () => {
  const classes = useStyles();

  const [isExpanded, setIsExpaned] = useState(false);

  const dispatch = useDispatch();
  const priceList = useSelector(({ prices }) => prices.priceList);

  useEffect(() => {
    dispatch(appActions.fetchPriceListCourtPrize());
  }, [dispatch]);

  const clickExpandHandler = () => setIsExpaned(!isExpanded);

  return {
    classes,
    priceList,
    isExpanded,
    clickExpandHandler,
  };
};
