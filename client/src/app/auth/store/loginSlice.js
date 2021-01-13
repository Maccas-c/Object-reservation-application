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
		.catch(() => {
			dispatch(showMessage({ message: 'Niepoprawny e-mail lub hasło' }));
			return dispatch(loginError());
		});
};

export const getUserProfile = id => async dispatch => {
	return LoginService.getUser(id)
		.then(user => {
			dispatch(setUserData(user));
		})
		.catch(err => {
			console.log(err);
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
		loginSuccess: state => {
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
