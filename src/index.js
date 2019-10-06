import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';

const roots = [...document.querySelectorAll('.mfind-calculator')];

roots.forEach(root => {
    const { id } = root.dataset;
    ReactDOM.render(<App id={id}/>, root);
});
