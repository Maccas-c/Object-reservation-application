import React from 'react';
import { Redirect } from 'react-router-dom';

import LoginConfig from 'app/main/login/LoginConfig';
import pagesConfigs from 'app/main/pages/pagesConfigs';

import FuseUtils from '@fuse/utils';
import RegisterConfig from 'app/main/register/RegisterConfig';
import RememberPasswordConfig from 'app/main/rememberPassword/RememberPasswordConfig';
import ResetPasswordConfig from 'app/main/resetPassword/ResetPasswordConfig';

const routeConfigs = [...pagesConfigs, LoginConfig, RegisterConfig, RememberPasswordConfig, ResetPasswordConfig];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		exact: true,
		component: () => <Redirect to="/profile" />
	},
	{
		component: () => <Redirect to="/not-found" />
	}
];

export default routes;
