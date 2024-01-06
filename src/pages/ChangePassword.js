import {useRef} from "react";
import axios from 'axios'

function  ChangePassword() {
    const oldPass=useRef();
    const newPass=useRef();
    const changeHandler=()=>{
        axios.put('http://localhost:3002/auth/change-password',{
            oldPass:oldPass.current.value,
            newPass:newPass.current.value
        },{
            headers:{
                accessToken:localStorage.getItem("accessToken")
            }
        }).then((res)=>{
            alert(res.data);
        })
    }
    return (
        <div className={'changePasswordContainer'}>
            <h1>Change Your Password</h1>
            <input type={'password'} placeholder={'old password'} ref={oldPass}/>
            <input type={'password'} placeholder={'new password'} ref={newPass}/>
            <button onClick={changeHandler}>Change!</button>
        </div>
    );
}

export default ChangePassword;