import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {App,Apppp} from "./App";
import MyComponent from "./chap1-component/ComponentPrac1_250530";
import {MyComponent2, MyComponent3} from "./chap1-component/ComponentPrac2_250530";
import {Proptest, Proptest2, Proptest3} from "./chap2-props/Proptest";
import PropertyTypes from "./chap2-props/PropertyTypes";
import {PropsInClassComponent, PropsInClassComponent2} from "./chap2-props/Props-in-class-component";
import {StateInClassComponent} from "./chap3-state/State-in-class-component";
import {Say} from "./chap3-state/UseState-in-function-component"
import {StatePrecautions} from "./chap3-state/State-precautions";

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <StatePrecautions/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
