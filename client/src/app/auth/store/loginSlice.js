import { createSlice } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import LoginService from 'app/services/login';
import { setUserData } from './userSlice';

export const submitLogin = ({ email, password }) => async dispatch => {
	return LoginService.signInWithEmailAndPassword(email, password)
		.then(user => {
			dispatch(setUserData(user));
			dispatch(showMessage({ message: 'Zalogowano' }));
			return dispatch(loginSuccess());
		})
		.catch(err => {
			console.log(err);
			return dispatch(loginError(err));
		});
};

export const loginUSOS = () => LoginService.signInWithUSOS();

const initialState = {
	success: false,
	error: {
		username: null,
		password: null
	}
};

const loginSlice = createSlice({
	name: 'auth/login',
	initialState,
	reducers: {
		loginSuccess: (state, action) => {
			state.success = true;
		},
		loginError: (state, action) => {
			state.success = false;
			state.error = action.payload;
		}
	},
	extraReducers: {}
});

export const { loginSuccess, loginError } = loginSlice.actions;

export default loginSlice.reducer;
