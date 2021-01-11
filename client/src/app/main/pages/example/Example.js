import DemoContent from '@fuse/core/DemoContent';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
	layoutRoot: {}
}));

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
