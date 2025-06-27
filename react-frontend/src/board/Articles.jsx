import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./board.css";

export const Articles = ()=>{

    const [searchKey, setSearchKey] = useState("");
    const [orderBy, setOrderBy] = useState("");
    const navigate = useNavigate();

    const loadArticles = ()=>{
        fetch('/articles', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                searchKey: searchKey,
                orderBy: orderBy
            })
        })
            .then(res=>res.json())
            .then(data=>{

            })
            .catch()
    }

    return <div>
        <h1 style={{display: "flex", justifyContent: "center", width: "100%"}}>ARTICLES</h1>
        <br/>

        <form id={"search-form"} style={{display:"flex", justifyContent:"center"}}>
            <input type={"text"} value={searchKey} onInput={(e)=>{
                setSearchKey(e.target.value);
            }}/>
            <button>Search</button>
        </form>
        <br/>

        <div id="menu-bar" style={{
            width: "80%",
            margin: "0 auto",
            display: "flex",
            justifyContent: "flex-end"
        }}>
            <button onClick={(e)=>{navigate("/AddNewArticle")}}>+</button>&nbsp;
        </div>

        <table id="contents-list" className="board-table"
               style={{width: "80%", margin:"0 auto", justifyContent: "center"}}>
            <thead>
            <th style={{width: "5%"}}>No.</th>
            <th style={{width: "40%"}}>Title</th>
            <th style={{width: "22%"}}>Writer</th>
            <th style={{width: "25%"}}>Date</th>
            <th style={{width: "5%"}}>Views</th>
            </thead>
            <tbody>
            </tbody>
        </table>

    </div>;
}