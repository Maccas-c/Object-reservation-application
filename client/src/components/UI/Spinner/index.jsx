import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

import classes from './styles.module.css';

const Spinner = () => (
  <div {...{ className: classes.loader }}>
    <CircularProgress thickness={1.5} size={150} />
  </div>
);

export default Spinner;
