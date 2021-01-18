import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';

function BasketHeader() {
	const dispatch = useDispatch();
	const mainTheme = useSelector(selectMainTheme);

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Icon className="text-32">shopping_basket</Icon>
				</FuseAnimate>
			</div>

			<div className="flex flex-1 items-center justify-center px-12">
				<ThemeProvider theme={mainTheme}>
					<FuseAnimate duration={400} delay={600}>
						<Typography
							variant="subtitle1"
							color="inherit"
							className="text-xl mt-8 sm:mt-1 mx-auto max-w-512"
						>
							<span className="opacity-75">Do zapłaty: 999pln</span>
						</Typography>
					</FuseAnimate>
				</ThemeProvider>
			</div>
		</div>
	);
}

export default BasketHeader;
