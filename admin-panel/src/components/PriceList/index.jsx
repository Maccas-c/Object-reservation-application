import React from 'react';

import { Datagrid, List, Responsive, TextField } from 'react-admin';

export const PriceList = ({ ...props }) => (
  <List {...props}>
    <Responsive
      medium={
        <Datagrid title={'Rodzaj obiektu sportowego '} size={'small'}>
          <TextField label={'Strefa'} source={'name'} />
          <TextField
            label={'Zajecia Rekrutacyjno Sportowe Treningi'}
            source={'zajecia_rekrutacyjno_sportowe_treningi'}
          />
          <TextField label={'Mecze Turniejowe'} source={'mecze_turniejowe'} />
          <TextField label={'Uczelniany Klub AZS UAM'} source={'uczelniany_klub_AZS_UAM'} />
        </Datagrid>
      }
    />
  </List>
);
