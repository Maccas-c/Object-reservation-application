import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		position: 'absolute',
		top: '5px',
		right: '15px',
		display: 'flex',
		zIndex: theme.zIndex.drawer + 1,
		'& > *': {
			margin: theme.spacing(4),
		},
	},

	purple: {
		marginRight: '20px',
		margin: 'auto',
	},
}));

export default useStyles;
