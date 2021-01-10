import { authRoles } from 'app/auth';
import RememberPassword from './RememberPassword';

const RememberConfig = {
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
			path: '/rememberPassword',
			component: RememberPassword
		}
	]
};

export default RememberConfig;
