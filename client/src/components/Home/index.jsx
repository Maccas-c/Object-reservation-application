import React from 'react';

import Container from '@material-ui/core/Container';

import PriceList from './PriceList';
import TilesList from './TilesList';

import { useHomeService } from './service';

const Home = () => {
  const { classes } = useHomeService();

  return (
    <Container component="main" maxWidth="lg" {...{ className: classes.main }}>
      <TilesList />
      <PriceList />
    </Container>
  );
};

export default Home;
