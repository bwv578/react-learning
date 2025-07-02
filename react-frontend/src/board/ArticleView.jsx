import {useEffect, useState} from "react";
import {useNavigate, useLocation, data} from "react-router-dom";
import {resume} from "react-dom/server";

export const ArticleView = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [article, setArticle] = useState({
        articleCode: 0,
        title: '',
        content: '',
        views: '',
        myArticle: ''
    });
    const [comment, setComment] = useState({
        articleCode: article.articleCode,
        content: ''
    })
    const [commentCnt, setCommentCnt] = useState(0);

    useEffect(() => {
        const articleCode = location.state?.articleCode;
        setArticle({
            ...article, articleCode: articleCode
        });
        getArticle(articleCode);
    }, []);

    const handleInput = (e)=>{
        setArticle({
            ...article,
            [e.target.name]: e.target.value
        })
    }
    const handleComment = (e) => {
        setComment({
            ...comment,
            [e.target.name]: e.target.value
        })
    }
    const getArticle = (articleCode) => {
        fetch('/board/article?articleCode='+articleCode)
            .then(res=>res.json())
            .then(data=>{
                setArticle(data);
                getComments(articleCode);
            })
            .catch(err=>{})
    }
    const updateArticle = () => {
        fetch('/board/article', {
            method: 'PATCH',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                articleCode: article.articleCode,
                title: article.title,
                content: article.content
            })
        })
            .then(res=>res.json())
            .then(data=>{
                alert("modified.");
                getArticle(article.articleCode);
            })
            .catch(err=>{
                alert("err");
            })
    }
    const getComments = (articleCode) => {
        fetch('/board/comments?articleCode='+articleCode)
            .then(res=>res.json())
            .then(data=>{
                const elements = ['commentCode', 'writerCode', 'writerName',
                    'parentCode', 'registeredAt', 'status'];
                const comments = document.getElementById('comments');
                comments.innerHTML = '';

                // TODO CSS 클래스 지정하기 귀찮음
                for(let i=0; i<data.length; i++){
                    const rowData = data[i];
                    let row = document.createElement("form");
                    row.style.marginBottom = '30px';
                    row.style.width = '100%';
                    row.style.height = '70px';
                    row.style.marginTop = '0px';
                    let rowInfo = document.createElement('div');
                    rowInfo.style.width = '30%';
                    rowInfo.style.display = 'flex';
                    rowInfo.style.alignItems = 'flex-end';
                    let writerName = document.createElement('h4');
                    writerName.textContent = rowData.writerName;
                    writerName.style.marginBottom = '5px';
                    rowInfo.appendChild(writerName);
                    let registeredAt = document.createElement('h4');
                    registeredAt.style.marginBottom = '5px';
                    registeredAt.style.color = 'rgba(0, 0, 0, 0.5)';
                    registeredAt.style.marginLeft = '15px';
                    registeredAt.textContent = rowData.registeredAt;
                    rowInfo.appendChild(registeredAt);
                    if(rowData.myComment){
                        let delBtn = document.createElement('button');
                        delBtn.style.color = '#FF0000';
                        delBtn.style.backgroundColor = '#DDDDDD';
                        delBtn.textContent = 'X';
                        delBtn.style.height = '25px';
                        delBtn.style.marginLeft = '10px';
                        delBtn.style.marginBottom = '3px';
                        delBtn.addEventListener('click', (e)=>{
                            e.preventDefault();
                            deleteComment(rowData.commentCode);
                        });
                        rowInfo.appendChild(delBtn);
                    }
                    let content = document.createElement('textarea');
                    content.style.width = '100%';
                    content.style.height = '50px';
                    content.style.marginTop = '0px';
                    content.textContent = rowData.content;
                    row.appendChild(rowInfo);
                    row.appendChild(content);

                    for(const element of elements){
                        let attribute = document.createElement('input');
                        attribute.setAttribute('type','hidden');
                        attribute.value = rowData[element];
                        row.appendChild(attribute);
                    }
                    comments.appendChild(row);
                }

                setCommentCnt(data.length);
                setComment({
                    articleCode: 0,
                    title: '',
                    content: '',
                    views: '',
                    myArticle: ''
                });
            })
    }
    const postComment = () => {
        fetch('/board/comment', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...comment,
                articleCode: article.articleCode
            })
        })
            .then(res => res.json())
            .then(data=>{getComments(article.articleCode)})
            .catch(err=>{alert('err')})
    }
    const deleteComment = (commentCode) => {
        fetch('/board/comment', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                commentCode: commentCode
            })
        })
            .then(res=>res.json())
            .then(data=>{
                if(data===1) alert("deleted.");
                else alert("no authority.");
                getComments(article.articleCode);
            })
            .catch(err=>{alert('err')})
    }

    return (
        <div style={{
            width: "100vw",
            display: "flex",
            justifyContent: "center"
        }}>
            <div style={{width: "100%", maxWidth: "1600px"}}>
                <h1 style={{textAlign: "center"}}>Article</h1>
                <br/><hr/><br/>
                <form
                    id="new-article-form"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    <div style={{
                        width: "80%",
                        margin: "0 auto",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start"
                    }}>
                        <label htmlFor="title" style={{marginBottom: "5px", fontWeight:"bold"}}>Title</label>
                        <input
                            type="text"
                            name="title"
                            value={article.title}
                            onInput={handleInput}
                            style={{width: "100%", marginBottom: "10px"}}
                            readOnly={!article.myArticle && true}
                        />
                    </div><br/>

                    <div style={{
                        width: "80%",
                        margin: "0 auto",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start"
                    }}>
                        <label htmlFor="content" style={{marginBottom: "5px", fontWeight:"bold"}}>Body</label>
                        <textarea
                            name="content"
                            value={article.content}
                            onInput={handleInput}
                            style={{width: "100%", height: "500px"}}
                            readOnly={!article.myArticle && true}
                        />
                    </div>

                    <div style={{
                        width: "80%",
                        margin: "0 auto",
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "10px"
                    }}>
                        {
                            article.myArticle &&
                            <button onClick={(e) => {
                                e.preventDefault();
                                updateArticle();
                            }}>
                            Update
                            </button>
                        }
                    </div>
                </form>
                <hr style={{marginTop:'30px'}}/>

                <div style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    flexDirection: "column"
                }}>
                    <textarea style={{
                        width: "80%", height: "50px", marginTop:"30px"
                    }}
                              name="content"
                              value={comment.content}
                              onInput={(
                                  e)=>{handleComment(e)
                              }}>
                    </textarea>

                    <div style={{
                        width: "80%",
                        margin: "0 auto",
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "10px"
                    }}>
                        <button onClick={(e)=>{
                            postComment();
                        }}>+댓글
                        </button>
                    </div>

                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "100%",
                        marginTop: "0px"
                    }}>
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "flex-start",
                            width: "80%",
                        }}>
                            <h4 style={{marginBottom:'10px'}}>Comments ({commentCnt})</h4>
                        </div>

                        <div id='comments' style={{
                            width: "80%"
                        }}>
                        </div>
                    </div>
                </div>
                <br/><hr/><br/>
            </div>
        </div>
    );
}