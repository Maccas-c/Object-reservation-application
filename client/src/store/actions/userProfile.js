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
			.catch(() => {
				dispatch(showMessage({ message: 'Błąd autoryzacji, zostałeś wylogowany.' }));
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
