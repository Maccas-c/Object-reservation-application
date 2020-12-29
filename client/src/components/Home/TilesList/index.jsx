import React from 'react';

import Grid from '@material-ui/core/Grid';

import TileItem from '@components/Home/TileItem';

export default function SimpleCard() {
  return (
    <Grid container>
      <TileItem />
      <TileItem />
      <TileItem />
      <TileItem />
    </Grid>
  );
}
