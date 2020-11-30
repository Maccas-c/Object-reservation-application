import React from 'react';

import { Datagrid, Filter, List, TextField, TextInput } from 'react-admin';

const PostFilter = (reservations) => (
  <Filter {...reservations}>
    <TextInput label={'Search'} source={'courtid'} alwaysOn />
    <TextInput label={'Data'} source={'start_time'} defaultValue={'2020-12-24'} />
    <TextInput label={'Godzina'} source={'hour'} defaultValue={'18:00'} />
    <TextInput label={'Imię'} source={'userid.name'} defaultValue={'Przemysław'} />
    <TextInput label={'Nazwisko'} source={'userid.surname'} defaultValue={'Owczarczyk'} />
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
