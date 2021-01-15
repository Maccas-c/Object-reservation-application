import { BooleanInput, DateInput, Filter, TextInput } from 'react-admin';
import React from 'react';

export const FilterReservation = ({ ...props }) => (
  <Filter {...props}>
    <DateInput label={'Data'} source={'start'} />
    {/* do poprawy courtid */}
    <TextInput label={'Strefa'} source={'courtId'} />
    <TextInput label={'Imię'} source={'name'} />
    <TextInput label={'Nazwisko'} source={'surname'} />
    <BooleanInput label={'Vat'} source={'vat'} />
    <BooleanInput label={'Faktura obsłużona'} source={'isServedVat'} />
  </Filter>
);
