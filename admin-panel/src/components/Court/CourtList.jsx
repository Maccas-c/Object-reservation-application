import React from 'react';
import { ArrayField, BooleanField, CreateButton, Datagrid, List, Responsive, TextField } from 'react-admin';

export const CourtList = ({ ...props }) => (
  <List {...props} title={'Boiska'} actions={<CreateButton label={'Stwórz nowe boisko'} />} exporter>
    <Responsive
      medium={
        <Datagrid size={'medium'}>
          <TextField label={'Boisko'} source={'ids'} />
          <TextField label={'Rozmiar Boiska'} source={'description'} />
          <TextField label={'Strefa'} source={'nameCourt'} />
          <ArrayField label={'Dostępnośc'} source={'date'}>
            <Datagrid>
              <TextField label={'Dzień tygodnia'} source={'nameOfDay'} />
              <BooleanField label={'Aktywne'} source={'value'} />
            </Datagrid>
          </ArrayField>
        </Datagrid>
      }
    />
  </List>
);
