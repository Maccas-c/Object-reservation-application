import { useHistory, useLocation } from 'react-router-dom';

import AvatarMale from '@assets/avatar/male.png';
import AvatarFemale from '@assets/avatar/female.png';
import { MENU_ROUTES } from '@constants/routes';

import useStyles from './styles';

export const useSideDrawerService = () => {
  const classes = useStyles();

  const history = useHistory();
  const location = useLocation();

  const userRoute = () => history.push(MENU_ROUTES.USER_PROFILE);

  const getAvatar = user => {
    let avatar;
    if (user && user.sex === 'male') {
      avatar = AvatarMale;
    } else {
      avatar = AvatarFemale;
    }

    return avatar;
  };

  let sideDrawer = null;

  return {
    classes,
    sideDrawer,
    location,
    userRoute,
    getAvatar,
  };
};
