import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
		},
	},
	toolbar: {
		...theme.mixins.toolbar,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	closeMenuButton: {
		marginRight: 'auto',
		marginLeft: 0,
	},
	drawerList: {
		borderTop: '1px solid rgba(0,0,0,0.3)',
	},
	userProfile: {
		textAlign: 'center',
		fontSize: '15px',
		marginTop: '18px',
		fontFamily: 'Segoe UI',
		cursor: 'pointer',
	},
	userName: {
		marginTop: '6px',
		marginBottom: '1px',
		fontWeight: 400,
		fontSize: 14,
	},
	userMail: {
		marginTop: '1px',
		marginBottom: '18px',
		fontWeight: 400,
		fontSize: 14,
	},
}));

export default useStyles;
