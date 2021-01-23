import axios from 'axios/axios-auth';
import { showMessage } from '../../app/store/fuse/messageSlice';
import { setUserData } from '../../app/auth/store/userSlice';
import * as action from './actionTypes';

export const updateUserProfileStart = user => {
	return dispatch => {
		axios
			.patch('/user/update', user, {
				withCredentials: true
			})
			.then(response => {
				dispatch(showMessage({ message: 'Pomyślnie zmieniono dane' }));
				dispatch(setUserData(response.data));
			})
			.catch(err => {
				dispatch(showMessage({ message: 'Niepomyślnie zmieniono dane' }));
			});
	};
};

export const fetchReservationUser = id => {
	return dispatch => {
		axios
			.get(`/reservations/${id}`)
			.then(response => {
				dispatch(fetchReservationUserList(response.data));
			})
			.catch(() => {});
	};
};
export const fetchReservationUserList = reservation => {
	return {
		type: action.GET_USER_RESERVATIONS,
		reservation
	};
};

export const updateUser = (id, history, route) => {
	return dispatch => {
		axios
			.get(`/getUser/${id}`)
			.then(response => {
				dispatch(setUserData(response.data));
				history.push(route);
			})
			.catch(() => {});
	};
};
