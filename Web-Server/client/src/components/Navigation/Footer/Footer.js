import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Avatar from '../../Avatar/Avatar';
import Logo from '../../../assets/logo/logo.png';
import makeStyles from './FooterStyles';

const Footer = (props) => {
  const classes = makeStyles();
  const [value, setValue] = React.useState(0);
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
        aria-label="full width tabs example"
        centered
      >
        <Tab label="Dark" onClick={() => props.switch(modeId.dark)} />
        <Tab label="Light" onClick={() => props.switch(modeId.light)} />
        <Avatar src={Logo} />
      </Tabs>
    </AppBar>
  );
};

export default Footer;
