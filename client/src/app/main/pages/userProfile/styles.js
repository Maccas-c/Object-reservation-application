import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';

export const options = {
	width: '100px',
	border: true,
	borderColor: '#2e2e2e',
	baseColor: '#ffffff',
	centerColor: '#101E2A',
	centerBorderColor: '#fff',
	handColors: {
		second: '#101E2A',
		minute: '#101E2A',
		hour: '#101E2A'
	}
};
const useStyles = makeStyles(theme => ({
	root: {
		background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`,
		color: theme.palette.primary.contrastText
	}
}));
export default useStyles;
