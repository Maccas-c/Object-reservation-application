import React from 'react';


import useStyles from './HomeStyles';
import {Container,FormGroup} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useSelector} from "react-redux";

const Home = () => {
    const roleUser = useSelector(state=>state.auth.user.role)
    console.log(roleUser)
    const classes = useStyles();

    return (
        <div>
        <FormGroup className={classes.container}  row>
            {[1,2,3,4,5].map((item,index)=> (
                <div key={index} className={classes.margin}>
                    <h1 className={classes.title}>Strefa A</h1>
                    <Container className={classes.court}>
                        {roleUser === 'admin' ? <Button className={classes.buttonDelete} variant='contained' color='primary'>Usuń strefę!</Button> : null}
                    </Container>
                </div>
                ))}

            </FormGroup>
            {roleUser === 'admin' ? <Button className={classes.button} color='primary' variant='outlined'>Dodaj kolejne strefę!</Button>: null }

        </div>
    );
};

export default Home;
