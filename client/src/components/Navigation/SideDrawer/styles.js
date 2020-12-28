import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
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
  userProfile: {
    textAlign: 'center',
    fontSize: '15px',
    marginTop: '18px',
    fontFamily: 'Roboto',
    cursor: 'pointer',
  },
  userName: {
    fontFamily: 'Roboto',
    marginTop: '6px',
    marginBottom: '1px',
    fontWeight: 400,
    fontSize: 14,
  },
  userMail: {
    fontFamily: 'Roboto',
    marginTop: '1px',
    marginBottom: '18px',
    fontWeight: 400,
    fontSize: 14,
  },
}));

export default useStyles;
