import React from 'react';

import { Link } from 'react-router-dom';

import FuseAnimate from '@fuse/core/FuseAnimate';
import Typography from '@material-ui/core/Typography';

const NotFound = () => (
	<div className="flex flex-col flex-1 items-center justify-center p-16">
		<div className="max-w-512 text-center">
			<FuseAnimate animation="transition.expandIn" delay={100}>
				<Typography variant="h1" color="inherit" className="font-medium mb-16">
					Błąd 404
				</Typography>
			</FuseAnimate>

			<FuseAnimate delay={500}>
				<Typography variant="h5" color="textSecondary" className="mb-16">
					Przepraszamy, nie ma tutaj takiej strony.
				</Typography>
			</FuseAnimate>

			<Link className="font-medium" to="/">
				Wróć do strony głównej
			</Link>
		</div>
	</div>
);

export default NotFound;
