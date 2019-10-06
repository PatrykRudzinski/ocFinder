import React, {useRef, useState, useEffect, useContext} from "react";
import PropTypes from 'prop-types';
import {ReactReduxContext} from 'react-redux';

import {makeStyles} from '@material-ui/core/styles';
import {
    Select,
    InputLabel,
    FormControl,
    MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles(({spacing}) => ( {
    formControl: {
        margin: spacing(1),
    },
} ));

const SelectCustom = ({label, storeData: {id, type}, onSelect, options, disabled}) => {
    const classes = useStyles();
    const inputLabel = useRef(null);
    const {store} = useContext(ReactReduxContext);
    const [labelWidth, setLabelWidth] = useState(0);
    const getValue = () => (store && store.getState()[ id ] !== null) ? store.getState()[ id ] : '';

    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const changeHandler = e => {
        const {value} = e.target;
        store.dispatch({type, value});
        if (typeof onSelect === 'function') onSelect();
    };

    return (
        <FormControl
            variant="filled"
            className={classes.formControl}
            disabled={!options.length || disabled}
        >
            <InputLabel ref={inputLabel} htmlFor={id} shrink={!!getValue()}>
                {label}
            </InputLabel>
            <Select
                value={getValue()}
                onChange={changeHandler}
                labelWidth={labelWidth}
                inputProps={{
                    name: label,
                    id: id,
                }}
            >
                <MenuItem value=""/>
                {
                    options.length && options.map(option => (
                        <MenuItem
                            value={option.value}
                            key={option.value}
                        >
                            {option.label}
                        </MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    )
};

SelectCustom.defaultProps = {
    disabled: false,
    options: [],
};

SelectCustom.propTypes = {
    label: PropTypes.string.isRequired,
    storeData: PropTypes.shape({
        id: PropTypes.string,
        type: PropTypes.string,
    }).isRequired,
    disabled: PropTypes.bool,
    onSelect: PropTypes.func,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            label: PropTypes.string.isRequired,
        })
    ),
};

export default SelectCustom;
