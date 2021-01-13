import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import FuseAnimate from '@fuse/core/FuseAnimate/FuseAnimate';
import UserListTableHead from './UserListTableHead';

function UserListTable({ reservations }) {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	function handleChangePage(event, value) {
		setPage(value);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
	}

	if (reservations.length === 0) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						Nie masz jeszcze żadnych rezerwacji!
					</Typography>
				</div>
			</FuseAnimate>
		);
	}

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
					<UserListTableHead reservations={reservations} />

					<TableBody>
						{reservations ? (
							reservations
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map(({ _id, courtId, hour, start_time: startTime }) => {
									return (
										<TableRow className="h-64" hover role="checkbox" tabIndex={-1} key={_id}>
											<TableCell padding="10" className="p-4 md:p-16" component="th" scope="row">
												{startTime}
											</TableCell>

											<TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
												{hour}
											</TableCell>

											<TableCell
												padding="10"
												className="p-4 md:p-16"
												component="th"
												scope="row"
												align="right"
											>
												{courtId}
											</TableCell>
										</TableRow>
									);
								})
						) : (
							<FuseLoading />
						)}
					</TableBody>
				</Table>
			</FuseScrollbars>

			<TablePagination
				className="flex-shrink-0 border-t-1"
				component="div"
				count={reservations.length}
				rowsPerPage={rowsPerPage}
				labelRowsPerPage="Liczba wierszy:"
				page={page}
				backIconButtonText="Poprzednia strona"
				nextIconButtonText="Następna strona"
				backIconButtonProps={{
					'aria-label': 'Poprzednia strona'
				}}
				nextIconButtonProps={{
					'aria-label': 'Następna strona'
				}}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</div>
	);
}

export default withRouter(UserListTable);
