import { Create, DateInput, SimpleForm, TextInput } from 'react-admin';
import React from 'react';

const userId = localStorage.getItem('user').slice(8, 32);

export const CreateReservations = ({ ...props }) => (
  <Create {...props}>
    <SimpleForm>
      <DateInput label={'Dzień'} source={'start_time'} required />
      <TextInput label={'Godzina'} source={'hour'} defaultValue={'15:00'} required />
      <TextInput label={'Strefa Boiska'} source={'courtId'} required />
      <TextInput label={'Id'} source={'userId'} defaultValue={`${userId}`} disabled />
    </SimpleForm>
  </Create>
);
