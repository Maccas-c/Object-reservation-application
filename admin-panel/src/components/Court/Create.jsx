import { Create, SimpleForm, TextInput } from 'react-admin';
import React from 'react';

export const CourtCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput label={'Strefa Boiska'} source={'ids'} />
      <TextInput label={'Strona Boiska'} source={'description'} />
      <TextInput label={'Typ Boiska'} source={'name'} />
    </SimpleForm>
  </Create>
);
