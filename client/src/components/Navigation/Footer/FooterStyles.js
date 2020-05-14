import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		zIndex: theme.zIndex.drawer + 1,

		height: 'auto',
		position: 'sticky',
		marginTop: theme.spacing(27),
		bottom: 0,
	},
}));

export default useStyles;
