import * as actionTypes from '../actions/actionTypes';

const initialState = {
	priceList: []
};

const getPriceList = (state, action) => {
	return {
		...state,
		priceList: action.priceList
	};
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_PRICE_LIST:
			return getPriceList(state, action);
		default:
			return state;
	}
};

export default reducer;
