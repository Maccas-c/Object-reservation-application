import React, { Fragment } from 'react';
import Paper from '@material-ui/core/Paper';
import useStyles from './HomeStyles';
import Hidden from '@material-ui/core/Hidden';
const Home = () => {
    const classes = useStyles();

    return (
        <Fragment>
            <Hidden lgUp>
                <div className={classes.main}>
                    <Paper elevation={3}></Paper>
                </div>
            </Hidden>
            <Hidden xlDown>
                <div className={classes.root}>
                    <Paper elevation={3}></Paper>
                </div>
            </Hidden>
            <Hidden smDown>
                <div className={classes.root}>
                    <Paper elevation={3}></Paper>
                </div>
            </Hidden>
        </Fragment>
    );
};

export default Home;
