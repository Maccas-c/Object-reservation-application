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
  options.headers = new Headers({ Accept: 'application/json' });
  options.headers = new Headers({ Accept: 'Content-Type' });

  return fetchUtils.fetchJson(url, options);
};
const dataProvider = simpleRestProvider('http://localhost:3001/api/admin', httpClient);

export const App = () => (
  <Admin {...{ dataProvider, authProvider }}>
    <Resource name={'users'} icon={PeopleIcon} {...Users} />
    <Resource name={'reservations'} icon={DashboardIcon} list={Reservations} />
    <Resource name={'court'} list={Court} />
    <Resource name={'priceList'} icon={AttachMoneyIcon} list={PriceList} />
    <Resource name={'Regulations'} list={Regulations} />
  </Admin>
);
