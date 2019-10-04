import React from "react";
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(({size}) => ( {
    wrapper: {
        width: '100%',
        maxWidth: `${size.wrapper.width}px`,
    },
} ));

export default ({children}) => {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            {children}
        </div>
    )
}