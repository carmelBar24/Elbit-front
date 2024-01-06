import {useParams,useNavigate} from "react-router-dom";
import React, {useEffect,useState,useContext} from "react"
import axios from "axios";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
import {AuthContext} from "../helpers/AuthContext";

function Profile()
{
    let id=useParams().id;
    const {auth}=useContext(AuthContext);
    const[username,setUserName]=useState("");
    const[posts,setPosts]=useState([]);
    const navigate=useNavigate();
    const changeHandler=()=>{
        navigate('/change-password');
    }
    useEffect(()=>{
        axios.get(`http://localhost:3002/auth/basicInfo/${id}`).then((res)=>{
            setUserName(res.data.username)
        });

        axios.get(`http://localhost:3002/posts/${id}`).then((res)=>{
            setPosts(res.data)
        });

    },[])
    return(
      <div className={"profilePageContainer"}>
          <div className={"basicInfo"}>
            <h1>Username:{username}</h1>
              {username===auth.username&&<button onClick={changeHandler}>Change Password</button>}
          </div>
          <div className={"listOfPosts"}>
              {posts.map((post,key)=>{
                  return (<div key={key} className={"post"}>
                      <div className={"title"}>
                          {post.title}
                      </div>
                      <a key={key} href={`/post/${post.id}`}>
                          <div className={"body"}>
                              {post.postText}
                          </div>
                      </a>
                      <div className={"footer"}>
                          {post.username}
                      </div>
                  </div>);
              })}
          </div>

      </div>
    );
}

export default Profile;