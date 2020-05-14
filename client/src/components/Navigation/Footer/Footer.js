import React, { useState } from 'react';

import { AppBar, Tabs, Tab } from '@material-ui/core';
import makeStyles from './FooterStyles';

const Footer = (props) => {
  const classes = makeStyles();
  const [value, setValue] = useState(0);
  const modeId = { dark: '0', light: '1' };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar color="default" className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Dark" onClick={() => props.switch(modeId.dark)} />
        <Tab label="Light" onClick={() => props.switch(modeId.light)} />
      </Tabs>
    </AppBar>
  );
};

export default Footer;
