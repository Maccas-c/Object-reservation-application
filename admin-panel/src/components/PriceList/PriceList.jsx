import React from 'react';

import { Datagrid, EditButton, List, Loading, Responsive, TextField, useAuthState } from 'react-admin';

export const PriceList = ({ ...props }) => {
  const { loading, authenticated } = useAuthState();
  if (loading) {
    return <Loading />;
  }
  if (authenticated) {
    return (
      <List bulkActionButtons={false} {...props} title={'Cennik'} exporter={false}>
        <Responsive
          medium={
            <Datagrid isRowSelectable={() => false} title={'Rodzaj obiektu sportowego '} size={'medium'}>
              <TextField label={'Strefa'} source={'name'} />
              <TextField label={'Zajecia Rekrutacyjno Sportowe Treningi'} source={'classes_and_sports_training'} />
              <TextField label={'Mecze Turniejowe'} source={'tournament_matches'} />
              <TextField label={'Uczelniany Klub AZS UAM'} source={'university_club'} />
              <EditButton label={'Edytuj'} />
            </Datagrid>
          }
        />
      </List>
    );
  }
  return <div>cos</div>;
};
