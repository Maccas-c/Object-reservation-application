import React, { Fragment } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Image from '../../assets/court/Boisko.png';
const Home = () => {
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            alignItems: 'center',
            marginLeft: '20px',
            margin: theme.spacing(1),
            width: theme.spacing(144),
            height: theme.spacing(80),
            backgroundImage: `url(${Image})`,
        },
    }));
    const classes = useStyles();

    return (
        <Fragment>
            <div className={classes.root}>
                <Paper elevation={3}></Paper>
            </div>
        </Fragment>
    );
};

export default Home;
