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
			path: '/profile',
			component: React.lazy(() => import('./UserProfile'))
		}
	]
};

export default UserProfileConfig;
