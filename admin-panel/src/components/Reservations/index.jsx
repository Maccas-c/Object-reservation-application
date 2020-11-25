import React from 'react';

import { Datagrid, List, Responsive, TextField } from 'react-admin';

export const Reservations = ({ name }) => (
  <List {...{ name }}>
    <Responsive
      medium={
        <Datagrid>
          <TextField source={'id'} />
          <TextField label={'Data'} source={'start_time'} />
          <TextField label={'Godzina'} source={'hour'} />
          <TextField label={'Strefa boiska'} source={'courtid'} />
          <TextField label={'Imię'} source={'userid.name'} />
          <TextField label={'Nazwisko'} source={'userid.name'} />
        </Datagrid>
      }
    />
  </List>
);
