import React from 'react';

import { Button, ButtonGroup } from '@material-ui/core';

import { useTabPanelsService } from './service';

const CourtChanger = ({ day, color, sectionData }) => {
  const {
    classes,
    changeCourtHandler,
    isWeekendDay,
    isWeekDay,
  } = useTabPanelsService(day);

  return (
    <div {...{ className: classes.root }}>
      <ButtonGroup>
        {sectionData.map(section => (
          <Button
            {...{
              color: color === 'a' ? 'secondary' : null,
              onClick: () => changeCourtHandler('a'),
              disabled: !isWeekDay(),
            }}
          >
            {section.nameCourt}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};
export default CourtChanger;
