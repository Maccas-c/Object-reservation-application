import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  main: {
    margin: '4px 0 10px 0 !important',
  },
  betweenTable: {
    marginTop: '30px',
  },
  buttonsContainer: {
    float: 'right',
  },
  buttonCancel: {
    marginRight: '10px',
  },
  title: {
    fontWeight: 700,
    display: 'flex',
    marginLeft: '20px',
  },
}));

export default useStyles;
