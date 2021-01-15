import React from 'react';
import { Redirect } from 'react-router-dom';

import LoginConfig from 'app/main/login/LoginConfig';
import pagesConfigs from 'app/main/pages/pagesConfigs';

import FuseUtils from '@fuse/utils';
import RegisterConfig from 'app/main/register/RegisterConfig';
import RememberPasswordConfig from 'app/main/rememberPassword/RememberPasswordConfig';
import ResetPasswordConfig from 'app/main/resetPassword/ResetPasswordConfig';
import MailConfirmConfig from 'app/main/mailConfirm/MailConfirmConfig';

const routeConfigs = [
	...pagesConfigs,
	LoginConfig,
	RegisterConfig,
	RememberPasswordConfig,
	ResetPasswordConfig,
	MailConfirmConfig
];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		exact: true,
		component: () => <Redirect to="/home" />
	},
	{
		component: () => <Redirect to="/not-found" />
	}
];

export default routes;
