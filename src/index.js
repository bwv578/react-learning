import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
//import {App,Apppp} from "./App";
//import MyComponent from "./ComponentPrac1_250530";
//import {MyComponent2, MyComponent3} from "./ComponentPrac2_250530";
import {Proptest, Proptest2} from "./Proptest";

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Proptest2 />
      <Proptest2 name="홍길동" />
      <Proptest2 location="경상도" />
      <Proptest2 name="윤석열" location="서울"/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
