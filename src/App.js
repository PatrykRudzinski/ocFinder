import React from "react";
import { ThemeProvider } from '@material-ui/styles';

import Wrapper from "./components/Wrapper";
import Hero from "./components/Hero";
import Form from "./components/Form";
import theme from "./theme/main";
import fonts from "./constants/fonts";

const { roboto, redHatDisplay} = fonts;

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <link href={roboto.cdn} rel="stylesheet"/>
            <link href={redHatDisplay.cdn} rel="stylesheet"/>
            <Wrapper>
                <Hero/>
                <Form/>
            </Wrapper>
        </ThemeProvider>
    );
};

export default App;
