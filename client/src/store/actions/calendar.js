import axios from '../../axios/axios-auth';
import * as action from './actionTypes';
import { showMessage } from 'app/store/fuse/messageSlice';
import { getEvents } from '../../app/main/pages/calendar/store/eventsSlice';

export const addReservation = (start, courtId, userId, date) => {
	return dispatch => {
		const hours = parseInt(start.substring(0, 2));
		const minutes = parseInt(start.substring(3, 5));
		const time = new Date(date).setHours(hours, minutes, 0);
		axios
			.post(`/reservation/create`, {
				start: new Date(time),
				courtId,
				userId,
				duration: '90'
			})
			.then(response => {
				dispatch(showMessage({ message: response.data[0].msg }));
				dispatch(getEvents(userId));
			})
			.catch(err => {
				dispatch(showMessage({ message: err.data[0].msg }));
			});
	};
};

export const setDialogCurtSuccess = sector => {
	return {
		type: action.SET_DIALOG_COURT,
		sector
	};
};
