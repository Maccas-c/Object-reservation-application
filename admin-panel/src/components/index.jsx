import React from 'react';
import { Admin, Resource, fetchUtils } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

import PeopleIcon from '@material-ui/icons/People';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import { Court } from './Court';
import { Reservations } from './Reservations';
import { PriceList } from './PriceList';
import { Regulations } from './Regulations';
import Users from './Users';

import authProvider from '../config/auth-provider';

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }

  return fetchUtils.fetchJson(url, options);
};
const dataProvider = simpleRestProvider('http://localhost:3001/api/admin', httpClient);

export const App = () => (
  <Admin {...{ dataProvider, authProvider }}>
    <Resource {...{ Users, icon: PeopleIcon, name: 'Users' }} />
    <Resource {...{ Reservations, name: 'Reservations' }} />
    <Resource {...{ Court, icon: DashboardIcon, name: 'court' }} />
    <Resource {...{ PriceList, icon: AttachMoneyIcon, name: 'PriceList' }} />
    <Resource {...{ Regulations, name: 'Regulations' }} />
  </Admin>
);
