import axios from '../../axios/axios-auth';

import * as actionTypes from './actionTypes';

import { MENU_ROUTES } from '../../constansts/routes/routes';

export const registerSuccess = () => {
	return {
		type: actionTypes.REGISTER_SUCCESS,
	};
};

export const registerFailure = () => {
	return {
		type: actionTypes.REGISTER_FAILURE,
	};
};

export const registerStart = (userInput, route) => {
	return (dispatch) => {
		axios
			.post(MENU_ROUTES.REGISTER, userInput, {
				withCredentials: true,
			})
			.then((response) => {
				dispatch(registerSuccess(response.data));
				route.push(MENU_ROUTES.LOGIN);
			})
			.catch((err) => {
				console.log(err.response);
			});
	};
};
