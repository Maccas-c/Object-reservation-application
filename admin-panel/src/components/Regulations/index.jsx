import React from 'react';
import { List } from 'react-admin';

export const Regulations = ({ name }) => (
  <List {...{ name }} exporter={false}>
    <h1>Regulamin</h1>
  </List>
);
