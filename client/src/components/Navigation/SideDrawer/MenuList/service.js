import { useHistory } from 'react-router-dom';

import useStyles from './styles';

export const useMenuListService = MENU_ITEMS => {
  const classes = useStyles();

  const history = useHistory();

  const menuList = Object.values(MENU_ITEMS);

  const getKeyByValue = (object, value) =>
    Object.keys(object).find(key => object[key] === value);

  return {
    classes,
    menuList,
    history,
    getKeyByValue,
  };
};
