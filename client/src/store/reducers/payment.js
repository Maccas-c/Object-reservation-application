import * as actionTypes from '@actionTypes';

const initialState = {
  link: null,
};

const setLink = (state, action) => {
  return {
    ...state,
    link: action.link,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PAYU_LINK:
      return setLink(state, action);
    default:
      return state;
  }
};

export default reducer;
