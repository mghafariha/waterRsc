import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store'
import {Form} from './Form';
import { BrowserRouter } from "react-router-dom";


ReactDOM.render(<BrowserRouter><Provider store={store}>
<Form /></Provider></BrowserRouter>, document.getElementById('root'));

