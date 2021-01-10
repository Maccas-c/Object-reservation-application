import { BooleanInput, DateInput, Edit, SaveButton, SelectInput, SimpleForm, Toolbar, translate } from 'react-admin';
import React from 'react';
import Button from '@material-ui/core/Button';
import { hours } from './Constants';

const TagEditToolbar = translate(({ onCancel, translate, ...props }) => (
  <Toolbar {...props}>
    <SaveButton label={'Zapisz'} />
    <Button onClick={onCancel}>Zamknij</Button>
  </Toolbar>
));

export const EditReservations = ({ onCancel, ...props }) => (
  <Edit title={' '} {...props}>
    <SimpleForm toolbar={<TagEditToolbar onCancel={onCancel} />}>
      <DateInput label={'Data'} source={'start_time'} />
      <SelectInput label={'Godzina'} source={'hour'} choices={hours} />
      <BooleanInput label={'Vat'} source={'vat'} />
      <BooleanInput label={'Faktura obsłużona'} source={'isServedVat'} />
    </SimpleForm>
  </Edit>
);
