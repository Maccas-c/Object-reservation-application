import * as actionTypes from '../actions/actionTypes';

const initialState = {
	user: null,
	reservation: []
};

const getUserProfile = (state, action) => {
	return {
		...state,
		user: action.user
	};
};

const getUserReservations = (state, action) => {
	return {
		...state,
		reservation: action.reservation
	};
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_USER_PROFILE:
			return getUserProfile(state, action);
		case actionTypes.GET_USER_RESERVATIONS:
			return getUserReservations(state, action);
		default:
			return state;
	}
};

export default reducer;
