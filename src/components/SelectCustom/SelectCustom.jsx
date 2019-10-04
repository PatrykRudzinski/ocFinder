import React, {useRef, useState, useEffect} from "react";
import PropTypes from 'prop-types';

import {makeStyles} from '@material-ui/core/styles';
import {
    Select,
    InputLabel,
    FormControl,
} from "@material-ui/core";

const useStyles = makeStyles(({spacing}) => ( {
    formControl: {
        margin: spacing(1),
    },
} ));

const SelectCustom = ({label, id, initialValue, onSelect, options, disabled}) => {
    const classes = useStyles();
    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const changeHandler = e => {
        setValue(e.target.value);
        if (typeof onSelect === 'function') onSelect(e);
    };

    return (
        <FormControl
            variant="outlined"
            className={classes.formControl}
            disabled={!options.length || disabled}
        >
            <InputLabel ref={inputLabel} htmlFor={id}>
                {label}
            </InputLabel>
            <Select
                native
                value={value}
                onChange={changeHandler}
                labelWidth={labelWidth}
                inputProps={{
                    name: label,
                    id,
                }}
            >
                <option value=""/>
                {
                    options.length && options.map(option => (
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    ))
                }
            </Select>
        </FormControl>
    )
};

SelectCustom.defaultProps = {
    disabled: false,
    initialValue: '',
    options: [],
};

const valuePropType = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

SelectCustom.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onSelect: PropTypes.func,
    initialValue: valuePropType,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: valuePropType.isRequired,
            label: PropTypes.string.isRequired,
        })
    ),
};

export default SelectCustom;