import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FuseAnimate from '@fuse/core/FuseAnimate/FuseAnimate';
import { Button } from '@material-ui/core';
import BasketTableHead from './BasketTableHead';

function BasketTable(props) {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState([]);
	const [data, setData] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

	function handleClick(item) {
		props.history.push(`/apps/e-commerce/products/${item.id}/${item.handle}`);
	}

	function handleChangePage(event, value) {
		setPage(value);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
	}

	if (!data.length === 0) {
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
					<BasketTableHead selectedProductIds={selected} order={order} rowCount={data.length} />

					<TableBody>
						{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map(n => {
								return (
									<TableRow
										className="h-64 cursor-pointer"
										hover
										role="checkbox"
										tabIndex={-1}
										key={n.id}
										// onClick={event => handleClick(n)}
									>
										<TableCell
											className="w-52 px-4 md:px-0"
											component="th"
											scope="row"
											padding="none"
										>
											{/* {n.images.length > 0 && n.featuredImageId ? ( */}
											{/*	<img */}
											{/*		className="w-full block rounded" */}
											{/*		src={_.find(n.images, { id: n.featuredImageId }).url} */}
											{/*		alt={n.name} */}
											{/*	/> */}
											{/* ) : ( */}
											{/*	<img */}
											{/*		className="w-full block rounded" */}
											{/*		src="assets/images/ecommerce/product-image-placeholder.png" */}
											{/*		alt={n.name} */}
											{/*	/> */}
											{/* )} */}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											n.name
										</TableCell>

										<TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
											{('n.categories.join(', ')')}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
											<span>$</span>
											n.priceTaxIncl
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
											n.quantity
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
											<Icon className="text-red text-20">delete</Icon>
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</FuseScrollbars>
			<Button color="success" variant="contained">
				Zapłać
			</Button>
		</div>
	);
}

export default withRouter(BasketTable);
