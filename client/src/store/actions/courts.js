import axios from '../../axios/axios-auth';
import * as action from './actionTypes';

export const fetchCourt = () => {
	return dispatch => {
		axios
			.get(`/courts`, { withCredentials: true })
			.then(response => {
				dispatch(fetchCourts(response.data));
			})
			.catch(() => {});
	};
};
export const fetchCourts = court => {
	return {
		type: action.GET_COURTS,
		court
	};
};

export const setCourt = defaultCourt => {
	return {
		type: action.SET_COURT,
		defaultCourt
	};
};
