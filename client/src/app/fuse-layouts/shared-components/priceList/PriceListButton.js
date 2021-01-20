import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import clsx from 'clsx';
import React from 'react';
import { withRouter } from 'react-router';

function PriceListButton({ className, history }) {
	return (
		<Button
			onClick={() => history.push('/priceList')}
			role="button"
			className={clsx('normal-case', className)}
			variant="contained"
			color="primary"
		>
			<Icon className="text-16">local_offer</Icon>
			<span className="mx-4">Cennik</span>
		</Button>
	);
}

export default withRouter(PriceListButton);
