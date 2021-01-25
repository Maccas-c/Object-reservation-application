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
import { fetchCourt } from '../../../../store/actions/courts';
import { getDay } from './utils/utils';

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

function Home({ history }, props) {
	const classes = useStyles(props);
	const dispatch = useDispatch();
	const court = useSelector(state => state.courtReducer.court);
	const theme = useTheme();
	const isFirstLogin = useSelector(({ auth: { user } }) => user.firstLogin);

	useConstructor(() => {
		if (isFirstLogin) history.push('/prepare');
		dispatch(fetchCourt());
	});

	const handlePushCalendar = () => {
		history.push('/calendar');
	};
	const handlePushPriceList = () => {
		history.push('/priceList');
	};

	return (
		<div className="flex flex-col flex-auto flex-shrink-0 w-full">
			<div
				className={clsx(
					classes.header,
					'relative overflow-hidden flex flex-col flex-shrink-0 items-center justify-center text-center p-16'
				)}
			>
				<FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
					<Typography color="inherit" className="text-24 sm:text-40 font-light">
						Witamy w Devcourt
					</Typography>
				</FuseAnimate>
				<FuseAnimate duration={400} delay={600}>
					<Typography variant="subtitle1" color="inherit" className="mt-8 sm:mt-1 mx-auto max-w-512">
						<span className="opacity-75">Umożliwiamy rezerwację sektorów boiska UAM</span>
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
					{court.map(({ date, description, _id, nameCourt, sessionTime }) => {
						const category = {
							id: 0,
							value: 'web',
							label: 'Web',
							color: '#192D3E'
						};
						return (
							<div className="w-full h-auto pb-24 sm:w-1/2 lg:w-9/20 sm:p-16" key={_id}>
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
											{nameCourt} - {description}
										</div>
										<div className="flex items-center justify-center opacity-75">
											<Icon className="text-15 mx-8" color="inherit">
												access_time
											</Icon>
											<div className="text-13 whitespace-nowrap">{sessionTime} min</div>
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
										<Typography
											className="text-center text-13 font-500"
											color="textSecondary"
											style={{ paddingTop: '15px' }}
										>
											Sektor jest możliwy do rozerwacji w dniach:
										</Typography>
										<CardContent
											style={{ flexWrap: 'wrap', paddingLeft: 0, paddingRight: 0 }}
											className="flex flex col flex-auto items-center justify-center"
										>
											{date.map(({ _id: id, nameOfDay, value }) => {
												return (
													<div>
														<span
															key={id}
															className="text-center text-13 font-500"
															color="textSecondary"
															style={{ padding: '4' }}
														>
															{`${getDay(nameOfDay)}`}
															{}
														</span>
														{value ? (
															<Icon className="text-green text-15">check_circle</Icon>
														) : (
															<Icon className="text-red text-15">remove_circle</Icon>
														)}
													</div>
												);
											})}
										</CardContent>
									</CardContent>
									<Divider />
									<CardActions className="justify-center">
										<Button
											onClick={() => {
												handlePushPriceList();
											}}
											color="#42698c"
										>
											Cennik
										</Button>
										<Button
											onClick={() => {
												handlePushCalendar();
											}}
											color="#42698c"
										>
											Kalendarz
										</Button>
									</CardActions>
									<MuiThemeProvider theme={theme}>
										<LinearProgress className="w-full" variant="determinate" />
									</MuiThemeProvider>
								</Card>
							</div>
						);
					})}
				</FuseAnimateGroup>
			</div>
		</div>
	);
}

export default withRouter(Home);
