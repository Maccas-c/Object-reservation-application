import React from 'react';

import { authRoles } from 'app/auth';

const UserListReservationConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.user,
	routes: [
		{
			path: '/reservation',
			component: React.lazy(() => import('./UserListReservation'))
		}
	]
};

export default UserListReservationConfig;
