import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import "./board.css";

export const Articles = ()=>{

    useEffect(()=>{
        loadArticles();
    });

    const [searchKey, setSearchKey] = useState("");
    const [orderBy, setOrderBy] = useState("");
    const navigate = useNavigate();

    const loadArticles = ()=>{
        fetch('/board/articles')
            .then(res=>res.json())
            .then(data=>{
                document.getElementById('articles-body').innerHTML = '';
                const columns = ['title', 'writerName', 'registeredAt', 'views'];

                for (let i=0; i<data.length; i++){
                    let row = document.createElement("tr");
                    const number = document.createElement('td');
                    number.textContent = i+1;
                    row.appendChild(number);
                    const rowObject = data[i];

                    for(const column of columns){
                        let item  = document.createElement("td");
                        item.textContent = rowObject[column];
                        if(column==='title' && rowObject.myArticle){
                            let delBtn = document.createElement('button');
                            delBtn.style.marginLeft = "5px";
                            delBtn.style.color = "red";
                            delBtn.style.backgroundColor = "white";
                            delBtn.textContent = 'X';
                            delBtn.addEventListener('click', (e)=>{
                                e.stopPropagation();
                                deleteArticle(rowObject.articleCode);
                            });
                            item.appendChild(delBtn);
                        }
                        row.appendChild(item);
                    }

                    row.addEventListener('click', ()=>{
                        navigate('/ArticleView', {state: {
                            articleCode: rowObject.articleCode
                        }});
                    });
                    document.getElementById('articles-body').appendChild(row);
                }
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
            .then(data=>{loadArticles();})
            .catch(err=>{})
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
            <tr>
                <th style={{width: "5%"}}>No.</th>
                <th style={{width: "40%"}}>Title</th>
                <th style={{width: "22%"}}>Writer</th>
                <th style={{width: "25%"}}>Date</th>
                <th style={{width: "5%"}}>Views</th>
            </tr>
            </thead>
            <tbody id="articles-body">
            </tbody>
        </table>

    </div>;
}