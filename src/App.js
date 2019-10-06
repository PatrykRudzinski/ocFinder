import React, {useEffect, useState} from 'react';
import {ThemeProvider} from '@material-ui/styles';
import {Provider as StoreProvider} from 'react-redux'
import {createStore} from 'redux';
import PropTypes from 'prop-types';

import reducer, {initialState as reducerInitialState} from './reducers';
import Wrapper from './components/Wrapper';
import Hero from './components/Hero';
import Form from './components/Form';
import theme from './theme/main';
import fonts from './constants/fonts';
import {updateState, loadState} from './sessionStorage';

const {roboto, redHatDisplay} = fonts;
const enhancer = () => {
    if (process.env.NODE_ENV === 'development') {
        return window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    }
    return null
};
const store = createStore(
    reducer,
    enhancer(),
);

const App = ({id}) => {
    const [initialState, setInitialState] = useState(reducerInitialState);
    const storageKey = `mfind-calculator-${id}`;
    store.subscribe(() => {
        updateState(storageKey, store.getState())
    });
    useEffect(() => {
        const newState = loadState(storageKey);
        store.dispatch({type: 'UPDATE_ALL', newState});
        setInitialState(newState)
    }, [storageKey]);
    return (
        <StoreProvider store={store}>
            <ThemeProvider theme={theme}>
                <link href={roboto.cdn} rel='stylesheet'/>
                <link href={redHatDisplay.cdn} rel='stylesheet'/>
                <Wrapper>
                    <Hero/>
                    <Form initialState={initialState}/>
                </Wrapper>
            </ThemeProvider>
        </StoreProvider>
    );
};

App.propTypes = {
    id: PropTypes.string.isRequired,
};

export default App;
