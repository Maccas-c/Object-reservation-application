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
      <DateInput label={'Dzień'} source={'end'} required />
      <SelectInput label={'Godzina'} source={'title'} defaultValue={'15:00'} choices={hours} required />
      {/*  do poprawienia courtId */}
      <SelectInput label={'Strefa Boiska'} source={'courtId'} choices={zones} required />
      <BooleanInput label={'Vat'} source={'vat'} required />
      <TextInput label={'Id'} source={'userId'} defaultValue={'5fba85f645830e13ccdb85b9'} disabled />
    </SimpleForm>
  </Create>
);
