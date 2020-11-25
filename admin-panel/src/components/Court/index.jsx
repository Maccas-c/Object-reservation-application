import React from 'react';

import { List } from 'react-admin';

export const Court = ({ icon, name }) => (
  <List {...{ icon, name }} exporter={false}>
    <h1>Boisko</h1>
  </List>
);
