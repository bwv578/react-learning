import {useEffect, useRef, useState} from "react";

export const Lobby = () => {
    let isFirstRender = useRef(true);

    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({
        msg: '',
        status: 0
    });

    const getUsers = ()=>{
        fetch('/battlefield/api/lobby/users')
            .then(res=>res.json())
            .then(users=>{
                setUsers(users);
            })
            .catch(err=>{alert("err")})
    }

    useEffect(()=>{
        if(isFirstRender.current) {
            getUsers();
            isFirstRender.current = false;
        }else{
            fetch('/battlefield/api/lobby/users', {
                method: 'POST',
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(user)
            })
                .then(res=>res.json())
                .then(data=>{
                    getUsers();
                })
                .catch(err=>{alert("err")})
        }
    }, [user])

    return <div>
        <h1 style={{display: "flex", justifyContent: "center", width: "100%"}}>싸움터</h1>
        <br/>

        <div style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
        }}>
            <div style={{width:"40%"}}>
                <button onClick={(e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    const msg = window.prompt("Enter message.");
                    if(msg){
                        setUser({
                            ...user,
                            message: msg
                        })
                    }
                }}>등록
                </button>
            </div>
        </div>
        <table style={{
            width: "40%",
            margin:"0 auto",
            justifyContent: "center",
            textAlign: "center",
        }}>
            <thead>
            <tr>
                <th>Name</th>
                <th>Message</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user, idx) =>(
                <tr>```
                    <td>{user.name}</td>
                    <td>{user.message}</td>
                    <td>{user.status===1 ? 'dd' : 'ff'}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
}