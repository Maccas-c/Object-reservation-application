import * as actionTypes from '../actions/actionTypes';

const initialState = {
	link: null
};

const setLink = (state, action) => {
	return {
		...state,
		link: action.link
	};
};

const deleteReservation = state => {
	return {
		...state
	};
};

const setToken = (state, action) => {
	return {
		...state,
		token: action.token
	};
};
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_PAYU_LINK:
			return setLink(state, action);
		case actionTypes.DELETE_RESERVATION:
			return deleteReservation(state);
		case actionTypes.SET_TOKEN:
			return setToken(state, action);
		default:
			return state;
	}
};

export default reducer;
