import FusePageSimple from '@fuse/core/FusePageSimple';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { green } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';

const useStyles = makeStyles(() => ({
	stepLabel: {
		cursor: 'pointer!important'
	},
	successFab: {
		background: `${green[500]}!important`,
		color: 'white!important'
	}
}));

function Sector(props) {
	const course = useSelector(({ academyApp }) => academyApp.course);
	const theme = useTheme();

	const classes = useStyles(props);
	const pageLayout = useRef(null);

	const activeStep = course && course.activeStep !== 0 ? course.activeStep : 1;

	return (
		<FusePageSimple
			classes={{
				content: 'flex flex-col flex-auto overflow-hidden',
				header: 'h-72 min-h-72'
			}}
			header={
				<div className="flex flex-1 items-center px-16 lg:px-24">
					<Hidden lgUp>
						<IconButton
							onClick={ev => pageLayout.current.toggleLeftSidebar()}
							aria-label="open left sidebar"
						>
							<Icon>menu</Icon>
						</IconButton>
					</Hidden>
					<IconButton to="/apps/academy/courses" component={Link}>
						<Icon>{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
					</IconButton>
					{course && <Typography className="flex-1 text-20 mx-16">{course.title}</Typography>}
				</div>
			}
			content={
				course && (
					<div className="flex flex-1 relative overflow-hidden">
						<FuseScrollbars className="w-full overflow-auto">
							<SwipeableViews className="overflow-hidden" index={activeStep - 1} enableMouseEvents>
								{course.steps.map((step, index) => (
									<div
										className="flex justify-center p-16 pb-64 sm:p-24 sm:pb-64 md:p-48 md:pb-64"
										key={step.id}
									>
										<Paper className="w-full max-w-lg rounded-8 p-16 md:p-24 shadow">
											<div
												dangerouslySetInnerHTML={{ __html: step.content }}
												dir={theme.direction}
											/>
										</Paper>
									</div>
								))}
							</SwipeableViews>
						</FuseScrollbars>

						<div className="flex justify-center w-full absolute left-0 right-0 bottom-0 pb-16 md:pb-32">
							<div className="flex justify-between w-full max-w-xl px-8">
								<div>
									{activeStep !== 1 && (
										<Fab className="" color="secondary">
											<Icon>{theme.direction === 'ltr' ? 'chevron_left' : 'chevron_right'}</Icon>
										</Fab>
									)}
								</div>
								<div>
									{activeStep < course.steps.length ? (
										<Fab className="" color="secondary">
											<Icon>{theme.direction === 'ltr' ? 'chevron_right' : 'chevron_left'}</Icon>
										</Fab>
									) : (
										<Fab className={classes.successFab} to="/apps/academy/courses" component={Link}>
											<Icon>check</Icon>
										</Fab>
									)}
								</div>
							</div>
						</div>
					</div>
				)
			}
			leftSidebarContent={
				course && (
					<Stepper classes={{ root: 'bg-transparent' }} activeStep={activeStep - 1} orientation="vertical">
						{course.steps.map((step, index) => {
							return (
								<Step key={step.id}>
									<StepLabel classes={{ root: classes.stepLabel }}>{step.title}</StepLabel>
								</Step>
							);
						})}
					</Stepper>
				)
			}
			innerScroll
			ref={pageLayout}
		/>
	);
}

export default Sector;
