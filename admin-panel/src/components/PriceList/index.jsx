import React from 'react';

import { List } from 'react-admin';

export const PriceList = ({ icon, name }) => (
  <List {...{ icon, name }} exporter={false}>
    <h1>Cennik</h1>
  </List>
);
