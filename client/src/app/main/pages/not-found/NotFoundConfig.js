import React from 'react';

const Error404PageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/not-found',
			component: React.lazy(() => import('./NotFound'))
		}
	]
};

export default Error404PageConfig;
