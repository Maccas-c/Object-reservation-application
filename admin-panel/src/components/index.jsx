import React from 'react';
import {fetchUtils, Admin, Resource} from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

import Users from './Users';
import Reservations from './Reservations';
import Court from './Court';
import PriceList from './PriceList';
import authProvider from './authProvider';
import Regulations from "./Regulations";

import PeopleIcon from '@material-ui/icons/People';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({Accept: 'application/json'});
    }

    return fetchUtils.fetchJson(url, options);
};
const dataProvider = simpleRestProvider(
    'http://localhost:3001/api/admin',
    httpClient,
);

export const App = () => {
    return (
        <Admin authProvider={authProvider} dataProvider={dataProvider}>
            <Resource icon={PeopleIcon} name='Users' {...Users} />
            <Resource name='Reservations' {...Reservations} />
            <Resource icon={DashboardIcon} name='court' {...Court}/>
            <Resource icon={AttachMoneyIcon}  name='PriceList' {...PriceList}/>
            <Resource name='Regulations' {...Regulations}/>
        </Admin>
    );
};
