import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 1,
    width: 'auto',
    height: '50px',
    position: 'sticky',
    marginTop: 'calc(100vh - 50px)',
    bottom: 0
  }
}));

export default useStyles;
