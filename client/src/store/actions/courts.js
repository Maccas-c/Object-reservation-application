import axios from '../../axios/axios-auth';
import * as action from './actionTypes';

export const fetchCourt = () => {
	return dispatch => {
		axios
			.get(`/courts`)
			.then(response => {
				dispatch(fetchCourts(response.data));
				dispatch(setCourtSuccess(response.data));
			})
			.catch(() => {});
	};
};

export const getFreeTimes = (courtId, date) => {
	return dispatch => {
		axios
			.post(`/reservationsDate`, { courtId, date })
			.then(response => {
				dispatch(setFreeTiems(response.data));
			})
			.catch(() => {});
	};
};

export const setDialogCourt = (courts, calendarDay) => {
	let breakHelper = false;
	return dispatch => {
		courts.forEach(court => {
			court.date.forEach(day => {
				if (!breakHelper && day.value && day.nameOfDay === calendarDay) {
					dispatch(setDialogCurtSuccess(court.nameCourt));
					breakHelper = true;
				}
			});
		});
	};
};

export const setCourt = court => {
	return {
		type: action.SET_COURT_SELECT,
		court
	};
};

export const setFreeTiems = freeTimes => {
	return {
		type: action.SET_FREE_TIMES,
		freeTimes
	};
};

export const fetchCourts = court => {
	return {
		type: action.GET_COURTS,
		court
	};
};

export const setCourtSuccess = courts => {
	return {
		type: action.SET_COURT,
		courts
	};
};

export const setDialogCurtSuccess = sector => {
	return {
		type: action.SET_DIALOG_COURT,
		sector
	};
};
