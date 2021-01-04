import axios from '@axios/axios-auth';

import * as actionTypes from './actionTypes';

import { MENU_ROUTES } from '@routes';

export const getPayuToken = (price) => {
  return dispatch => {
    axios
      .post(MENU_ROUTES.GET_TOKEN, { withCredentials: true })
      .then(response => {
        dispatch(createPayment(response.data, price));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const createPayment = (token, price) => {
  return dispatch => {
    axios
      .post(
        MENU_ROUTES.CREATE_PAYMENT,
        { nameOfReservation: 'test', price: price * 100 },
        {
          headers: {
            bearer: token,
          },
        },
        { withCredentials: true },
      )
      .then(response => {
        dispatch(setRedirectLink(response.data.redirectUri));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const setRedirectLink = link => {
  return {
    type: actionTypes.SET_PAYU_LINK,
    link: link,
  };
};
