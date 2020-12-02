import React from 'react';

import { Datagrid, Filter, List, Responsive, ShowButton, TextField, TextInput } from 'react-admin';

const PostFilter = (props) => (
  <Filter {...props}>
    <TextInput label={'Imie'} source={'name'} alwaysOn />
    <TextInput label={'Nazwisko'} source={'surname'} />
    <TextInput label={'Email'} source={'email'} />
  </Filter>
);
export const UsersList = ({ ...props }) => (
  <List {...props} filters={<PostFilter />}>
    <Responsive
      medium={
        <Datagrid size={'medium'}>
          <TextField label={'Imię'} source={'name'} />
          <TextField label={'Nazwisko'} source={'surname'} />
          <TextField source={'email'} />
          <ShowButton />
        </Datagrid>
      }
    />
  </List>
);
