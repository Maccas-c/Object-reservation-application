import React from 'react';
import { CreateButton, Datagrid, List, Responsive, TextField } from 'react-admin';

export const Court = ({ ...props }) => (
  <List {...props} actions={<CreateButton />} exporter>
    <Responsive
      medium={
        <Datagrid size={'medium'}>
          <TextField label={'Boisko'} source={'ids'} />
          <TextField label={'Rozmiar Boiska'} source={'description'} />
          <TextField label={'Strefa'} source={'name'} />
        </Datagrid>
      }
    />
  </List>
);
