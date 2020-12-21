import React from "react";
import PDF from '../../assets/regulations/regulations.pdf'
import {IconButton} from "@material-ui/core";
import useStyles from "./styles";

const Regulations = () => {
    const classes = useStyles()
    return (
        <>
            <IconButton>
                <a className={classes.title} href={PDF}>Regulamin</a>
            </IconButton>
        </>
    )
}
export default Regulations