import * as React from 'react';
import {
  List,
  Datagrid,
  SimpleList,
  Responsive,
  TextField,
  ShowButton,
} from 'react-admin';

export const UsersList = props => {
    return (
    <List {...props}>
      <Responsive
        small={<SimpleList linkType='show' primaryText={record => record.name} />}
        medium={
          <Datagrid>
            <TextField label='Imię' source='name' />
            <TextField label='Nazwisko' source='surname' />
            <TextField source='email' />
            <ShowButton />
          </Datagrid>
        }
      />
    </List>
  );
};
