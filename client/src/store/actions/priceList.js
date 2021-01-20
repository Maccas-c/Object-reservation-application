import axios from '../../axios/axios-auth';
import * as action from './actionTypes';

export const fetchPriceList = () => {
	return dispatch => {
		axios
			.get(`/priceLists`)
			.then(response => {
				dispatch(setCourt(response.data));
			})
			.catch(() => {
				console.log('error');
			});
	};
};

export const setCourt = priceList => {
	return {
		type: action.GET_PRICE_LIST,
		priceList
	};
};
