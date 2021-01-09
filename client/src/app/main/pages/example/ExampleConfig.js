import React from 'react';

const ExampleConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/example',
			component: React.lazy(() => import('./Example'))
		}
	]
};

export default ExampleConfig;
