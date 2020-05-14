import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		zIndex: theme.zIndex.drawer + 1,
		width: '100%',
		height: '50px',
		overflow: 'auto',
		position: 'fixed',
		marginTop: 'calc(100vh - 50px)',
		paddingBottom: '60px',
	},
}));

export default useStyles;
