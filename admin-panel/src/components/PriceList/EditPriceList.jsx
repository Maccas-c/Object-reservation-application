import React from 'react';

import {
  Datagrid,
  DateField,
  DateInput,
  Edit,
  EditButton,
  ReferenceManyField,
  SimpleForm,
  TextField,
  TextInput,
} from 'react-admin';

export const EditPriceList = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled label={'Id'} source={'id'} />
      <TextInput source={'title'} />
      <DateInput label={'Publication date'} source={'published_at'} />
      <ReferenceManyField label={'Comments'} reference={'comments'} target={'post_id'}>
        <Datagrid>
          <TextField source={'body'} />
          <DateField source={'created_at'} />
          <EditButton />
        </Datagrid>
      </ReferenceManyField>
    </SimpleForm>
  </Edit>
);
