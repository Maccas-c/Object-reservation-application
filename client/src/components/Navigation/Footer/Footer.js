import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { AppBar, Tabs, Tab } from '@material-ui/core';
import makeStyles from './FooterStyles';

import * as modeActions from '../../../store/actions/index';

const Footer = (props) => {
  const classes = makeStyles();
  let [value, setValue] = useState(0);
  if (value.toString() !== props.value) {
    value = props.value;
  }
  const modeId = { dark: '0', light: '1' };

  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const switchTheme = (modeId) => {
    dispatch(modeActions.switchModeTheme(props.switch, modeId));
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
        <Tab label="Dark" onClick={() => switchTheme(modeId.dark)} />
        <Tab label="Light" onClick={() => switchTheme(modeId.light)} />
      </Tabs>
    </AppBar>
  );
};

export default Footer;
