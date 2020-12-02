import { Edit, SimpleForm, TextInput } from 'react-admin';
import React from 'react';

export const EditPriceList = ({ ...props }) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled label={'Id'} source={'id'} />
      <TextInput label={'Strefa'} source={'name'} />
      <TextInput label={'Zajecia Sportowe Treningi'} source={'classes_and_sports_training'} />
      <TextInput label={'Mecze Turniejowe'} source={'tournament_matches'} />
      <TextInput label={'Uczelniany Klub AZS UAM'} source={'university_club'} />
    </SimpleForm>
  </Edit>
);
