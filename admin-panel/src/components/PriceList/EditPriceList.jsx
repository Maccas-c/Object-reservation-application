import { Edit, SaveButton, SimpleForm, TextInput, Toolbar, translate } from 'react-admin';
import React from 'react';

const EditToolbar = translate(({ translate, ...props }) => (
  <Toolbar {...props}>
    <SaveButton label={'Zapisz'} />
  </Toolbar>
));

export const EditPriceList = ({ ...props }) => (
  <Edit title={' '} {...props}>
    <SimpleForm toolbar={<EditToolbar />}>
      <TextInput label={'Strefa'} source={'name'} />
      <TextInput label={'Zajecia Sportowe Treningi'} source={'classes_and_sports_training'} />
      <TextInput label={'Mecze Turniejowe'} source={'tournament_matches'} />
      <TextInput label={'Uczelniany Klub AZS UAM'} source={'university_club'} />
    </SimpleForm>
  </Edit>
);
