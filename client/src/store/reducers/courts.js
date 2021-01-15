import * as actionTypes from '../actions/actionTypes';

const initialState = {
	court: [],
	defaultCourt: ''
};

const getCourts = (state, action) => {
	return {
		...state,
		court: action.court
	};
};

const setCourt = (state, action) => {
	return { ...state, defaultCourt: action.courts[0].nameCourt };
};

const setDialogCourt = (state, action) => {
	return { ...state, defaultCourt: action.sector };
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_COURTS:
			return getCourts(state, action);
		case actionTypes.SET_COURT:
			return setCourt(state, action);
		case actionTypes.SET_DIALOG_COURT:
			return setDialogCourt(state, action);
		default:
			return state;
	}
};

export default reducer;
