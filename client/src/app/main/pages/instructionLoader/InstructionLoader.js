import FuseAnimate from '@fuse/core/FuseAnimate';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import {makeStyles} from '@material-ui/core/styles';
import {darken} from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import {Button} from "@material-ui/core";
import {withRouter} from "react-router";

const useStyles = makeStyles(theme => ({
    root: {
        background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`,
        color: theme.palette.primary.contrastText
    }
}));

const InstructionLoader = ({history}) => {
    const classes = useStyles();

    return (
        <div className={clsx(classes.root, 'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32')}>
            <div className="flex flex-col items-center justify-center w-full">
                <FuseAnimate animation="transition.expandIn">
                    <Card className="w-full max-w-384 rounded-8">
                        <CardContent className="flex flex-col items-center justify-center p-32">
                            <div className="m-32">
                                <Icon className="text-96" color="action">
                                    emoji_objects
                                </Icon>
                            </div>

                            <Typography variant="h5" className="text-center mb-16">
                                Czy chcesz skorzystać z instrukcji przed skorzystaniem z naszego systemu?
                            </Typography>
                            <div className="flex flex-col items-center justify-center pt-32 pb-24">
                                <Button onClick={() => {
                                    history.push('/knowledge-base')
                                }} style={{marginBottom: '5px'}} className="font-medium" variant='contained'
                                        color='primary'>
                                    Skorzystaj z instrukcji!
                                </Button>
                                <Button onClick={() => {
                                    history.push('/home')
                                }} className="font-medium" variant='contained' color='primary'>
                                    Przejdź na stronę główną!
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </FuseAnimate>
            </div>
        </div>
    );
}

export default withRouter(InstructionLoader);
