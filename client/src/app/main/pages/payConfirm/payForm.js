import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { createPayment } from '../../../../store/actions/payment';
function PayForm({ onClose, reservations, price }) {
	const dispatch = useDispatch();

	const link = useSelector(state => state.paymentReducer.link);
	const token = useSelector(state => state.paymentReducer.token);
	const name = useSelector(state => state.auth.user._id);
	const handleSendPay = () => {
		dispatch(createPayment(token, name, reservations, price));
	};
	return (
		<div className="flex flex-col w-full">
			<FuseScrollbars className="flex flex-auto w-full max-h-640">
				<div className="w-full">
					<div className="relative">
						<Fab
							className="absolute right-0 bottom-0 m-8"
							variant="extended"
							size="small"
							color="secondary"
							aria-label="Delete Image"
						>
							<Icon fontSize="small">delete</Icon>
						</Fab>
					</div>
					<div style={{ display: 'flex', justifyContent: 'space-between' }} className="p-16 pb-12">
						<Typography>Podsumowanie</Typography>
						<Typography className="text-11 font-500 rounded-4 text-white bg-blue px-8 py-4">
							{reservations.length}{' '}
							{reservations.length === 1
								? 'rezerwacja'
								: reservations.length === 2 || reservations.length === 3 || reservations.length === 4
								? 'rezerwacje'
								: 'rezerwacji'}
						</Typography>
					</div>
					<div className="p-16 pb-12">
						<Typography>Do zapłaty: {price} zł</Typography>
					</div>
				</div>
			</FuseScrollbars>

			<div className="flex flex-auto justify-between items-center h-48">
				<div className="flex items-center px-4" />
				<div className="flex items-center px-4">
					<Button className="m-4" onClick={() => handleSendPay()} variant="outlined" size="small">
						Zapłać
					</Button>
					<Button className="m-4" onClick={onClose} variant="outlined" size="small">
						Anuluj
					</Button>
				</div>
			</div>
		</div>
	);
}

PayForm.propTypes = {};
PayForm.defaultProps = {
	variant: 'edit',
	note: null
};

export default withRouter(PayForm);
