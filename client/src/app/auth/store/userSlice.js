import { createSlice } from '@reduxjs/toolkit';
import 'firebase/auth';
import history from '@history';
import { setInitialSettings } from 'app/store/fuse/settingsSlice';
import authService from 'app/services/login';

export const setUserData = user => async (dispatch, getState) => {
	/*
        You can redirect the logged-in user to a specific route depending on his role
         */

	history.location.state = {
		redirectUrl: user.redirectUrl // for example 'apps/academy'
	};

	/*
    Set User Settings
     */

	dispatch(setUser(user));
};

export const logoutUser = isStudent => async (dispatch, getState) => {
	isStudent ? authService.logoutUSOS() : authService.logout();
	history.push({
		pathname: '/login'
	});

	dispatch(setInitialSettings());

	return dispatch(userLoggedOut());
};

const initialState = {
	role: [], // guest
	data: {
		displayName: '',
		photoURL: 'assets/images/avatars/profile.jpg',
		email: ''
	}
};

const userSlice = createSlice({
	name: 'auth/user',
	initialState,
	reducers: {
		setUser: (state, action) => action.payload,
		userLoggedOut: (state, action) => initialState
	},
	extraReducers: {}
});

export const { setUser, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;
