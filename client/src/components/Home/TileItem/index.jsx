import React from 'react';

import { Card, CardContent, Typography } from '@material-ui/core';

import { useTileItemService } from './service';

import { getContent, getActiveDays } from './utils';

const TileItem = ({ court }) => {
  const classes = useTileItemService();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {getContent(court.ids)}
        </Typography>
        <Typography variant="h5" component="h2">
          {getContent(court.nameCourt)}
        </Typography>
        <Typography color="textSecondary">
          {getContent(court.description)}
        </Typography>
        <Typography variant="body2" component="p">
          {getActiveDays(court.date)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TileItem;
