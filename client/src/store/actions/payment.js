import axios from '@axios/axios-auth';

import * as actionTypes from './actionTypes';

import { MENU_ROUTES } from '@routes';

export const getPayuToken = () => {
  return dispatch => {
    axios
      .post(MENU_ROUTES.GET_TOKEN, { withCredentials: true })
      .then(response => {
        dispatch(createPayment(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const createPayment = token => {
  return dispatch => {
    axios
      .post(
        MENU_ROUTES.CREATE_PAYMENT,
        { nameOfReservation: 'test', price: 15000 },
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
