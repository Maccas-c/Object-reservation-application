import React from 'react';

import { Paper, Hidden } from '@material-ui/core';

import useStyles from './styles';

const Home = () => {
  const classes = useStyles();

  return (
    <>
      <Hidden lgUp>
        <div {...{ className: classes.main }}>
          <Paper {...{ elevation: 3 }} />
        </div>
      </Hidden>
      <Hidden xlDown>
        <div {...{ className: classes.root }}>
          <Paper {...{ elevation: 3 }} />
        </div>
      </Hidden>
      <Hidden smDown>
        <div {...{ className: classes.root }}>
          <Paper {...{ elevation: 3 }} />
        </div>
      </Hidden>
    </>
  );
};

export default Home;
