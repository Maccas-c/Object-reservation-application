import React from 'react';

import { Datagrid, Filter, List, TextField, TextInput } from 'react-admin';

const PostFilter = (props) => (
  <Filter {...props}>
    <TextInput label={'Search'} source={'courtid'} alwaysOn />
  </Filter>
);

export const Reservations = ({ ...props }) => (
  <List {...props} filters={<PostFilter />}>
    <Datagrid>
      <TextField source={'id'} />
      <TextField label={'Data'} source={'start_time'} />
      <TextField label={'Godzina'} source={'hour'} />
      <TextField label={'Strefa boiska'} source={'courtid'} />
      <TextField label={'Imię'} source={'userid.name'} />
      <TextField label={'Nazwisko'} source={'userid.surname'} />
    </Datagrid>
  </List>
);
