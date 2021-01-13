import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';

const UserListTableHead = () => {
	return (
		<TableHead>
			<TableRow className="h-64">
				<TableCell className="p-4 md:p-16" align="left" padding="10">
					Data
				</TableCell>
				<TableCell className="p-4 md:p-16" align="left">
					Godzina rozpoczęcia
				</TableCell>
				<TableCell className="p-4 md:p-16" align="right" padding="10">
					Strefa
				</TableCell>
			</TableRow>
		</TableHead>
	);
};

export default UserListTableHead;
