import { Create, SelectArrayInput, SimpleForm, TextInput } from 'react-admin';
import React from 'react';

const choices = [
  {
    id: {
      nameOfDay: 'Mon',
      value: 'true',
    },
    nameOfDay: 'Poniedziałek',
    value: 'Aktywny',
  },
  {
    id: {
      nameOfDay: 'Mon',
      value: 'false',
    },
    nameOfDay: 'Poniedziałek',
    value: 'Nieaktywny',
  },
  {
    id: {
      nameOfDay: 'Tue',
      value: 'true',
    },
    nameOfDay: 'Wtorek',
    value: 'Aktywny',
  },
  {
    id: {
      nameOfDay: 'Tue',
      value: 'false',
    },
    nameOfDay: 'Wtorek',
    value: 'Nieaktywny',
  },
  {
    id: {
      nameOfDay: 'Wed',
      value: 'true',
    },
    nameOfDay: 'Środa',
    value: 'Aktywny',
  },
  {
    id: {
      nameOfDay: 'Wed',
      value: 'false',
    },
    nameOfDay: 'Środa',
    value: 'Nieaktywny',
  },
  {
    id: {
      nameOfDay: 'Thu',
      value: 'true',
    },
    nameOfDay: 'Czwartek',
    value: 'Aktywny',
  },
  {
    id: {
      nameOfDay: 'Thu',
      value: 'false',
    },
    nameOfDay: 'Czwartek',
    value: 'Nieaktywny',
  },
  {
    id: {
      nameOfDay: 'Fri',
      value: 'true',
    },
    nameOfDay: 'Piątek',
    value: 'Aktywny',
  },
  {
    id: {
      nameOfDay: 'Fri',
      value: 'false',
    },
    nameOfDay: 'Piątek',
    value: 'Nieaktywny',
  },
  {
    id: {
      nameOfDay: 'Sat',
      value: 'true',
    },
    nameOfDay: 'Sobota',
    value: 'Aktywny',
  },
  {
    id: {
      nameOfDay: 'Sat',
      value: 'false',
    },
    nameOfDay: 'Sobota',
    value: 'Nieaktywny',
  },
  {
    id: {
      nameOfDay: 'Sun',
      value: 'true',
    },
    nameOfDay: 'Niedziela',
    value: 'Aktywny',
  },
  {
    id: {
      nameOfDay: 'Sun',
      value: 'false',
    },
    nameOfDay: 'Niedziela',
    value: 'Nieaktywny',
  },
];
const optionRenderer = (choice) => `${choice.nameOfDay} (${choice.value})`;
export const CourtCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput label={'Boisko'} source={'ids'} />
      <TextInput label={'Rozmiar Boiska'} source={'description'} />
      <TextInput label={'Strefa'} source={'nameCourt'} />
      <SelectArrayInput source={'date'} choices={choices} optionText={optionRenderer} />
    </SimpleForm>
  </Create>
);
