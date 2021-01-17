import React from 'react';
import { authRoles } from '../../../auth';

const InstructionLoaderConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth: authRoles.user,
    routes: [
        {
            path: '/prepare',
            component: React.lazy(() => import('./InstructionLoader'))
        }
    ]
};

export default InstructionLoaderConfig;
