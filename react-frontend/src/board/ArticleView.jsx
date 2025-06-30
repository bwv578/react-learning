import {useEffect, useState} from "react";
import {useNavigate, useLocation} from "react-router-dom";

export const ArticleView = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [article, setArticle] = useState({
        articleCode: 0,
        title: '',
        content: '',
        views: ''
    });
    const [comment, setComment] = useState({
        articleCode: article.articleCode,
        content: ''
    })
    useEffect(() => {
        const articleCode = location.state?.articleCode;
        getArticle(articleCode);
    });

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
            })
            .catch(err=>{})
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
                            readOnly={true}
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
                            readOnly={true}
                        />
                    </div>

                    <div style={{
                        width: "80%",
                        margin: "0 auto",
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "10px"
                    }}>
                        <button onClick={(e) => {}}>
                            Update
                        </button>
                    </div>
                </form>
                <hr style={{marginTop:'30px'}}/>

                <div style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    flexDirection: "column"
                }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        width: "80%",
                    }}>
                        <h4>Comments ({article.views})</h4>
                    </div>

                    <textarea style={{
                        width: "80%", height: "50px"
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
                            alert('클릭')
                        }}>+댓글
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}