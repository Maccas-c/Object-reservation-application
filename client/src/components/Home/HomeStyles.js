import { makeStyles } from '@material-ui/core/styles';
import Image_phone from '../../assets/court/Boisko_phone.png';
import Image_main from '../../assets/court/Boisko_desktop.png';
import Image_tablet from '../../assets/court/Boisko_tablet.png';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: theme.spacing(100),
        height: theme.spacing(55),
        marginLeft: '15%',
        marginTop: '5%',
        backgroundImage: `url(${Image_main})`,
    },
    main: {
        display: 'flex',
        width: theme.spacing(40),
        height: theme.spacing(78),
        marginTop: '10%',

        backgroundImage: `url(${Image_phone})`,
    },
    tablet: {
        display: 'flex',
        width: theme.spacing(40),
        height: theme.spacing(78),
        marginTop: '5%',
        backgroundImage: `url(${Image_tablet})`,
    },
}));
export default useStyles;
