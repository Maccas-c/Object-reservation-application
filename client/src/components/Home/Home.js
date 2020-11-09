import React from 'react';


import useStyles from './HomeStyles';
import {Container,FormGroup} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const Home = () => {
    const classes = useStyles();

    return (
        <div>
        <FormGroup className={classes.container}  row>
            {[1,2,3,4,5].map((item,index)=> (
                <div key={index} className={classes.margin}>
                    <h1 className={classes.title}>Strefa A</h1>
                    <Container className={classes.court}>
                        <Button className={classes.buttonDelete} variant='contained' color='primary'>Usuń strefę!</Button>
                    </Container>
                </div>
                ))}

            </FormGroup>
        <Button className={classes.button} color='primary' variant='outlined'>Dodaj kolejne strefę!</Button>

        </div>
    );
};

export default Home;
