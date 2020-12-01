import React from 'react';
import { CreateButton, Datagrid, List, Responsive, TextField } from 'react-admin';

export const Court = ({ ...props }) => (
  <List {...props} actions={<CreateButton />} exporter>
    <Responsive
      medium={
        <Datagrid>
          <TextField source={'_id'} />
          <TextField source={'id'} />
          <TextField source={'description'} />
          <TextField source={'name'} />
        </Datagrid>
      }
    />
  </List>
);
