import {data, Outlet} from "react-router-dom";
import profile from './default.png';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

export const Header = () => {
    const navigate = useNavigate();
    const logout = () => {
        fetch("/logout", {})
            .then(res=>res.json())
            .then(data=>{
                navigate('/')
            })
            .catch(err=>{alert("err")})
    }

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
                <a href="/community/articles">ARTICLES</a>
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
                    <a href="#" style={{fontWeight:"normal"}} onClick={()=>{
                        logout();
                    }}>logout</a>
                </>)}
            </div>
        </div>

        <Outlet/>
    </div>
}