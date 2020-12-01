import React from 'react';
import { CreateButton, Datagrid, EditButton, List, TextField } from 'react-admin';

export const Court = ({ ...props }) => (
  <List {...props} actions={<CreateButton />} exporter>
    <Datagrid>
      <TextField source={'id'} />
      <TextField source={'ids'} />
      <TextField source={'name'} />
      <EditButton />
    </Datagrid>
  </List>
);
