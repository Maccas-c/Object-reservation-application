import React, {useEffect} from 'react'
import useStyles from "../ListReservationUser/ListReservationUserStyles";
import {useDispatch, useSelector} from "react-redux";
import * as userActions from "../../store/actions";
import {MENU_ROUTES} from "../../constants/routes/routes";
import Spinner from "../UI/Spinner/Spinner";
import {
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,

} from "@material-ui/core";
import {TABLE_ROWS} from "../../constants/usersList/usersList";

const ListReservationUser = () => {
    const classes = useStyles();
    const users = useSelector((state) => state.usersList.users);
    const isLoading = useSelector((state) => state.utils.isLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.fetchReservationUser());
    }, [dispatch]);

    let table = <Spinner/>;

    if (users) {
        table = isLoading ? (
            <Container component="main" maxWidth="xs">
                <Spinner/>
            </Container>
        ) : (
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="caption table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">{TABLE_ROWS[0]}</TableCell>
                            <TableCell align="left">{TABLE_ROWS[1]}</TableCell>
                            <TableCell align="left">{TABLE_ROWS[2]}</TableCell>
                            <TableCell align="left">{TABLE_ROWS[3]}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow hover={true} key={user._id}>
                                <TableCell
                                    align="left"
                                >
                                    {user.email}
                                </TableCell>
                                <TableCell
                                    align="left"
                                >
                                    {user.name}
                                </TableCell>
                                <TableCell
                                    align="left"
                                >
                                    {user.surname}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    return table;
};
export default ListReservationUser;
