import { createSlice } from '@reduxjs/toolkit';
import jwtService from 'app/services/login';
import axios from 'axios/axios-auth';
import { showMessage } from '../../store/fuse/messageSlice';

export const submitRegister = ({ name, surname, password, email, sex }) => async dispatch => {
	return jwtService
		.createUser({
			name,
			surname,
			password,
			email,
			sex
		})
		.then(() => {
			return dispatch(registerSuccess());
		})
		.catch(error => {
			return dispatch(registerError(error));
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
			.get(
				'/reset',
				{
					params: {
						resetPasswordToken: token
					}
				},
				{ withCredentials: true }
			)
			.then(response => {
				dispatch(showMessage({ message: response.data }));
			})
			.catch(error => {
				dispatch(showMessage({ message: error.response.data }));
			});
	};
};

export const updatePasswordStart = ({ email, password }, id) => {
	console.log(id);
	const data = { email, resetPasswordToken: id, password };
	return dispatch => {
		axios
			.patch('/updatePasswordViaEmail', data, { withCredentials: true })
			.then(() => {
				dispatch(showMessage({ message: 'Poprawnie zmieniono hasło !' }));
			})
			.catch(() => {
				dispatch(showMessage({ message: 'Niepoprawnie zmieniono hasło !' }));
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
