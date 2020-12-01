import React from 'react';
import { Admin, Resource, fetchUtils } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

import PeopleIcon from '@material-ui/icons/People';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import { Court } from './Court';
import { Reservations } from './Reservations';
import { EditPriceList, PriceList } from './PriceList';
import Users from './Users';

import authProvider from '../config/auth-provider';
import { CourtCreate } from './Court/Create';

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
    <Resource name={'courts'} create={CourtCreate} list={Court} />
    <Resource name={'priceLists'} icon={AttachMoneyIcon} list={PriceList} edit={EditPriceList} />
  </Admin>
);
