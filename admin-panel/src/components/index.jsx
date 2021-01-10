import React from 'react';
import { Admin, Resource, fetchUtils } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import polishMessages from 'ra-language-polish';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import PeopleIcon from '@material-ui/icons/People';

import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import { Court } from './Court';
import { PriceList } from './PriceList/PriceList';
import Users from './Users';

import authProvider from '../config/auth-provider';
import { CourtCreate } from './Court/Create';

import { EditPriceList } from './PriceList/EditPriceList';
import ReservationList from './Reservations/ReservationsList';

const httpClient = (url, options = {}) => {
  options.headers = new Headers({ Accept: 'application/json' });
  options.headers = new Headers({ Accept: 'Content-Type' });
  options.headers.set('Cache-Control', 'no-cache');
  options.headers.set('React-Admin', process.env.REACT_APP_SECRET);
  return fetchUtils.fetchJson(url, options);
};
const dataProvider = simpleRestProvider('https://devcourt.projektstudencki.pl/api/admin', httpClient);

const i18nProvider = polyglotI18nProvider(() => polishMessages, 'pl');
export const App = () => (
  <>
    <Admin {...{ dataProvider, authProvider }} locale={'pl'} i18nProvider={i18nProvider}>
      <Resource options={{ label: 'Użytkownicy' }} name={'users'} icon={PeopleIcon} {...Users} />
      <Resource options={{ label: 'Rezerwacje' }} name={'reservations'} list={ReservationList} />
      <Resource options={{ label: 'Boiska' }} name={'courts'} create={CourtCreate} list={Court} />
      <Resource
        options={{ label: 'Cennik' }}
        name={'priceLists'}
        icon={AttachMoneyIcon}
        list={PriceList}
        edit={EditPriceList}
      />
    </Admin>
  </>
);
