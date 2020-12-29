import axios from '@axios/axios-auth';

import * as actionTypes from './actionTypes';

import { MENU_ROUTES } from '@routes';

export const fetchPriceListCourtPrize = () => {
  return dispatch => {
    axios
      .get(MENU_ROUTES.PRIZE_LIST, { withCredentials: true })
      .then(response => {
        dispatch(fetchPriceListCourt(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const fetchPriceListCourt = priceList => {
  return {
    type: actionTypes.FETCH_PRICE_LIST_COURT,
    priceList: priceList,
  };
};
