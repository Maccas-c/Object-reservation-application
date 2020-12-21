import React from 'react';

import { Datagrid, ReferenceManyField, Show, Tab, TabbedShowLayout, TextField } from 'react-admin';

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
        <ReferenceManyField addLabel={false} reference={'reservations'} target={'userId'}>
          <Datagrid>
            <TextField source={'id'} />
            <TextField source={'start_time'} />
            <TextField source={'hour'} />
            <TextField source={'courtId'} />
            <TextField label={'Imię'} source={'userId.name'} />
            <TextField label={'Nazwisko'} source={'userId.surname'} />
          </Datagrid>
        </ReferenceManyField>
      </Tab>
    </TabbedShowLayout>
  </Show>
);
