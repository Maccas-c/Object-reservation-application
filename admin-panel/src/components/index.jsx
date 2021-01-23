import React from 'react';
import { Admin, Resource } from 'react-admin';

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
import { dataProvider } from './dataprovider';

const i18nProvider = polyglotI18nProvider(() => polishMessages, 'pl');
export const App = () => {
  return (
    <Admin theme={myTheme} {...{ dataProvider, authProvider }} locale={'pl'} i18nProvider={i18nProvider}>
      <Resource
        options={{ label: 'Cennik' }}
        name={'priceLists'}
        icon={AttachMoneyIcon}
        list={PriceList}
        edit={EditPrice}
      />
      <Resource options={{ label: 'Użytkownicy' }} name={'users'} icon={PeopleIcon} list={UsersList} show={UsersShow} />
      <Resource options={{ label: 'Rezerwacje' }} name={'reservations'} list={ReservationsList} />
      <Resource options={{ label: 'Boiska' }} name={'courts'} create={CourtCreate} list={CourtList} />
    </Admin>
  );
};
