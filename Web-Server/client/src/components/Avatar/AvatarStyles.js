import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
	root: {
		position: 'absolute',
		display: 'flex',
		zIndex: theme.zIndex.drawer + 1,
		'& > *': {
			margin: theme.spacing(4),
		},
	},

	purple: {
		color: theme.palette.getContrastText(deepOrange[500]),
		backgroundColor: deepOrange[900],
		marginRight: '20px',
		margin: 'auto',
	},
	h1: {
		fontSize: '16px',
	},
}));

export default useStyles;
