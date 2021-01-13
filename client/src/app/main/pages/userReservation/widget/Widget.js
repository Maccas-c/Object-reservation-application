import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import React from 'react';

function Widget({ reservations }) {
	return (
		<Paper className="w-full rounded-8 shadow">
			<div className="flex items-center justify-between px-16 h-64 border-b-1">
				<Typography className="text-16">Lista Rezerwacji</Typography>
				<Typography className="text-11 font-500 rounded-4 text-white bg-blue px-8 py-4">
					{reservations.length} rezerwacji
				</Typography>
			</div>
			<div className="table-responsive">
				<Table className="w-full min-w-full" size="small">
					<TableHead>
						<TableRow>
							<TableCell className="whitespace-nowrap">Data</TableCell>
							<TableCell className="whitespace-nowrap">Godzina rozpoczęcia</TableCell>
							<TableCell className="whitespace-nowrap">Strefa</TableCell>
							<TableCell className="whitespace-nowrap">Faktura Vat</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{reservations
							? reservations.map(({ _id, start_time, hour, courtId, vat }) => (
									<TableRow key={_id} {...{ hover: true }}>
										<TableCell {...{ align: 'left' }}>{start_time}</TableCell>
										<TableCell {...{ align: 'left' }}>{hour}</TableCell>
										<TableCell {...{ align: 'left' }}>{courtId.toUpperCase()}</TableCell>
										<TableCell {...{ align: 'left' }}>{vat.toString()}</TableCell>
									</TableRow>
							  ))
							: 'Ładowanie...'}
					</TableBody>
				</Table>
			</div>
		</Paper>
	);
}

export default React.memo(Widget);
