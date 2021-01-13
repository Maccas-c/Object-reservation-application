import {
  Create,
  SaveButton,
  SelectArrayInput,
  SelectInput,
  SimpleForm,
  TextInput,
  Toolbar,
  translate,
} from 'react-admin';
import React from 'react';
import { availableDays, courts, zones } from '../Reservations/Constants';

const CreateToolbar = translate(({ onCancel, translate, ...props }) => (
  <Toolbar {...props}>
    <SaveButton label={'Zapisz'} />
  </Toolbar>
));

const optionRenderer = (choice) => `${choice.nameOfDay} (${choice.value})`;
export const CourtCreate = (props) => (
  <Create title={'Stwórz nowe boisko '} options={{ label: 'Użytkownicy' }} {...props}>
    <SimpleForm toolbar={<CreateToolbar />}>
      <SelectInput label={'Boisko'} source={'ids'} choices={courts} />
      <TextInput label={'Opis'} source={'description'} />
      <SelectInput label={'Strefa'} source={'nameCourt'} choices={zones} />
      <SelectArrayInput source={'date'} label={'Dostępność'} choices={availableDays} optionText={optionRenderer} />
    </SimpleForm>
  </Create>
);
