import * as actionTypes from '@actionTypes';

const initialState = {
  modeId: '0',
  isLoading: false,
};

const startLoadingUser = (state, action) => {
  return {
    ...state,
    isLoading: true,
  };
};

const endLoadingUser = (state, action) => {
  return {
    ...state,
    isLoading: false,
  };
};

const switchModeTheme = (state, action) => {
  return {
    ...state,
    modeId: action.modeId,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_LOADING_USER:
      return startLoadingUser(state, action);
    case actionTypes.END_LOADING_USER:
      return endLoadingUser(state, action);
    case actionTypes.SWITCH_MODE_THEME:
      return switchModeTheme(state, action);
    default:
      return state;
  }
};

export default reducer;
