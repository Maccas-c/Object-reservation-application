import { DateInput, Edit, SimpleForm, TextInput } from 'react-admin';
import React from 'react';

export const EditPriceList = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled label={'Id'} source={'id'} />
      <TextInput source={'title'} />
      <DateInput label={'Publication date'} source={'published_at'} />
    </SimpleForm>
  </Edit>
);
