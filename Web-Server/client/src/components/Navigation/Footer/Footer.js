import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import makeStyles from './FooterStyles';

const Footer = (props) => {
  const classes = makeStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar color="default" className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        onClick={props.switch}
        indicatorColor="primary"
        textColor="primary"
        aria-label="full width tabs example"
        centered
      >
        <Tab label="Dark" />
        <Tab label="Light" />
      </Tabs>
    </AppBar>
  );
};

export default Footer;
