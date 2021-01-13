import React from 'react';

import { authRoles } from 'app/auth';

const HomeConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.user,
	routes: [
		{
			path: '/home',
			component: React.lazy(() => import('./Home'))
		}
	]
};

export default HomeConfig;
