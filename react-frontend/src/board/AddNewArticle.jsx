import {useState} from "react";
import {useNavigate} from "react-router-dom";

export const AddNewArticle = ()=>{
    const [article, setArticle] = useState({
        title: '',
        content: '',
    });
    const navigate = useNavigate();

    const handleInput = (e)=>{
        setArticle({
            ...article,
            [e.target.name]: e.target.value
        })
    }

    const submitArticle = ()=>{
        fetch("/board/articles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(article)
        })
            .then(res=>res.json())
            .then(result=>{
                alert(JSON.stringify(result));
                switch (result){
                    case 1:
                        alert('success');
                        navigate('/articles');
                        break;
                    case 0:
                        alert('error');
                }
            })
            .catch(error=>{alert(error)})
    }

    return (
        <div style={{
            width: "100vw",
            display: "flex",
            justifyContent: "center"
        }}>
            <div style={{width: "100%", maxWidth: "1600px"}}>
                <h1 style={{textAlign: "center"}}>New Post</h1>
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
                        />
                    </div>

                    <div style={{
                        width: "80%",
                        margin: "0 auto",
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "10px"
                    }}>
                        <button onClick={() => {
                            submitArticle()}}>
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}