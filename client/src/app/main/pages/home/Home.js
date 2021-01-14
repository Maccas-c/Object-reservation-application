import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { useConstructor } from '../../../../utils/customHooks';
import { fetchCourt, setCourt } from '../../../../store/actions/courts';

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
	useConstructor(() => {
		dispatch(fetchCourt());
	});

	const handleSetCourt = sector => {
		dispatch(setCourt(sector));
		history.push('/calendar');
	};

	return (
		<div className="flex flex-col flex-auto flex-shrink-0 w-full">
			<div
				className={clsx(
					classes.header,
					'relative overflow-hidden flex flex-col flex-shrink-0 items-center justify-center text-center p-16 sm:p-24 h-200 sm:h-288'
				)}
			>
				<FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
					<Typography color="inherit" className="text-24 sm:text-40 font-light">
						Witamy w serwsie DevCourt
					</Typography>
				</FuseAnimate>
				<FuseAnimate duration={400} delay={600}>
					<Typography variant="subtitle1" color="inherit" className="mt-8 sm:mt-16 mx-auto max-w-512">
						<span className="opacity-75">Nasz serwis umożliwia rezerwacji boiska sportowego!</span>
					</Typography>
				</FuseAnimate>
				<Icon className={classes.headerIcon}> school </Icon>
			</div>
			<div className="flex flex-col flex-1 max-w-2xl w-full mx-auto px-8 sm:px-16 py-24">
				<FuseAnimateGroup
					enter={{
						animation: 'transition.slideUpBigIn'
					}}
					className="flex flex-wrap py-24"
				>
					{court.map(({ date, description, id, nameCourt, sessionTime }) => {
						return (
							<div className="w-full pb-24 sm:w-1/2 lg:w-1/3 sm:p-16" key={id}>
								<Card className="flex flex-col h-256 rounded-8 shadow">
									<div className="flex flex-shrink-0 items-center justify-between px-24 h-64">
										<Typography className="font-medium truncate" color="inherit" />
										<div className="flex items-center justify-center opacity-75">
											<Icon className="text-20 mx-8" color="inherit">
												access_time
											</Icon>
											<div className="text-16 whitespace-nowrap">{sessionTime} min</div>
										</div>
									</div>
									<CardContent className="flex flex-col flex-auto items-center justify-center">
										<Typography className="text-center text-16 font-400">{nameCourt}</Typography>
										<Typography className="text-center text-13 font-600 mt-4" color="textSecondary">
											{description}
										</Typography>
										<CardContent className="flex row flex-auto items-center justify-center">
											{date.map(({ _id, nameOfDay }) => {
												return (
													<span
														key={_id}
														className="text-center text-13 font-600 mt-4"
														color="textSecondary"
													>
														{nameOfDay}
													</span>
												);
											})}
										</CardContent>
									</CardContent>
									<Divider />
									<CardActions className="justify-center">
										<Button
											onClick={() => {
												handleSetCourt(nameCourt);
											}}
											className="justify-start px-32"
											color="secondary"
										>
											Rezerwuj!
										</Button>
									</CardActions>
									<LinearProgress className="w-full" variant="determinate" color="secondary" />
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
