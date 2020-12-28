import { useState } from 'react';

import useStyles from './styles';

export const useNavigationService = () => {
  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return {
    classes,
    handleDrawerToggle,
    mobileOpen,
  };
};
