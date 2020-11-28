import React from 'react';

import {
  Datagrid,
  EditButton,
  ReferenceManyField,
  Show,
  ShowButton,
  Tab,
  TabbedShowLayout,
  TextField,
} from 'react-admin';

export const UsersShow = ({ ...props }) => (
  <Show {...props}>
    <TabbedShowLayout>
      <Tab label={'Użytkownik'}>
        <TextField source={'id'} />
        <TextField label={'Imię'} source={'name'} />
        <TextField label={'Nazwisko'} source={'surname'} />
        <TextField label={'Płeć'} source={'sex'} />
        <TextField label={'Wiek'} source={'age'} />
        <TextField source={'email'} />
        <TextField label={'Telefon'} source={'phone_number'} />
        <TextField label={'Miasto'} source={'adress_city'} />
        <TextField label={'Ulica'} source={'adress_street'} />
        <TextField label={'Kod pocztowy'} source={'adress_postalCode'} />
        <TextField label={'Student'} source={'isStudent'} />
      </Tab>
      <Tab label={'Rezerwacje'} path={'reservations'}>
        <ReferenceManyField addLabel={false} reference={'reservations'} target={'userid'}>
          <Datagrid>
            <TextField source={'id'} />
            <TextField source={'start_time'} />
            <TextField source={'hour'} />
            <TextField source={'courtid'} />
            <TextField label={'Imię'} source={'userid.name'} />
            <TextField label={'Nazwisko'} source={'userid.surname'} />
            <ShowButton />
            <EditButton />
          </Datagrid>
        </ReferenceManyField>
      </Tab>
    </TabbedShowLayout>
  </Show>
);
