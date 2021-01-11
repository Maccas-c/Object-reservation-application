import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import clsx from 'clsx';
import React from 'react';
import PDF from './regulations.pdf';

function DocumentationButton({ className }) {
	return (
		<Button
			onClick={() => window.open(PDF)}
			role="button"
			className={clsx('normal-case', className)}
			variant="contained"
			color="primary"
		>
			<Icon className="text-16">import_contacts</Icon>
			<span className="mx-4">Regulamin</span>
		</Button>
	);
}

export default DocumentationButton;
