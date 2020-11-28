import React from 'react';

import { Datagrid, List, TextField } from 'react-admin';

export const Reservations = ({ ...props }) => (
  <List {...props}>
    <Datagrid>
      <TextField source={'id'} />
      <TextField label={'Data'} source={'start_time'} />
      <TextField label={'Godzina'} source={'hour'} />
      <TextField label={'Strefa boiska'} source={'courtid'} />
      <TextField label={'Imię'} source={'userid.name'} />
      <TextField label={'Nazwisko'} source={'userid.name'} />
    </Datagrid>
  </List>
);
