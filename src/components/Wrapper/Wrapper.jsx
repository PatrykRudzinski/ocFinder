import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(({size}) => ( {
    wrapper: {
        width: '100%',
        maxWidth: `${size.wrapper.width}px`,
    },
} ));

const Wrapper = ({children}) => {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            {children}
        </div>
    )
};

Wrapper.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ])
};

export default Wrapper;
