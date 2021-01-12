import DemoContent from '@fuse/core/DemoContent';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
	layoutRoot: {}
}));

// <div className={clsx(classes.seller, 'flex items-center p-16')}>
// 	<img className="w-80" src="assets/images/logos/fuse.svg" alt="logo" />
//
// 	<div className={clsx(classes.divider, 'w-px mx-8 h-96 opacity-50')} />
//
// 	<div className="px-8">
// 		<Typography color="inherit">'invoice.from.title'</Typography>
//
// 		<Typography color="inherit">'invoice.from.address'</Typography>
// 		<Typography color="inherit">'invoice.from.phone'</Typography>
// 		<Typography color="inherit">'invoice.from.email'</Typography>
// 		<Typography color="inherit">'invoice.from.website'</Typography>
// 	</div>
// </div>
function ExamplePage(props) {
	const classes = useStyles(props);

	return (
		<FusePageCarded
			classes={{
				root: classes.layoutRoot
			}}
			header={
				<div className="p-24">
					<h4>Tytuł</h4>
				</div>
			}
			content={
				<div className="p-24">
					<h4>Treść</h4>
					<br />
					<DemoContent />
				</div>
			}
		/>
	);
}

export default ExamplePage;
