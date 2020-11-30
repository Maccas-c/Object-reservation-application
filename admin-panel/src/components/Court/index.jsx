import React from 'react';
import { Datagrid, List, TextField } from 'react-admin';

export const Court = ({ ...props }) => (
  <List {...props} exporter>
    <Datagrid>
      <TextField source={'id'} />
      <TextField source={'courtid'} />
    </Datagrid>
  </List>
);
