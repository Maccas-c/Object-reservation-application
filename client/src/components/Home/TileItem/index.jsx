import React from 'react';

import { Card, CardContent, Typography } from '@material-ui/core';

import { useTileItemService } from './service';

const TileItem = () => {
  const classes = useTileItemService();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Boisko UAM
        </Typography>
        <Typography variant="h5" component="h2">
          Sektor A
        </Typography>

        <Typography variant="body2" component="p">
          Dostępność: poniedziałek, wtorek, środa, czwartek piątek
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TileItem;
