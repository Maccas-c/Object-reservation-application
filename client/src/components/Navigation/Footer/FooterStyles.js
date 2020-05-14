import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		zIndex: theme.zIndex.drawer + 1,
		height: '50px',
		display: 'flex',
		position: 'flex',
		marginTop: 'calc(100vh - 50px)',
		bottom: 'auto',
	},
}));

export default useStyles;
