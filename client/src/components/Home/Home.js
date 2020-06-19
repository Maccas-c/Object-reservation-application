import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 300,
        width: 300,
    },
    control: {
        padding: theme.spacing(1),
    },
}));

const Home = () => {
    const [spacing, setSpacing] = React.useState(2);
    const classes = useStyles();

    const handleChange = event => {
        setSpacing(Number(event.target.value));
    };

    const tab = [
        { id: '1', name: 'Strefa A' },
        { id: '2', name: 'Strefa B' },
        { id: '3', name: 'Strefa C' },
    ];
    return (
        <Grid container className={classes.root} spacing={0}>
            <Grid item xs={12}>
                <Grid container justify='center' spacing={spacing}>
                    {tab.map(value => (
                        <Grid key={value.id} item>
                            <Paper className={classes.paper}>
                                <Typography alignCenter>
                                    <h1>{value.name}</h1>
                                </Typography>
                            </Paper>
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    <h1>Strefa D - Całe boisko</h1>
                                </Paper>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};
export default Home;
