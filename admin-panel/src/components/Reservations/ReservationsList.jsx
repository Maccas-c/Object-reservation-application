import * as React from 'react';
import {
  List,
  Datagrid,
  SimpleList,
  Responsive,
  TextField,
  ShowButton,
  ExportButton,
  BooleanField,
} from 'react-admin';

export const ReservationsList = props => {
  return (
    <List {...props}>
      <Responsive
        small={
          <SimpleList linkType='show' primaryText={record => record.name} />
        }
        medium={
          <Datagrid>
            <TextField source='id' />
            <TextField label='Data' source='start_time' />
            <TextField label='Godzina' source='hour' />
            <TextField label='Strefa boiska' source='courtid' />
            <TextField label='Imię' source='userid.name' />
            <TextField label='Nazwisko' source='userid.name' />
            <ShowButton />
          </Datagrid>
        }
      />
    </List>
  );
};
