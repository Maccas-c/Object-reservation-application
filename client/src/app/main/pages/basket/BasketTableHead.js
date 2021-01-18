import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';

const rows = [
	{
		id: 'image',
		align: 'left',
		disablePadding: true,
		label: '',
		sort: false
	},
	{
		id: 'name',
		align: 'left',
		disablePadding: false,
		label: 'Data',
		sort: true
	},
	{
		id: 'categories',
		align: 'left',
		disablePadding: false,
		label: 'Godzina',
		sort: true
	},
	{
		id: 'priceTaxIncl',
		align: 'right',
		disablePadding: false,
		label: 'Cena',
		sort: true
	},
	{
		id: 'quantity',
		align: 'right',
		disablePadding: false,
		label: 'Nie wiem',
		sort: true
	},
	{
		id: 'active',
		align: 'right',
		disablePadding: false,
		label: 'Usuń',
		sort: true
	}
];

const useStyles = makeStyles(theme => ({
	actionsButtonWrapper: {
		background: theme.palette.background.paper
	}
}));

function BasketTableHead(props) {
	const classes = useStyles(props);

	return (
		<TableHead>
			<TableRow className="h-64">
				{rows.map(row => {
					return (
						<TableCell
							className="p-4 md:p-16"
							key={row.id}
							align={row.align}
							padding={row.disablePadding ? 'none' : 'default'}
							sortDirection={props.order.id === row.id ? props.order.direction : false}
						>
							{row.sort && (
								<Tooltip
									title="Sort"
									placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
									enterDelay={300}
								>
									<TableSortLabel
										active={props.order.id === row.id}
										direction={props.order.direction}
									>
										{row.label}
									</TableSortLabel>
								</Tooltip>
							)}
						</TableCell>
					);
				}, this)}
			</TableRow>
		</TableHead>
	);
}

export default BasketTableHead;
