import React, {useEffect, useState, useContext} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {ReactReduxContext} from 'react-redux';

import SelectCustom from '../SelectCustom';
import ButtonCustom from '../ButtonCustom/ButtonCustom';
import {header as Authorization} from '../../api/key';
import url from '../../api/url';

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

const Form = ({initialState}) => {
    const classes = useStyles();
    const {store} = useContext(ReactReduxContext);
    const [brandOptions, setBrandOptions] = useState([]);
    const [modelOptions, setModelOptions] = useState([]);
    const [fuelOptions, setFuelOptions] = useState([]);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [action, setAction] = useState();

    const validForm = () => {
        const {model, brand, fuel} = store.getState();
        const isValid = model && brand && fuel;
        setButtonDisabled(!isValid);
        if (isValid) {
            const base = 'https://www.mfind.pl/ubezpieczenie-oc-ac/kalkulator-oc-ac';
            setAction(`${base}?make_name=${brand}&model_name=${model}&fuel_name=${fuel}`)
        }
    };

    const getModels = async () => {
        setModelOptions([]);
        setFuelOptions([]);
        const {brand} = store.getState();
        validForm();
        if (brand) {
            const res = await fetch(url.models({brand}), {headers: {Authorization}});
            const json = await res.json();
            const options = json.map(({model_name}) => (
                {value: model_name, label: model_name}
            ));
            setModelOptions(options);
        }
    };

    const getFuel = async () => {
        setFuelOptions([]);
        const {model, brand} = store.getState();
        validForm();
        if (model) {
            const res = await fetch(url.fuels({model, brand}), {headers: {Authorization}});
            const json = await res.json();
            const options = json.map(({fuel_name}) => (
                {value: fuel_name, label: fuel_name}
            ));
            setFuelOptions(options);
        }
    };

    useEffect(()=>{
        if (initialState) {
            initialState.brand && getModels();
            initialState.model && getFuel();
            validForm();
        }
    }, [initialState]);

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

    return (
        <form className={classes.form} method='get' action={action}>
            <SelectCustom
                label='Marka'
                storeData={{
                    type: 'BRAND',
                    id: 'brand',
                }}
                options={brandOptions}
                onSelect={getModels}
                initialValue={initialState && initialState.brand}
            />
            <SelectCustom
                label='Model'
                storeData={{
                    type: 'MODEL',
                    id: 'model',
                }}
                options={modelOptions}
                onSelect={getFuel}
            />
            <SelectCustom
                label='Typ paliwa'
                storeData={{
                    type: 'FUEL',
                    id: 'fuel',
                }}
                options={fuelOptions}
                onSelect={validForm}
            />
            <ButtonCustom
                type='submit'
                variant="contained"
                color="primary"
                className={classes.button}
                disabled={buttonDisabled}
            >
                Oblicz składkę
                <ArrowForwardIcon className={classes.rightIcon}/>
            </ButtonCustom>
        </form>
    )
};

Form.propTypes = {
    initialState: PropTypes.shape({
        brand: PropTypes.string,
        model: PropTypes.string,
        fuel: PropTypes.string,
    })
};

export default Form;
