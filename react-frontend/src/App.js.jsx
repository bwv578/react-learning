import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home";
import {Articles} from "./board/Articles";
import {AddNewArticle} from "./board/AddNewArticle";
import {ArticleView} from "./board/ArticleView";
import React from "react";
import {Header} from "./Header";

export const App = ()=>{

    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}></Route>

            <Route path="/community" element={<Header/>}>
                <Route path="articles" element={<Articles/>}></Route>
                <Route path="addNewArticle" element={<AddNewArticle/>}></Route>
                <Route path="articleView" element={<ArticleView/>}></Route>
            </Route>
        </Routes>
    </BrowserRouter>

}