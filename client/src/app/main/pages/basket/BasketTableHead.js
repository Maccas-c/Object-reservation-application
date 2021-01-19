import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';

function BasketTableHead(props) {
	return (
		<TableHead>
			<TableRow className="h-64">
				<TableCell className="p-4 md:p-16" align="left" padding="10">
					Data
				</TableCell>
				<TableCell className="p-4 md:p-16" align="left">
					Godzina rozpoczęcia
				</TableCell>
				<TableCell className="p-4 md:p-16" align="left" padding="10">
					Cena
				</TableCell>
				<TableCell className="p-4 md:p-16" align="left" padding="10">
					Strefa
				</TableCell>
				<TableCell className="p-4 md:p-16" align="right" padding="10">
					Anuluj
				</TableCell>
			</TableRow>
		</TableHead>
	);
}

export default BasketTableHead;
