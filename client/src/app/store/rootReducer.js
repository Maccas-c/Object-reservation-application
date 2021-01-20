import { combineReducers } from '@reduxjs/toolkit';
import auth from 'app/auth/store';
import fuse from './fuse';
import i18n from './i18nSlice';
import userProfileReducer from '../../store/reducers/userProfile';
import courtReducer from '../../store/reducers/courts';
import paymentReducer from '../../store/reducers/payment';
import priceListReducer from '../../store/reducers/priceList';

const createReducer = asyncReducers =>
	combineReducers({
		auth,
		fuse,
		i18n,
		userProfileReducer,
		courtReducer,
		paymentReducer,
		priceListReducer,
		...asyncReducers
	});

export default createReducer;
