import React from 'react';

import { Datagrid, DateInput, DateTimeInput, Filter, List, TextField, TextInput } from 'react-admin';

const PostFilter = ({ ...props }) => (
  <Filter {...props}>
    <DateInput label={'Data'} source={'start_time'} alwaysOn />
    <DateTimeInput label={'Dokladna data'} source={'hour'} />
    <TextInput label={'Strefa'} source={'courtid'} />
    <TextInput label={'Imię'} source={'name'} />
    <TextInput label={'Nazwisko'} source={'surname'} />
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
