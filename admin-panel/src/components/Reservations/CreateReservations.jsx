import { BooleanInput, Create, DateInput, SimpleForm, TextInput } from 'react-admin';
import React from 'react';

// const { _id } = JSON.parse(localStorage.getItem('user'));

export const CreateReservations = ({ ...props }) => (
  <Create {...props}>
    <SimpleForm>
      <DateInput label={'Dzień'} source={'start_time'} required />
      <TextInput label={'Godzina'} source={'hour'} defaultValue={'15:00'} required />
      <TextInput label={'Strefa Boiska'} source={'courtId'} required />
      <BooleanInput label={'Vat'} source={'vat'} />
      <TextInput label={'Id'} source={'userId'} defaultValue={'5fba85f645830e13ccdb85b9'} disabled />
    </SimpleForm>
  </Create>
);
