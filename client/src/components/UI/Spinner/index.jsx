import React from 'react';

import classes from './styles.module.css';
import CircularProgress from "@material-ui/core/CircularProgress";

const Spinner = () => (
    <div {...{className: classes.loader}}>
        <CircularProgress/>
    </div>
);

export default Spinner;
