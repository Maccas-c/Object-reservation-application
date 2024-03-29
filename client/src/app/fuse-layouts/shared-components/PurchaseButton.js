import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';
import Icon from '@material-ui/core/Icon';
import clsx from 'clsx';
import React from 'react';

function PurchaseButton({ className }) {
	const history = useHistory();
	const handlePushBasket = () => {
		history.push('/basket');
	};
	return (
		<Button
			rel="noreferrer noopener"
			role="button"
			className={clsx('normal-case', className)}
			variant="contained"
			onClick={() => {
				handlePushBasket();
			}}
			color="secondary"
		>
			<Icon className="text-16">shopping_cart</Icon>
			<span className="mx-4">Koszyk</span>
		</Button>
	);
}

export default PurchaseButton;
