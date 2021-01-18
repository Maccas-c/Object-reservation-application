import React from 'react';

import { authRoles } from 'app/auth';

const BasketConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.user,
	routes: [
		{
			path: '/basket',
			component: React.lazy(() => import('./Basket'))
		}
	]
};

export default BasketConfig;
