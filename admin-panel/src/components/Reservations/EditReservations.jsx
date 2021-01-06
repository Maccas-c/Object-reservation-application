import { BooleanInput, Edit, SaveButton, SimpleForm, Toolbar, translate } from 'react-admin';
import React from 'react';
import Button from '@material-ui/core/Button';

const TagEditToolbar = translate(({ onCancel, translate, ...props }) => (
  <Toolbar {...props}>
    <SaveButton />
    <Button onClick={onCancel}>{translate('ra.action.cancel')}</Button>
  </Toolbar>
));

export const EditReservations = ({ onCancel, ...props }) => (
  <Edit {...props}>
    <SimpleForm toolbar={<TagEditToolbar onCancel={onCancel} />}>
      <BooleanInput label={'Vat'} source={'vat'} />
      <BooleanInput label={'Faktura obsłużona'} source={'isServedVat'} />
    </SimpleForm>
  </Edit>
);
