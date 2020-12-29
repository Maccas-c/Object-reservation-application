import React from 'react';

import { ListItem, ListItemText } from '@material-ui/core';

const MenuItem = ({ link, path, selected, key, item }) => (
  <ListItem button {...{ component: link, to: path, selected, key }}>
    <ListItemText {...{ primary: item }} />
  </ListItem>
);

export default MenuItem;
