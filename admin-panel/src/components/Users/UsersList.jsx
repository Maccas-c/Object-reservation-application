import React from 'react';

import { Datagrid, List, Responsive, ShowButton, SimpleList, TextField } from 'react-admin';

export const UsersList = ({ icon, name }) => (
  <List {...{ icon, name }}>
    <Responsive
      small={<SimpleList linkType={'show'} primaryText={(record) => record.name} />}
      medium={
        <Datagrid>
          <TextField label={'Imię'} source={'name'} />
          <TextField label={'Nazwisko'} source={'surname'} />
          <TextField source={'email'} />
          <ShowButton />
        </Datagrid>
      }
    />
  </List>
);
