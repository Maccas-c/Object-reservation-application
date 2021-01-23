/* eslint-disable camelcase */
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import { makeStyles, useTheme, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useConstructor } from '../../../../utils/customHooks';
import { fetchPriceList } from '../../../../store/actions/priceList';

const theme = createMuiTheme({
	palette: {
		secondary: {
			main: '#7690a8'
		}
	}
});

const useStyles = makeStyles(theme => ({
	header: {
		background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
		color: theme.palette.getContrastText(theme.palette.primary.main)
	},
	headerIcon: {
		position: 'absolute',
		top: -64,
		left: 0,
		opacity: 0.04,
		fontSize: 512,
		width: 512,
		height: 512,
		pointerEvents: 'none'
	}
}));

function PriceList({ history }, props) {
	const classes = useStyles(props);
	const dispatch = useDispatch();
	const price = useSelector(({ priceListReducer: { priceList } }) => priceList);
	const theme = useTheme();

	useConstructor(() => {
		dispatch(fetchPriceList());
	});

	const handleSetCourt = () => {
		history.push('/calendar');
	};

	return (
		<div className="flex flex-col flex-auto flex-shrink-0 w-full">
			<div
				className={clsx(
					classes.header,
					'relative overflow-hidden flex flex-col flex-shrink-0 items-center justify-center text-center p-16'
				)}
			>
				<FuseAnimate animation="transition.slideUpIn" duration={400} delay={600}>
					<Typography color="inherit" className="text-24 sm:text-40 font-light">
						Cennik
					</Typography>
				</FuseAnimate>
			</div>
			<div className="flex flex-col flex-1 max-w-2xl w-full mx-auto px-8 sm:px-16 py-24">
				<FuseAnimateGroup
					enter={{
						animation: 'transition.slideUpBigIn'
					}}
					className="flex flex-wrap py-24"
				>
					{price.map(
						({ id, name, nameCourt, classes_and_sports_training, tournament_matches, university_club }) => {
							const category = {
								id: 0,
								value: 'web',
								label: 'Web',
								color: '#192D3E'
							};
							return (
								<div className="w-full h-auto pb-24 sm:w-1/2 lg:w-9/20 sm:p-16" key={id}>
									<Card className="flex  flex-col h-256 rounded-8 shadow">
										<div
											className="flex flex-shrink-0 items-center justify-between px-24 h-64"
											style={{
												background: category.color,
												color: theme.palette.getContrastText(category.color)
											}}
										>
											<div
												className="text-13 whitespace-nowrap opacity-75"
												style={{ color: 'rgb(255, 255, 255)' }}
											>
												{name}
											</div>
											<div className="flex items-center justify-center opacity-75">
												<Icon className="text-15 mx-8" color="inherit">
													access_time
												</Icon>
												<div className="text-13 whitespace-nowrap">90 min</div>
											</div>
										</div>
										<CardContent
											style={{
												justifyContent: 'space-between',
												flexWrap: 'wrap',
												paddingLeft: 0,
												paddingRight: 0
											}}
											className="flex flex-col flex-auto items-center justify-center"
										>
											<CardContent
												style={{
													flexWrap: 'wrap',
													paddingLeft: 0,
													paddingRight: 0,
													paddingBottom: 0
												}}
												className="flex flex col flex-auto items-center justify-center"
											>
												<span
													key={id}
													className="text-center text-15 font-800"
													color="textSecondary"
												>
													Zajęcia rekreacyjno-sportowe, treningi:{' '}
													{classes_and_sports_training} zł
												</span>
											</CardContent>
											<CardContent
												style={{
													flexWrap: 'wrap',
													paddingLeft: 0,
													paddingRight: 0,
													paddingBottom: 0
												}}
												className="flex flex col flex-auto items-center justify-center"
											>
												<span
													key={id}
													className="text-center text-15 font-800"
													color="textSecondary"
												>
													Mecze, turnieje: {tournament_matches} zł
												</span>
											</CardContent>
											<CardContent
												style={{
													flexWrap: 'wrap',
													paddingLeft: 0,
													paddingRight: 0,
													paddingBottom: 0
												}}
												className="flex flex col flex-auto items-center justify-center"
											>
												<span
													key={id}
													className="text-center text-15 font-800"
													color="textSecondary"
												>
													Uczelniany Klub AZS UAM: {university_club} zł
												</span>
											</CardContent>
										</CardContent>
										<Divider />
										<CardActions className="justify-center">
											<Button
												onClick={() => {
													handleSetCourt();
												}}
												color="#42698c"
											>
												Przejdź do kalendarza
											</Button>
										</CardActions>
										<MuiThemeProvider theme={theme}>
											<LinearProgress className="w-full" variant="determinate" value={100} />
										</MuiThemeProvider>
									</Card>
								</div>
							);
						}
					)}
				</FuseAnimateGroup>
			</div>
		</div>
	);
}

export default withRouter(PriceList);
