import axios from '@axios/axios-auth';

import * as actionTypes from './actionTypes';

import { MENU_ROUTES } from '@routes';

export const getPriceList = () => {
  return dispatch => {
    axios
      .get(MENU_ROUTES.PRIZE_LIST, { withCredentials: true })
      .then(response => {
        dispatch(setPriceList(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const setPriceList = priceList => {
  return {
    type: actionTypes.GET_PRICE_LIST,
    priceList: priceList,
  };
};

export const getCourts = () => {
  return dispatch => {
    axios
      .get(MENU_ROUTES.COURTS, { withCredentials: true })
      .then(response => {
        dispatch(setCourts(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const setCourts = courts => {
  return {
    type: actionTypes.GET_COURTS,
    courts: courts,
  };
};
