import React from 'react';

import { authRoles } from 'app/auth';

const UserProfileConfig = {
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

export default UserProfileConfig;
