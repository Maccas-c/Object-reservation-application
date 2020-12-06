import { Create, DateInput, SimpleForm, TextInput } from 'react-admin';
import React from 'react';

const { _id } = JSON.parse(localStorage.getItem('user'));

export const CreateReservations = ({ ...props }) => (
  <Create {...props}>
    <SimpleForm>
      <DateInput label={'Dzień'} source={'start_time'} required />
      <TextInput label={'Godzina'} source={'hour'} defaultValue={'15:00'} required />
      <TextInput label={'Strefa Boiska'} source={'courtId'} required />
      <TextInput label={'Id'} source={'userId'} defaultValue={`${_id}`} disabled />
    </SimpleForm>
  </Create>
);
