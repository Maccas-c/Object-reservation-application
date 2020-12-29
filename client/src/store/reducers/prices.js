import * as actionTypes from '@actionTypes';

const initialState = {
  priceList: null,
};

const fetchPriceListList = (state, action) => {
  return {
    ...state,
    priceList: action.priceList,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRICE_LIST_COURT:
      return fetchPriceListList(state, action);
    default:
      return state;
  }
};

export default reducer;
