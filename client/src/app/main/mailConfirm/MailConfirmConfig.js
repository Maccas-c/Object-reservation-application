import { authRoles } from '../../auth';
import MailConfirm from './MailConfirm';

const MailConfirmConfig = {
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
			path: '/mailConfirm',
			component: MailConfirm
		}
	]
};

export default MailConfirmConfig;
