import React from 'react';
import { List } from 'react-admin';

export const Regulations = ({ ...props }) => (
  <List {...props} exporter={false}>
    <h1>Regulamin</h1>
  </List>
);
