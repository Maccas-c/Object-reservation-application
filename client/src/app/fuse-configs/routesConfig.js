import React from 'react';
import { Redirect } from 'react-router-dom';

import LoginConfig from 'app/main/login/LoginConfig';
import pagesConfigs from 'app/main/pages/pagesConfigs';

import FuseUtils from '@fuse/utils';

const routeConfigs = [...pagesConfigs, LoginConfig];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		exact: true,
		component: () => <Redirect to="/example" />
	},
	{
		component: () => <Redirect to="/not-found" />
	}
];

export default routes;
