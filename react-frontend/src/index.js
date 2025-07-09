import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";

import {App} from "./App.js";
import {store} from "./redux/Store"
//import {store, persistor} from "./redux-persist/Store";
//import {PersistGate} from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        {/*<PersistGate persistor={persistor}>
            <App/>
        </PersistGate>*/}
        <App/>
    </Provider>
);

reportWebVitals();
