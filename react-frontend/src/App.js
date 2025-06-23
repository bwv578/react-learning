import logo from './logo.svg';
import './App.css';
import {useState} from "react";

function App() {
    const [user, setUser] = useState({
        "id" : "",
        "name" : "",
        "pw" : "",
        "pw2": ""
    });

    const handleUserInfoChange = (e) => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        });
    }
    const signup = () => {
        if(!isValidForm("signup-form")) return false;
        fetch("/signup", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res=>res.json())
            .then(data=>true)
            .catch(err=>alert(err));
    }
    const signIn = () => {
        if(!isValidForm("signin-form")) return false;
        fetch("/signin", {
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: 'jwchoitest'
            })
            // body: JSON.stringify(user)
        })
            .then(res=>res.json())
            .then(data=>true)
            .catch(err=>alert(err));
    }
    const isValidForm = (formId) => {
        const form = document.getElementById(formId);
        for(const child of form.children){
            if(child.className.split(" ").includes("not-null")){
                if(user[child.name].length<1) {
                    alert("Enter "+child.name);
                    return false;
                }
            }
        }
        return true;
    }

    return (
        <div className="App">
            <h1>MAIN</h1>
            <br/><br/><br/>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div style={{width: '30%', textAlign: 'center'}}>
                    <h3>Sign up</h3>
                    <form id={"signup-form"}>
                        Name: <input type={"text"} name={"name"} onChange={handleUserInfoChange}/><br/>
                        ID: <input type={"text"} name={"id"} onChange={handleUserInfoChange}/><br/>
                        PW: <input type={"text"} name={"pw"} onChange={handleUserInfoChange}/><br/>
                    </form>
                    <button onClick={()=>{
                        signup();
                    }}>submit</button>
                </div>
                <div style={{width: '30%', textAlign: 'center'}}>
                    <h3>Sign in</h3>
                    <form id={"signin-form"}>
                        ID: <input type={"text"} className={"not-null dd"} name={"id"} onChange={handleUserInfoChange}/><br/>
                        PW: <input type={"text"} className={"not-null cc"} name={"pw"} onChange={handleUserInfoChange}/><br/>
                    </form>
                    <button onClick={() => {
                        signIn();
                    }}>submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
