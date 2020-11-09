import {makeStyles} from '@material-ui/core/styles';
import {green} from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    title: {
        marginLeft: '30%'
    },
    margin: {
        margin: 5
    },
    court: {height: '70vh',
        width: '28vh',
        backgroundColor: green[800]},
    button:{
        marginLeft:'85%'
    },
    buttonDelete:{
        marginLeft:'24%',
        marginTop:'65vh'
    }
}));
export default useStyles;
