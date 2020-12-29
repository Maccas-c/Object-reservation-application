import React from 'react';

import PriceList from './PriceList';
import UnitTileItem from './TilesList';

import { useHomeService } from './service';

const Home = () => {
  const { classes } = useHomeService();

  return (
    <div {...{ className: classes.main }}>
      <UnitTileItem />
      <PriceList />
    </div>
  );
};

export default Home;
