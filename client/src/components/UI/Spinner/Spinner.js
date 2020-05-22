import React from 'react';

import classes from './Spinner.module.css';

const Spinner = () => {
  return (
    <div className={classes.loader}>
      <i className="fas fa-spinner fa-spin" />
    </div>
  );
};

export default Spinner;
