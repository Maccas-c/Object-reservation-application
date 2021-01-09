import React from 'react';
import { Redirect } from 'react-router-dom';

import pagesConfigs from 'app/main/pages/pagesConfigs';

import FuseUtils from '@fuse/utils';

const routeConfigs = [...pagesConfigs];

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
