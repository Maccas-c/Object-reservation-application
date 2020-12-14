import { useSelector, useDispatch } from 'react-redux';

import { createMuiTheme } from '@material-ui/core/styles';
import { useDarkMode } from './styles';

import * as authActions from '../../store/actions/index';
import { useConstructor } from '../../utils/customHooks';

export const useLayoutService = () => {
  const [updatedTheme, toggleMode] = useDarkMode();
  const theme = createMuiTheme(updatedTheme);
  const dispatch = useDispatch();

  const user = useSelector(({ auth }) => auth.user);
  let value = parseInt(useSelector(({ utils }) => utils.modeId));

  useConstructor(() => {
    dispatch(authActions.checkUser());
    const localStorageModeId = localStorage.getItem('mode');
    if (localStorageModeId !== null) {
      dispatch(authActions.switchModeTheme(toggleMode, localStorageModeId));
      value = parseInt(localStorageModeId);
    }
  });

  return { toggleMode, theme, user, value };
};
