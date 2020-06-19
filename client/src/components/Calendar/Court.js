import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import useStyles from './CourtStyles';

const Court = () => {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Paper className={classes.root}>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor='primary'
                textColor='primary'
                centered>
                <Tab label='Strefa A' />
                <Tab label='Strefa B' />
                <Tab label='Strefa C' />
                <Tab label='Strefa D' />
            </Tabs>
        </Paper>
    );
};
export default Court;
