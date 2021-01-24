import { showMessage } from 'app/store/fuse/messageSlice';
import axios from '../../axios/axios-auth';
import * as action from './actionTypes';
import { setUserData } from '../../app/auth/store/userSlice';

export const getPayuToken = () => {
	return dispatch => {
		axios
			.post('/getToken', { withCredentials: true })
			.then(response => {
				dispatch(setToken(response.data));
			})
			.catch(error => {
				console.log(error);
			});
	};
};

export const setToken = token => {
	return {
		type: action.SET_TOKEN,
		token
	};
};

export const createPayment = (token, name, reservation, price) => {
	return dispatch => {
		axios
			.post(
				'/createPayment',
				{
					nameOfReservation: name,
					price: price * 100,
					reservations: reservation
				},
				{
					headers: {
						bearer: token
					}
				},
				{ withCredentials: true }
			)
			.then(response => {
				window.location.href = response.data.redirectUri;
			})
			.catch(error => {
				dispatch(showMessage(error.response.data));
			});
	};
};

export const deleteReservation = (id, price, sumPrice) => {
	return dispatch => {
		axios
			.post(`/reservationsDelete/${id}`, { price, sumPrice })
			.then(response => {
				dispatch(setUserData(response.data));
			})
			.catch(error => {
				console.log('error');
			});
	};
};

export const setRedirectLink = link => {
	return {
		type: action.SET_PAYU_LINK,
		link
	};
};
