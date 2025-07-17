import {Outlet} from "react-router-dom";
import profile from './default.png';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

export const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logout = () => {
        fetch("/logout", {})
            .then(res=>res.json())
            .then(data=>{
                navigate('/');
            })
            .catch(err=>{alert("err")})
    }

    useEffect(()=>{
        fetch('/loginStatus')
            .then(res=>res.json())
            .then(data=>{
                dispatch({
                    type: "USER_UPDATE",
                    payload: data
                });

                if(!data.isLoggedIn) navigate("/");
            })
            .catch(err=>{})
    }, []);

    const {isLoggedIn, username} = useSelector(state => state.user);

    return <div>
        <div id="header" style={{
            display: 'flex',
            flexDirection: 'row',
            padding: '0px',
            fontSize: '20px',
            fontWeight: 'bold',
            justifyContent: 'space-between',
        }}>
            <div id="main-menu" style={{
                marginTop: '30px',
                marginLeft: '30px',
            }}>
                <a href="/" style={{marginRight: '15px'}}>HOME</a>
                <a href="/community/articles" style={{marginRight: '15px'}}>ARTICLES</a>
                <a href="/battleField/lobby" style={{marginRight: '15px'}}>싸움터</a>
                <a href="/game"></a>
            </div>
            <div id="user-info" style={{
                display: 'flex',
                alignItems: 'center',
                marginRight: '30px',
                marginTop: '10px'
            }}>
                {isLoggedIn && (<>
                    <img src={profile} alt="" style={{marginRight: '15px', width:'45px'}}/>
                    <p style={{marginRight:'15px'}}>{username}</p>
                    <button onClick={logout} style={{fontWeight: 'normal'}}>
                        logout
                    </button>
                </>)}
            </div>
        </div>

        <Outlet/>
    </div>
}