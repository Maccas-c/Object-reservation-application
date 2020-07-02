import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { AppBar, Tabs, Tab } from '@material-ui/core';

import * as modeActions from '../../../store/actions/index';

import makeStyles from './FooterStyles';

const Footer = (props) => {
  const classes = makeStyles();
  let [value, setValue] = useState(0);
  if (value.toString() !== props.value) {
    value = props.value;
  }
  const modeId = { light: '0', dark: '1' };

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
        <Tab label="Light" onClick={() => switchTheme(modeId.light)} />
        <Tab label="Dark" onClick={() => switchTheme(modeId.dark)} />
      </Tabs>
    </AppBar>
  );
};

export default Footer;
