import React from 'react';
import {
  Datagrid,
  DateField,
  EditButton,
  ShowButton,
  ReferenceManyField,
  RichTextField,
  Show,
  Tab,
  TabbedShowLayout,
  TextField,
} from 'react-admin';

const UsersShow = props => (
  <Show {...props}>
    <TabbedShowLayout>
      <Tab label='Summary'>
        <TextField source='id' />
        <TextField source='name' />
        <TextField source='surname' />
        <TextField source='email' />
      </Tab>
      <Tab label='Rezerwacje' path='reservations'>
        <ReferenceManyField
          addLabel={false}
          reference='reservations'
          target='userid'
        >
          <Datagrid>
            <TextField source='start_time' />
            <TextField source='hour' />
            <TextField source='courtid' />
            <TextField source='userid' />
            <ShowButton />
            <EditButton />
          </Datagrid>
        </ReferenceManyField>
      </Tab>
    </TabbedShowLayout>
  </Show>
);

export default UsersShow;
