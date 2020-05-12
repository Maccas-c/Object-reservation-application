import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: false
};

const auth = (state, action) => {
  return {
    ...state,
    user: !state.user
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH:
      return auth(state, action);
    default:
      return state;
  }
};

export default reducer;
