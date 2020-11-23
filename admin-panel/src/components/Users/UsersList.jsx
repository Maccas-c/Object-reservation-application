import * as React from 'react';
import {
  List,
  Datagrid,
  SimpleList,
  Responsive,
  TextField,
  ShowButton,
  BooleanField,
} from 'react-admin';

export const UsersList = props => {
  return (
    <List {...props}>
      <Responsive
        small={<SimpleList linkType='show' primaryText={record => record.id} />}
        medium={
          <Datagrid>
            <TextField source='id' />
            <TextField source='name' />
            <TextField source='surname' />
            <TextField source='email' />
            <ShowButton />
          </Datagrid>
        }
      />
    </List>
  );
};
{
  /* <List {...props}>
      <Datagrid>
        <TextField source='id' />
        <TextField source='name' />
        <TextField source='surname' />
        <TextField source='email' />
        <TextField source='age' />
        <TextField source='phone_number' />
        <TextField source='sex' />
        <TextField source='adress_street' />
        <TextField source='adress_city' />
        <TextField source='adress_postalCode' />
        <BooleanField source='isStudent' />
      </Datagrid>
    </List> */
}
