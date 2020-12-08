import React from "react";
import { useDispatch } from "react-redux";
import { Button, ButtonGroup } from "@material-ui/core";

import * as calendarActions from "../../store/actions/index";

import useStyles from "./CourtChangerStyles";

const CourtChanger = ({ day, color }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const changeCourtHandler = (courtId) => {
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
  return (
    <div className={classes.root}>
      <ButtonGroup>
        <Button
          color={color === "a" ? "secondary" : null}
          onClick={() => changeCourtHandler("a")}
          disabled={!isWeekDay()}
        >
          Sektor A
        </Button>
        <Button
          color={color === "b" ? "secondary" : null}
          onClick={() => changeCourtHandler("b")}
          disabled={!isWeekDay()}
        >
          Sektor B
        </Button>
        <Button
          color={color === "c" ? "secondary" : null}
          onClick={() => changeCourtHandler("c")}
          disabled={!isWeekDay()}
        >
          Sektor C
        </Button>
        <Button
          color={color === "d" ? "secondary" : null}
          onClick={() => changeCourtHandler("d")}
          disabled={!isWeekendDay()}
        >
          Całe boisko
        </Button>
      </ButtonGroup>
    </div>
  );
};
export default CourtChanger;
