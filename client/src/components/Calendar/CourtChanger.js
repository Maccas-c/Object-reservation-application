import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, ButtonGroup } from '@material-ui/core';
import useStyles from './CourtChangerStyles';

import * as calendarActions from '../../store/actions/index';

const CourtChanger = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const changeCourtHandler = (courtId) => {
    dispatch(calendarActions.changeCurrentCourt(courtId));
  };

  return (
    <div className={classes.root}>
      <ButtonGroup aria-label="outlined primary button group">
        <Button onClick={() => changeCourtHandler('a')}>Sektor A</Button>
        <Button onClick={() => changeCourtHandler('b')}>Sektor B</Button>
        <Button onClick={() => changeCourtHandler('c')}>Sektor C</Button>
        <Button onClick={() => changeCourtHandler('d')}>Całe boisko</Button>
      </ButtonGroup>
    </div>
  );
};
export default CourtChanger;
