import * as actionTypes from '../actions/actionTypes';

const initialState = {
	court: [],
	defaultCourt: '',
	defaultCourtId: '',
	freeTimes: []
};

const getCourts = (state, action) => {
	return {
		...state,
		court: action.court
	};
};

const setCourt = (state, action) => {
	return { ...state, defaultCourt: action.courts[0].nameCourt, defaultCourtId: action.courts[0]._id };
};

const setDialogCourt = (state, action) => {
	return { ...state, defaultCourt: action.sector };
};

const setCourtSelect = (state, action) => {
	return { ...state, defaultCourt: action.court };
};

const setFreeTiems = (state, action) => {
	return { ...state, freeTimes: action.freeTimes };
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_COURTS:
			return getCourts(state, action);
		case actionTypes.SET_COURT:
			return setCourt(state, action);
		case actionTypes.SET_DIALOG_COURT:
			return setDialogCourt(state, action);
		case actionTypes.SET_COURT_SELECT:
			return setCourtSelect(state, action);
		case actionTypes.SET_FREE_TIMES:
			return setFreeTiems(state, action);
		default:
			return state;
	}
};

export default reducer;
