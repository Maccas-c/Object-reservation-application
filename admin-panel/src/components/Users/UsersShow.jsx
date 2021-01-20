import React from 'react';

import {
  BooleanField,
  Datagrid,
  NumberField,
  ReferenceManyField,
  Show,
  Tab,
  TabbedShowLayout,
  TextField,
} from 'react-admin';

import { PDFDownload } from './InvoicePDF/PDFDownload';

export const UsersShow = ({ ...props }) => {
  return (
    <Show title={'Dane szczegółowe'} {...props}>
      <TabbedShowLayout>
        <Tab label={'Użytkownik'}>
          <TextField label={'Imię'} source={'name'} />
          <TextField label={'Nazwisko'} source={'surname'} />
          <TextField label={'Płeć'} source={'sex'} />
          <TextField label={'Wiek'} source={'age'} />
          <TextField source={'email'} />
          <TextField label={'Telefon'} source={'phone_number'} />
          <TextField label={'Miasto'} source={'adress_city'} />
          <TextField label={'Ulica'} source={'adress_street'} />
          <TextField label={'Kod pocztowy'} source={'adress_postalCode'} />
          <TextField label={'Student'} source={'isStudent'} />
        </Tab>
        <Tab label={'Rezerwacje do faktury'} path={'reservations'}>
          <ReferenceManyField addLabel={false} reference={'reservations'} target={'userId'}>
            <Datagrid>
              <TextField label={'Data początkowa'} source={'dayString'} />
              <TextField label={'Godzina'} source={'title'} />
              <TextField label={'Imię'} source={'userId.name'} />
              <TextField label={'Nazwisko'} source={'userId.surname'} />
              <NumberField label={'Cena'} source={'price'} />
              <BooleanField label={'Vat'} source={'vat'} />
              <BooleanField label={'Faktura obsłużona'} source={'isServedVat'} />
              <TextField label={'Sektor'} source={'courtId.nameCourt'} />
              <PDFDownload />
            </Datagrid>
          </ReferenceManyField>
          <ReferenceManyField sortable={false} label={''} reference={'reservations'} target={'userId'}>
            <PDFDownload />
          </ReferenceManyField>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};
