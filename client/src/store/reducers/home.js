import * as actionTypes from '@actionTypes';

const initialState = {
  priceList: null,
  courts: null,
};

const setPriceList = (state, action) => {
  return {
    ...state,
    priceList: action.priceList,
  };
};

const setCourts = (state, action) => {
  return {
    ...state,
    courts: action.courts,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PRICE_LIST:
      return setPriceList(state, action);
    case actionTypes.GET_COURTS:
      return setCourts(state, action);
    default:
      return state;
  }
};

export default reducer;
