import FusePageCarded from '@fuse/core/FusePageCarded';
import React from 'react';
import BasketTable from './BasketTable';
import BasketHeader from './BasketHeader';

function Basket() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<BasketHeader />}
			content={<BasketTable />}
			innerScroll
		/>
	);
}

export default Basket;
