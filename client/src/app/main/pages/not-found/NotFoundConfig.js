import React from 'react';

import { authRoles } from 'app/auth';

const Error404PageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.user,
	routes: [
		{
			path: '/not-found',
			component: React.lazy(() => import('./NotFound'))
		}
	]
};

export default Error404PageConfig;
