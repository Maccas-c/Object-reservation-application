import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FuseAnimate from '@fuse/core/FuseAnimate/FuseAnimate';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import BasketTableHead from './BasketTableHead';
import PayConfirm from '../payConfirm/payConfirm';
import { deleteReservation, getPayuToken } from '../../../../store/actions/payment';

function BasketTable() {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const price = useSelector(({ auth: { user } }) => user.sumPrice);
	const userName = useSelector(({ auth: { user } }) => user.name);
	const basketUser = useSelector(
		({
			auth: {
				user: { reservations }
			}
		}) => reservations
	);
	const handleOpenDialog = () => {
		setOpen(true);
		dispatch(getPayuToken(userName, basketUser, price));
	};

	const handleCloseDialog = () => {
		setOpen(false);
	};

	const handleDeleteReservation = id => {
		dispatch(deleteReservation(id));
	};
	if (basketUser.length === 0) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						Koszyk jest pusty!
					</Typography>
				</div>
			</FuseAnimate>
		);
	}

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
					<BasketTableHead />
					<TableBody>
						{basketUser.map(({ dayString, end, title, nameCourt, price: prices, _id }, index) => {
							return (
								<TableRow className="h-64" hover tabIndex={-1} key={index}>
									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{dayString}
									</TableCell>

									<TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
										{title}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{prices} <span>zł</span>
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{nameCourt}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
										<IconButton
											onClick={() => {
												handleDeleteReservation(_id);
											}}
										>
											<Icon className="text-red text-20">delete</Icon>
										</IconButton>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</FuseScrollbars>
			<Button
				onClick={() => {
					handleOpenDialog();
				}}
				color="inherit"
				variant="contained"
			>
				Zapłać
			</Button>
			<PayConfirm price={price} reservations={basketUser} open={open} handleClose={handleCloseDialog} />
		</div>
	);
}

export default withRouter(BasketTable);
