import React from 'react';

import { authRoles } from 'app/auth';

const PriceConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.user,
	routes: [
		{
			path: '/priceList',
			component: React.lazy(() => import('./PriceList'))
		}
	]
};

export default PriceConfig;
