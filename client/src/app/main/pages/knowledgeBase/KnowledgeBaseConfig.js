import React from 'react';
import { authRoles } from '../../../auth';

const KnowledgeBasePageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.user,
	routes: [
		{
			path: '/knowledge-base',
			component: React.lazy(() => import('./KnowledgeBase'))
		}
	]
};

export default KnowledgeBasePageConfig;
