import { Create, SimpleForm, TextInput } from 'react-admin';
import React from 'react';

export const CourtCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput label={'Boisko'} source={'ids'} />
      <TextInput label={'Rozmiar Boiska'} source={'description'} />
      <TextInput label={'Strefa'} source={'name'} />
    </SimpleForm>
  </Create>
);
