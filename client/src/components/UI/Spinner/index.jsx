import React from 'react';

import classes from './styles.module.css';

const Spinner = () => (
  <div {...{ className: classes.loader }}>
    <i {...{ className: 'fas fa-spinner fa-spin' }} />
  </div>
);

export default Spinner;
