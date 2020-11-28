import React from 'react';

import { List } from 'react-admin';

export const Court = ({ ...props }) => (
  <List {...props} exporter={false}>
    <h1>Boisko</h1>
  </List>
);
