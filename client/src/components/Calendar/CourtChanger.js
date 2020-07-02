import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, ButtonGroup } from '@material-ui/core';

import * as calendarActions from '../../store/actions/index';

import useStyles from './CourtChangerStyles';

const CourtChanger = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const changeCourtHandler = (courtId) => {
    dispatch(calendarActions.changeCurrentCourt(courtId));
  };

  return (
    <div className={classes.root}>
      <ButtonGroup>
        <Button
          color={props.color === 'a' ? 'secondary' : null}
          onClick={() => changeCourtHandler('a')}
        >
          Sektor A
        </Button>
        <Button
          color={props.color === 'b' ? 'secondary' : null}
          onClick={() => changeCourtHandler('b')}
        >
          Sektor B
        </Button>
        <Button
          color={props.color === 'c' ? 'secondary' : null}
          onClick={() => changeCourtHandler('c')}
        >
          Sektor C
        </Button>
        <Button
          color={props.color === 'd' ? 'secondary' : null}
          onClick={() => changeCourtHandler('d')}
        >
          Całe boisko
        </Button>
      </ButtonGroup>
    </div>
  );
};
export default CourtChanger;
