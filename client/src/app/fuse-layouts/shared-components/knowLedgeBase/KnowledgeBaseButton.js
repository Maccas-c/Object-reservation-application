import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import clsx from 'clsx';
import React from 'react';
import { withRouter } from 'react-router';

function KnowledgeBaseButton({ className, history }) {
	return (
		<Button
			onClick={() => history.push('/knowledge-base')}
			role="button"
			className={clsx('normal-case', className)}
			variant="contained"
			color="primary"
		>
			<Icon className="text-16">integration_instructions</Icon>
			<span className="mx-4">Instrukcje</span>
		</Button>
	);
}

export default withRouter(KnowledgeBaseButton);
