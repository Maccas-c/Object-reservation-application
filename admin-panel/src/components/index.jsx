import React from 'react';
import { Admin, Resource, fetchUtils } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import polishMessages from 'ra-language-polish';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import PeopleIcon from '@material-ui/icons/People';

import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import authProvider from '../config/auth-provider';

import { EditPrice } from './PriceList/EditPrice';
import { PriceList } from './PriceList/PriceList';
import { UsersList } from './Users/UsersList';
import { UsersShow } from './Users/UsersShow';
import { CourtCreate } from './Court/CourtCreate';
import { CourtList } from './Court/CourtList';
import { myTheme } from './theme';
import ReservationsList from './Reservations/ReservationsList';

const httpClient = (url, options = {}) => {
  options.headers = new Headers({ Accept: 'application/json' });
  options.headers = new Headers({ Accept: 'Content-Type' });
  options.headers.set('Cache-Control', 'no-cache');

  const token = localStorage.getItem('token');
  options.headers.set('react-admin', token);
  return fetchUtils.fetchJson(url, options);
};
const dataProvider = simpleRestProvider('http://localhost:3000/api/admin', httpClient);

const i18nProvider = polyglotI18nProvider(() => polishMessages, 'pl');
export const App = () => {
  return (
    <Admin theme={myTheme} {...{ dataProvider, authProvider }} locale={'pl'} i18nProvider={i18nProvider}>
      <Resource options={{ label: 'Użytkownicy' }} name={'users'} icon={PeopleIcon} list={UsersList} show={UsersShow} />
      <Resource
        options={{ label: 'Cennik' }}
        name={'priceLists'}
        icon={AttachMoneyIcon}
        list={PriceList}
        edit={EditPrice}
      />
      <Resource options={{ label: 'Rezerwacje' }} name={'reservations'} list={ReservationsList} />
      <Resource options={{ label: 'Boiska' }} name={'courts'} create={CourtCreate} list={CourtList} />
    </Admin>
  );
};
