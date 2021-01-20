import axios from '../../axios/axios-auth';
import * as action from './actionTypes';
import { setUserData } from '../../app/auth/store/userSlice';

export const getPayuToken = (name, reservation, price) => {
	return dispatch => {
		axios
			.post('/getToken', { withCredentials: true })
			.then(response => {
				dispatch(createPayment(response.data, name, reservation, price));
			})
			.catch(error => {
				console.log(error);
			});
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
				dispatch(setRedirectLink(response.data.redirectUri));
			})
			.catch(error => {
				console.log(error);
			});
	};
};

export const deleteReservation = id => {
	return dispatch => {
		axios
			.delete(`/reservationsDelete/${id}`)
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
