import i18next from 'i18next';
import pl from './navigation-i18n/pl';
import en from './navigation-i18n/en';

i18next.addResourceBundle('pl', 'navigation', pl);
i18next.addResourceBundle('en', 'navigation', en);

const navigationConfig = [
	{
		id: 'menu',
		title: 'Menu',
		translate: 'MENU',
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'home-component',
				title: 'Home',
				translate: 'HOME',
				type: 'item',
				icon: 'web',
				url: '/home'
			},
			{
				id: 'profile-component',
				title: 'Profile',
				translate: 'PROFILE',
				type: 'item',
				icon: 'person',
				url: '/profile'
			},
			{
				id: 'calendar-component',
				title: 'Calendar',
				translate: 'CALENDAR',
				type: 'item',
				icon: 'date_range',
				url: '/calendar'
			},
			{
				id: 'userListReservation-component',
				title: 'Historia rezerwacji',
				translate: 'RESERVATION',
				type: 'item',
				icon: 'list',
				url: '/reservation'
			}
		]
	}
];

export default navigationConfig;
