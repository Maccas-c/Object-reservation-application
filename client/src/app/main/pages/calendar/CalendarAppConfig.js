import React from 'react';

import { authRoles } from 'app/auth';

const CalendarAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.user,
	routes: [
		{
			path: '/calendar',
			component: React.lazy(() => import('./CalendarApp'))
		}
	]
};

export default CalendarAppConfig;
