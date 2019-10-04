import React, {useEffect, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import SelectCustom from "../SelectCustom";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import {header as Authorization} from "../../api/key";
import url from "../../api/url";

const useStyles = makeStyles(({spacing}) => ( {
    form: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: spacing(1.5),
    },
    button: {
        margin: spacing(1),
    },
    rightIcon: {
        marginLeft: spacing(2),
    },
} ));


export default () => {
    const classes = useStyles();
    const [brandOptions, setBrandOptions] = useState([]);
    const [modelOptions, setModelOptions] = useState([]);
    const [fuelOptions, setFuelOptions] = useState([]);

    useEffect(() => {
        ( async () => {
            const res = await fetch(url.brands(), {headers: {Authorization}});
            const json = await res.json();
            const options = json.map(({make_name}) => (
                {value: make_name, label: make_name}
            ));
            setBrandOptions(options);
        } )()
    }, []);

    const getModels = async ({target}) => {
        setModelOptions([]);
        setFuelOptions([]);
        const {value: brand} = target;
        if (brand) {
            const res = await fetch(url.models({brand}), {headers: {Authorization}});
            const json = await res.json();
            const options = json.map(({model_name}) => (
                {value: model_name, label: model_name}
            ));
            setModelOptions(options);
        }
    };

    const getFuel = async ({target}) => {
    };

    const setButtonUrl = async ({target}) => {
        setFuelOptions([]);
    };

    return (
        <form className={classes.form}>
            <SelectCustom
                label='Marka'
                id='brand'
                options={brandOptions}
                onSelect={getModels}
            />
            <SelectCustom
                label='Model'
                id='model'
                options={modelOptions}
                onSelect={getFuel}
            />
            <SelectCustom
                label='Typ paliwa'
                id='fuel'
                options={fuelOptions}
                onSelect={setButtonUrl}
            />
            <ButtonCustom variant="contained" color="primary" className={classes.button}>
                Oblicz składkę
                <ArrowForwardIcon className={classes.rightIcon} />
            </ButtonCustom>
        </form>
    )
};