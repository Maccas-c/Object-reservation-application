import React from 'react';

import { authRoles } from 'app/auth';

const ExampleConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.user,
	routes: [
		{
			path: '/example',
			component: React.lazy(() => import('./Example'))
		}
	]
};

export default ExampleConfig;
