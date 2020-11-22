import React from 'react';
import { render } from 'react-dom';
import { fetchUtils, Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

import { UsersList } from './UsersList';
import authProvider from './authProvider';

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }

  return fetchUtils.fetchJson(url, options);
};
const dataProvider = simpleRestProvider(
  'http://localhost:3001/api',
  httpClient,
);

export const App = () => {
  return (
    <Admin authProvider={authProvider} dataProvider={dataProvider}>
      <Resource name='users' list={UsersList} />
    </Admin>
  );
};
