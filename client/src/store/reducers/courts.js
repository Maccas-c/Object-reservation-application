import * as actionTypes from '../actions/actionTypes';

const initialState = {
	court: [],
	defaultCourt: 'A'
};

const getCourts = (state, action) => {
	return {
		...state,
		court: action.court
	};
};

const setCourt = (state, action) => {
	return { ...state, defaultCourt: action.defaultCourt };
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_COURTS:
			return getCourts(state, action);
		case actionTypes.SET_COURT:
			return setCourt(state, action);
		default:
			return state;
	}
};

export default reducer;
