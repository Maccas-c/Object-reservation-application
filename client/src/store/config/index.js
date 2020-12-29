import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import auth from '@reducers/auth';
import register from '@reducers/register';
import utils from '@reducers/utils';
import usersList from '@reducers/usersList';
import userProfile from '@reducers/userProfile';
import recoveryPassword from '@reducers/recoveryPassword';
import calendar from '@reducers/calendar';
import priceList from '@reducers/prices';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: auth,
  register: register,
  utils: utils,
  usersList: usersList,
  userProfile: userProfile,
  recoveryPassword: recoveryPassword,
  calendar: calendar,
  prices: priceList,
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);
