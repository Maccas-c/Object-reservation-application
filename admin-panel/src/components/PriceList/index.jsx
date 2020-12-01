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
          <TextField
            label={'Zajecia Rekrutacyjno Sportowe Treningi'}
            source={'zajecia_rekrutacyjno_sportowe_treningi'}
          />
          <TextField label={'Mecze Turniejowe'} source={'mecze_turniejowe'} />
          <TextField label={'Uczelniany Klub AZS UAM'} source={'uczelniany_klub_AZS_UAM'} />
          <EditButton />
        </Datagrid>
      }
    />
  </List>
);
