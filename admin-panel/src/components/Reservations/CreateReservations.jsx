import {
  BooleanInput,
  Create,
  DateInput,
  SaveButton,
  SelectInput,
  SimpleForm,
  TextInput,
  Toolbar,
  translate,
} from 'react-admin';
import React from 'react';
import Button from '@material-ui/core/Button';
import { hours, zones } from './Constants';

const TagCreateToolbar = translate(({ onCancel, translate, ...props }) => (
  <Toolbar {...props}>
    <SaveButton label={'Zapisz'} />
    <Button onClick={onCancel}>Zamknij</Button>
  </Toolbar>
));

export const CreateReservations = ({ onCancel, ...props }) => (
  <Create title={' '} {...props}>
    <SimpleForm toolbar={<TagCreateToolbar onCancel={onCancel} />}>
      <DateInput label={'Dzień'} source={'dayString'} required />
      <SelectInput label={'Godzina'} source={'title'} defaultValue={'15:00'} choices={hours} required />
      {/*  do poprawienia courtId */}
      <SelectInput label={'Strefa Boiska'} source={'courtId.nameCourt'} defaultValue={'A'} choices={zones} required />
      <TextInput label={'Imię'} source={'userId.name'} defaultValue={'Admin'} disabled />
      <TextInput label={'Imię'} source={'userId.surname'} defaultValue={'Admin'} disabled />
      <BooleanInput label={'Vat'} source={'vat'} defaultValue={false} />
      <BooleanInput label={'Zapłacono'} source={'paid'} defaultValue={false} />
      <BooleanInput label={'Obsłużona faktura'} source={'isServedVat'} defaultValue={false} />
    </SimpleForm>
  </Create>
);
