import React from 'react';

import TileItem from '@components/Home/TileItem';

import { useTilesListService } from './service';

const TilesList = () => {
  const { classes, courts } = useTilesListService();

  return (
    <div {...{ className: classes.main }}>
      {courts && courts.map(court => <TileItem {...{ court }} />)}
    </div>
  );
};

export default TilesList;
