import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import App from './App';
import {Articles} from './board/Articles';
import {AddNewArticle} from "./board/AddNewArticle";
import {ArticleView} from "./board/ArticleView";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>}></Route>
            <Route path="/articles" element={<Articles/>}></Route>
            <Route path="/addNewArticle" element={<AddNewArticle/>}></Route>
            <Route path="/articleView" element={<ArticleView/>}></Route>
        </Routes>
    </BrowserRouter>
);

reportWebVitals();
