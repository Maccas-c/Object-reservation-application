import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import React from 'react';
import PayForm from './payForm';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

function PayConfirm({ open, handleClose, reservations, price }) {
	return (
		<Dialog
			classes={{
				paper: 'w-full  m-24 rounded-8'
			}}
			TransitionComponent={Transition}
			onClose={handleClose}
			open={open}
		>
			<PayForm price={price} reservations={reservations} onClose={handleClose} />
		</Dialog>
	);
}

export default PayConfirm;
