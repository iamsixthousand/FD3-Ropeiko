"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import Ishop from './components/Ishop.jsx';

let productBase = require('./productlist.json');

ReactDOM.render(
    <Ishop 
    products = {productBase}
    />
    , document.getElementById('container')
);