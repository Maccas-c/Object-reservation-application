import { createSlice } from '@reduxjs/toolkit';
import loginService from 'app/services/login';
import axios from 'axios/axios-auth';
import { showMessage } from 'app/store/fuse/messageSlice';

export const submitRegister = ({ name, surname, password, email, sex }) => async dispatch => {
	return loginService
		.createUser({
			name,
			surname,
			password,
			email,
			sex
		})
		.then(response => {
			dispatch(showMessage({ message: response }));
			return dispatch(registerSuccess());
		})
		.catch(error => {
			dispatch(showMessage({ message: error }));
			return dispatch(registerError());
		});
};
export const rememberPassword = ({ email }) => async dispatch => {
	axios
		.post('/forgotPassword', { email }, { withCredentials: true })
		.then(response => {
			dispatch(showMessage({ message: response.data }));
		})
		.catch(error => {
			dispatch(showMessage({ message: error.response.data }));
		});
};

export const resetPasswordStart = token => {
	return dispatch => {
		axios
			.get('/reset', {
				params: {
					resetPasswordToken: token
				}
			})
			.then(response => {
				dispatch(showMessage({ message: response.data.message }));
			})
			.catch(error => {
				dispatch(showMessage({ message: error.response.data }));
			});
	};
};

export const updatePasswordStart = ({ email, password }, id) => {
	const data = { email, resetPasswordToken: id, password };
	return dispatch => {
		axios
			.patch('/updatePasswordViaEmail', data, { withCredentials: true })
			.then(response => {
				if (response.data) {
					dispatch(showMessage({ message: response.data.message }));
				}
			})
			.catch(error => {
				if (error.response.data) {
					dispatch(showMessage({ message: error.response.data }));
				}
			});
	};
};
const initialState = {
	success: false,
	error: {
		username: null,
		password: null
	}
};

const registerSlice = createSlice({
	name: 'auth/register',
	initialState,
	reducers: {
		registerSuccess: state => {
			state.success = true;
		},
		registerError: (state, action) => {
			state.success = false;
			state.error = action.payload;
		}
	},
	extraReducers: {}
});

export const { registerSuccess, registerError } = registerSlice.actions;

export default registerSlice.reducer;
