import React from 'react';

import { Datagrid, List, Responsive, TextField } from 'react-admin';

import { FilterReservation } from './FilterReservation';

export const ReservationList = ({ ...props }) => (
  <List {...props} filters={<FilterReservation />}>
    <Responsive
      medium={
        <Datagrid size={'medium'}>
          <TextField source={'id'} />
          <TextField label={'Data'} source={'start_time'} />
          <TextField label={'Godzina'} source={'hour'} />
          <TextField label={'Strefa boiska'} source={'courtId'} />
          <TextField label={'Imię'} source={'userId.name'} />
          <TextField label={'Nazwisko'} source={'userId.surname'} />
        </Datagrid>
      }
    />
  </List>
);
