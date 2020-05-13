import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: false,
  registrationStart: false,
  rememberPasswordStart: false
};

const auth = (state, action) => {
  return {
    ...state,
    user: !state.user
  };
};

const registration = (state, action) => {
  return {
    ...state,
    registrationStart: !state.registrationStart
  };
};

const rememberPassword = (state, action) => {
  return {
    ...state,
    rememberPasswordStart: !state.rememberPasswordStart
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH:
      return auth(state, action);
    case actionTypes.REGISTRATION:
      return registration(state, action);
    case actionTypes.REMEMBER_PASSWORD:
      return rememberPassword(state, action);
    default:
      return state;
  }
};

export default reducer;
