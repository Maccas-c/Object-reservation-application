import React from 'react';

import TileItem from '@components/Home/TileItem';

import { useTilesListService } from './service';

const TilesList = () => {
  const { classes } = useTilesListService();

  return (
    <div {...{ className: classes.main }}>
      <TileItem />
      <TileItem />
      <TileItem />
      <TileItem />
    </div>
  );
};

export default TilesList;
