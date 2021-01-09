import FuseAnimate from '@fuse/core/FuseAnimate';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginPanelUSOS from './tabs/LoginPanelUSOS';
import LoginPanel from './tabs/LoginPanel';

const useStyles = makeStyles(theme => ({
	root: {
		background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		color: theme.palette.primary.contrastText
	},
	leftSection: {},
	rightSection: {
		background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		color: theme.palette.primary.contrastText
	}
}));

function Login() {
	const classes = useStyles();
	const [selectedTab, setSelectedTab] = useState(0);

	function handleTabChange(event, value) {
		setSelectedTab(value);
	}

	return (
		<div
			className={clsx(
				classes.root,
				'flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24'
			)}
		>
			<FuseAnimate animation="transition.expandIn">
				<div className="flex w-full max-w-400 md:max-w-3xl rounded-12 shadow-2xl overflow-hidden">
					<Card
						className={clsx(
							classes.leftSection,
							'flex flex-col w-full max-w-sm items-center justify-center shadow-0'
						)}
						square
					>
						<CardContent className="flex flex-col items-center justify-center w-full py-96 max-w-320">
							<FuseAnimate delay={300}>
								<div className="flex items-center mb-32">
									<img className="logo-icon w-48" src="assets/images/logos/logo.svg" alt="logo" />
									<div className="border-l-1 mr-4 w-1 h-40" />
									<div>
										<Typography className="text-24 font-800 logo-text" color="inherit">
											Devcourt
										</Typography>
										<Typography
											className="text-16 tracking-widest -mt-8 font-700"
											color="textSecondary"
										>
											System rezerwacji
										</Typography>
									</div>
								</div>
							</FuseAnimate>

							<Tabs
								value={selectedTab}
								onChange={handleTabChange}
								variant="fullWidth"
								className="w-full mb-32"
							>
								<Tab
									icon={<img className="h-40" src="assets/images/logos/app.svg" alt="aplikacja" />}
									className="min-w-0"
									label="Aplikacja"
								/>
								<Tab
									icon={<img className="h-40" src="assets/images/logos/usos.svg" alt="usos" />}
									className="min-w-0"
									label="USOS"
								/>
							</Tabs>

							{selectedTab === 0 && <LoginPanel />}
							{selectedTab === 1 && <LoginPanelUSOS />}
						</CardContent>

						<div className="flex flex-col items-center justify-center pb-32">
							<div>
								<span className="font-medium mr-8">Nie masz konta?</span>
								<Link className="font-medium" to="/register">
									Zarejestruj
								</Link>
							</div>
							<Link className="font-medium mt-8" to="/">
								Wróć do strony głównej
							</Link>
						</div>
					</Card>

					<div
						className={clsx(classes.rightSection, 'hidden md:flex flex-1 items-center justify-center p-64')}
					>
						<div className="max-w-320">
							<FuseAnimate animation="transition.slideUpIn" delay={400}>
								<Typography variant="h3" color="inherit" className="font-800 leading-tight">
									Witamy <br />
									w systemie rezerwacji <br /> Devcourt!
								</Typography>
							</FuseAnimate>

							<FuseAnimate delay={500}>
								<Typography variant="subtitle1" color="inherit" className="mt-32">
									Aplikacja umożliwiająca szybką rezerwację wybranych sektorów oraz natychmiastową
									płatność. Zapewniamy integrację z kontami USOS, interaktywny kalendarz i wiele
									więcej!
								</Typography>
							</FuseAnimate>
						</div>
					</div>
				</div>
			</FuseAnimate>
		</div>
	);
}

export default Login;
