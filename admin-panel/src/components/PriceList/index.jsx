import React from 'react';

import { Datagrid, DateInput, Edit, EditButton, List, Responsive, SimpleForm, TextField, TextInput } from 'react-admin';

export const EditPriceList = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled label={'Id'} source={'id'} />
      <TextInput source={'title'} />
      <DateInput label={'Publication date'} source={'published_at'} />
    </SimpleForm>
  </Edit>
);

export const PriceList = ({ ...props }) => (
  <List {...props} exporter>
    <Responsive
      medium={
        <Datagrid title={'Rodzaj obiektu sportowego '} size={'small'}>
          <TextField label={'Strefa'} source={'name'} />
          <TextField label={'Zajecia Rekrutacyjno Sportowe Treningi'} source={'classes_and_sports_training'} />
          <TextField label={'Mecze Turniejowe'} source={'tournament_matches'} />
          <TextField label={'Uczelniany Klub AZS UAM'} source={'university_club'} />
          <EditButton />
        </Datagrid>
      }
    />
  </List>
);
