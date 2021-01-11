import ResetPassword from './ResetPassword';

import { authRoles } from 'app/auth';

const ResetPasswordConfig = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: false
				},
				toolbar: {
					display: false
				},
				footer: {
					display: false
				},
				leftSidePanel: {
					display: false
				},
				rightSidePanel: {
					display: false
				}
			}
		}
	},
	auth: authRoles.onlyGuest,
	routes: [
		{
			path: `/reset/:id`,
			component: ResetPassword
		}
	]
};

export default ResetPasswordConfig;
