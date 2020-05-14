import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import {
	Drawer,
	Hidden,
	List,
	ListItem,
	ListItemText,
} from '@material-ui/core';

import Avatar from '../../../assets/avatar/avatarMale.png';
import Header from '../Header/Header';
import { MENU_ITEMS } from '../../../constansts/menuList/menuItems';
import { MENU_ROUTES } from '../../../constansts/routes/routes';
import Footer from '../Footer/Footer';
import makeStyles from './SideDrawerStyles';

const SideDrawer = (props) => {
	const classes = makeStyles();
	const [mobileOpen, setMobileOpen] = useState(false);
	const {
		location: { pathname },
	} = props;
	const menuList = Object.values(MENU_ITEMS);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const getKeyByValue = (object, value) => {
		return Object.keys(object).find((key) => object[key] === value);
	};

	const userRoute = () => {
		props.history.push(MENU_ROUTES.USER_PROFILE);
	};

	let menu = null;
	let sideDrawer = null;

	if (props.isLoggedIn) {
		menu = (
			<div className={classes.drawerList}>
				<List>
					{menuList.map((menuitem) => {
						const key = getKeyByValue(MENU_ITEMS, menuitem);
						return (
							<ListItem
								button
								component={Link}
								to={MENU_ROUTES[key]}
								selected={MENU_ROUTES[key] === pathname}
								key={menuitem}
							>
								<ListItemText primary={menuitem} />
							</ListItem>
						);
					})}
				</List>
			</div>
		);
		sideDrawer = (
			<nav className={classes.drawer}>
				<Hidden smUp>
					<Drawer
						variant='temporary'
						open={mobileOpen}
						onClose={handleDrawerToggle}
					>
						<div
							className={classes.userProfile}
							onClick={userRoute}
						>
							<img
								src={Avatar}
								alt='Your avatar'
								height='80'
								width='80'
							/>
							<h5 className={classes.userName}>Jan Kowalski</h5>
							<h5 className={classes.userMail}>
								example@gmail.com
							</h5>
						</div>
						{menu}
					</Drawer>
				</Hidden>
				<Hidden xsDown>
					<Drawer
						className={classes.drawer}
						variant='permanent'
						classes={{
							paper: classes.drawerPaper,
						}}
					>
						<div className={classes.toolbar} />
						<div
							className={classes.userProfile}
							onClick={userRoute}
						>
							<img
								src={Avatar}
								alt='Your avatar'
								height='80'
								width='80'
							/>
							<h5 className={classes.userName}>Jan Kowalski</h5>
							<h5 className={classes.userMail}>
								example@gmail.com
							</h5>
						</div>
						{menu}
					</Drawer>
				</Hidden>
			</nav>
		);
	}

	return (
		<div className={classes.root}>
			<CssBaseline />
			<Header
				open={handleDrawerToggle}
				isLoggedIn={props.isLoggedIn}
			></Header>

			{sideDrawer}

			<div className={classes.content}>
				<Footer />
				<div className={classes.toolbar} />
				{props.children}
			</div>
		</div>
	);
};

export default withRouter(SideDrawer);
