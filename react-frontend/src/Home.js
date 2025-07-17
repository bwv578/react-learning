import './App.css';
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

function Home() {
    const navigate = useNavigate();
    const dispatch  = useDispatch();
    const {isLoggedIn, username} = useSelector(state => state.user);
    useEffect(() => {
        if(isLoggedIn){
            navigate("/community/articles");
        }
    }, [isLoggedIn]);

    useEffect(() => {
        fetch('/loginStatus')
            .then(res=>res.json())
            .then(data=>{
                dispatch({
                    type: "USER_UPDATE",
                    payload: data
                });
            })
            .catch(err=>{})
    }, []);

    const [newUser, setNewUser] = useState({
        "id" : "",
        "name" : "",
        "pw" : ""
    });

    const [user, setUser] = useState({
        "id" : "",
        "pw" : ""
    });

    const handleUserInfoChange = (e) => {
        const parent = e.target.closest('form').getAttribute('id');
        // eslint-disable-next-line default-case
        switch (parent){
            case 'signup-form':
                setNewUser({
                    ...newUser,
                    [e.target.name] : e.target.value
                });
                return;
            case 'signin-form':
                setUser({
                    ...user,
                    [e.target.name] : e.target.value
                });
                return;
        }
    }

    const signUp = () => {
        if(!isValidForm("signup-form")) return false;
        fetch("/signup", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
            .then(res=>res.json())
            .then(data=>{
                if(data===1){
                    setNewUser({"id":'', "pw":'', "name":''});
                    alert("registered.");
                }else{
                    alert("error");
                }
            })
            .catch(err=>alert(err));
    }

    const signIn = () => {
        if(!isValidForm("signin-form")) return false;
        fetch("/signin", {
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res=>res.json())
            .then(data=>{
                dispatch({
                    type: "USER_UPDATE",
                    payload: data
                });
                if(data.isLoggedIn) {
                    alert('Welcome');
                    navigate('/community/articles');
                }
                else alert('Invalid');
            })
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
                    <form id="signup-form">
                        Name: <input type={"text"} name={"name"} onChange={handleUserInfoChange} value={newUser.name}/><br/>
                        ID: <input type={"text"} name={"id"} onChange={handleUserInfoChange} value={newUser.id}/><br/>
                        PW: <input type={"text"} name={"pw"} onChange={handleUserInfoChange} value={newUser.pw}/><br/>
                    </form>
                    <button onClick={()=>{
                        signUp();
                    }}>submit</button>
                </div>
                <div style={{width: '30%', textAlign: 'center'}}>
                    <h3>Sign in</h3>
                    <form id="signin-form">
                        ID: <input type={"text"} className={"not-null dd"} name={"id"}
                                   onChange={handleUserInfoChange} value={user.id}/><br/>
                        PW: <input type={"text"} className={"not-null cc"} name={"pw"}
                                   onChange={handleUserInfoChange} value={user.pw}/><br/>
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

export default Home;
