import {useContext, useRef} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../helpers/AuthContext";

function Login() {
    const navigate=useNavigate();
    const {setAuth}=useContext(AuthContext);
    const login=() => {
         axios.post("http://localhost:3002/auth/login", {
            username: username.current.value,
            password: password.current.value
        }).then((response) => {
            if(response.data.error) alert(response.data.error);
             else{
                localStorage.setItem('accessToken',response.data.token);
                setAuth({username:response.data.username,id:response.data.id,status:true});
                navigate('/');
            }
        })
    };
    const username=useRef();
    const password=useRef();
  return (
        <div className={"loginContainer"}>
            <label>Username</label>
            <input type={"text"} ref={username}/>
            <label>password</label>
            <input type={"password"} ref={password}/>
            <button onClick={login}>Login</button>
        </div>
    );
}

export default Login;