import i18next from 'i18next';
import pl from './navigation-i18n/pl';
import en from './navigation-i18n/en';

i18next.addResourceBundle('pl', 'navigation', pl);
i18next.addResourceBundle('en', 'navigation', en);

const navigationConfig = [
	{
		id: 'applications',
		title: 'Applications',
		translate: 'APPLICATIONS',
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'example-component',
				title: 'Example',
				translate: 'EXAMPLE',
				type: 'item',
				icon: 'whatshot',
				url: '/example'
			},
			{
				id: 'profile-component',
				title: 'Profile',
				translate: 'PROFILE',
				type: 'item',
				icon: 'person',
				url: '/profile'
			}
		]
	}
];

export default navigationConfig;
