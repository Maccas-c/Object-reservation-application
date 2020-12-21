import React from 'react';

import { Button, ButtonGroup } from '@material-ui/core';

import { useTabPanelsService } from './service';

const CourtChanger = ({ day, color }) => {
  const {
    classes,
    changeCourtHandler,
    isWeekendDay,
    isWeekDay,
  } = useTabPanelsService(day);

  return (
    <div {...{ className: classes.root }}>
      <ButtonGroup>
        <Button
          {...{
            color: color === 'a' ? 'secondary' : null,
            onClick: () => changeCourtHandler('a'),
            disabled: !isWeekDay(),
          }}
        >
          Sektor A
        </Button>
        <Button
          {...{
            color: color === 'b' ? 'secondary' : null,
            onClick: () => changeCourtHandler('b'),
            disabled: !isWeekDay(),
          }}
        >
          Sektor B
        </Button>
        <Button
          {...{
            color: color === 'c' ? 'secondary' : null,
            onClick: () => changeCourtHandler('c'),
            disabled: !isWeekDay(),
          }}
        >
          Sektor C
        </Button>
        <Button
          {...{
            color: color === 'd' ? 'secondary' : null,
            onClick: () => changeCourtHandler('d'),
            disabled: !isWeekendDay(),
          }}
        >
          Całe boisko
        </Button>
      </ButtonGroup>
    </div>
  );
};
export default CourtChanger;
