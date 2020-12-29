import { useDispatch } from 'react-redux';

import * as calendarActions from '@actions/index';

import useStyles from './styles';

export const useTabPanelsService = day => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const changeCourtHandler = courtId => {
    dispatch(calendarActions.changeCurrentCourt(courtId));
  };

  const isWeekendDay = () => {
    if (day === 0 || day === 6) {
      dispatch(calendarActions.setDayWeekend());
      return true;
    }
  };
  const isWeekDay = () => {
    if (day >= 1 && day <= 5) {
      return true;
    }
  };

  return { classes, changeCourtHandler, isWeekendDay, isWeekDay };
};
