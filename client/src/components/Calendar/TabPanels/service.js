import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import * as calendarActions from '@actions/index';

import useStyles from './styles';

export const useTabPanelsService = (day, sectionData) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const changeCourtHandler = courtId => {
    dispatch(calendarActions.setCourtId(courtId));
  };

  useEffect(() => {
    let breakHelper = 0;
    sectionData.forEach(section => {
      if (day === 0 && !breakHelper) {
        if (section.date[6].value) {
          dispatch(calendarActions.setCourtId(section.nameCourt));
          breakHelper = 1;
        }
      }
      if (day !== 0 && !breakHelper) {
        if (section.date[day - 1].value) {
          dispatch(calendarActions.setCourtId(section.nameCourt));
          breakHelper = 1;
        }
      }
    });
  }, [dispatch, day, sectionData]);

  const isActive = section => {
    if (day === 0) {
      return section.date[6].value;
    } else {
      return section.date[day - 1].value;
    }
  };

  return { classes, changeCourtHandler, isActive };
};
