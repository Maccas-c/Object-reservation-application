import React from 'react';

import { List } from 'react-admin';

export const PriceList = ({ ...props }) => (
  <List {...props} exporter={false}>
    <h1>Cennik</h1>
  </List>
);
