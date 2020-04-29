import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 1,
    position: 'absolute',
    marginLeft: '40%',
    bottom: '40px',
    width: 400
  }
}));

export default useStyles;
