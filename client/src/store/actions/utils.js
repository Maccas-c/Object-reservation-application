import * as actionTypes from './actionTypes';

export const switchModeTheme = (switchFun, modeId) => {
  switchFun(modeId);
  localStorage.setItem('mode', modeId);
  return {
    type: actionTypes.SWITCH_MODE_THEME,
    modeId: modeId
  };
};
