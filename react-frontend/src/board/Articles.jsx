import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import "./board.css";

export const Articles = ()=>{

    useEffect(()=>{
        getArticles();
    }, []);
    const [searchKey, setSearchKey] = useState({
        searchValue: '',
        searchType: '1'
    });
    const [articles, setArticles] = useState([]);
    const [orderBy, setOrderBy] = useState("");
    const navigate = useNavigate();

    const getArticles = ()=>{
        fetch('/board/articles?searchType='+searchKey.searchType+"&searchValue="+searchKey.searchValue)
            .then(res=>res.json())
            .then(data=>{
                setArticles(data);
            })
            .catch()
    }

    const deleteArticle = (articleCode) => {
        fetch('/board/article',{
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                articleCode: articleCode
            })
        })
            .then(res=>res.json())
            .then(data=>{getArticles();})
            .catch(err=>{})
    }

    return <div>
        <h1 style={{display: "flex", justifyContent: "center", width: "100%"}}>ARTICLES</h1>
        <br/>

        <form id={"search-form"} style={{display:"flex", justifyContent:"center"}}>
            <select name="searchType" onChange={(e) => {
                setSearchKey({
                    ...searchKey,
                    searchType: e.target.value
                });
            }} value={searchKey.searchType}>
                <option value="1" selected={true}>제목</option>
                <option value="2">내용</option>
                <option value="3">제목+내용</option>
                <option value="4">글쓴애 닉넴</option>
            </select>
            <input type="text" value={searchKey.searchValue} onInput={(e)=>{
                setSearchKey({
                    ...searchKey,
                    searchValue: e.target.value
                });
            }}/>
            <button onClick={(e)=>{
                e.preventDefault();
                getArticles();
            }}>Search</button>
        </form>
        <br/>

        <div id="menu-bar" style={{
            width: "80%",
            margin: "0 auto",
            display: "flex",
            justifyContent: "flex-end"
        }}>
            <button onClick={(e)=>{navigate("/community/addnewarticle")}}>+새글 싸기</button>&nbsp;
        </div>

        <table id="contents-list" className="board-table"
               style={{width: "80%", margin:"0 auto", justifyContent: "center"}}>
            <thead>
            <tr>
                <th style={{width: "5%"}}>No.</th>
                <th style={{width: "40%"}}>Title</th>
                <th style={{width: "22%"}}>Writer</th>
                <th style={{width: "25%"}}>Date</th>
                <th style={{width: "5%"}}>Views</th>
            </tr>
            </thead>
            <tbody id="articles-body">
            {articles.map((row, index)=>(<tr key={row.articleCode} onClick={()=>{
                navigate('/community/articleview', {state: {
                        articleCode: row.articleCode
                }});
            }}>
                <td>{index+1}</td>
                <td>{row.title}{row.myArticle &&
                    <button style={{
                        marginLeft: "5px",
                        color: "red",
                        backgroundColor: "white"
                    }} onClick={(e)=>{
                        e.preventDefault();
                        e.stopPropagation();
                        deleteArticle(row.articleCode);
                    }}>X</button>
                }</td>
                <td>{row.writerName}</td>
                <td>{row.registeredAt}</td>
                <td>{row.views}</td>
            </tr>))}
            </tbody>
        </table>

    </div>;
}