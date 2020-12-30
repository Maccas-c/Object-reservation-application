import React from 'react';

import { Button, ButtonGroup } from '@material-ui/core';

import { useTabPanelsService } from './service';

const CourtChanger = ({ day, color, sectionData }) => {
  const { classes, changeCourtHandler, isActive } = useTabPanelsService(
    day,
    sectionData,
  );

  return (
    <div {...{ className: classes.root }}>
      <ButtonGroup>
        {sectionData.map(section => (
          <Button
            {...{
              color: color === section.nameCourt ? 'secondary' : null,
              onClick: () => changeCourtHandler(section.nameCourt),
              disabled: !isActive(section),
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
