import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 1,
    width: 'auto',
    height: '50px',
    position: 'sticky',
    marginTop: 'calc(100vh - 50px)',
    bottom: 0
  }
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

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
        <Tab label="Dark" />
        <Tab label="Light" />
      </Tabs>
    </AppBar>
  );
}
