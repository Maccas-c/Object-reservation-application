import { createSlice } from '@reduxjs/toolkit';
import jwtService from 'app/services/login';

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
		registerSuccess: (state, action) => {
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
