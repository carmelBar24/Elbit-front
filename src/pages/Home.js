import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Link,useNavigate} from "react-router-dom";
import {AuthContext} from "../helpers/AuthContext";
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';

function Home() {
    const navigate=useNavigate();
    const logoutHandler=()=>{
        localStorage.removeItem("accessToken");
        setAuth({username:"",id:0,status:false});
    }
    const likeHandler=(PostId) => {
        axios.post('http://localhost:3002/likes', {
            PostId: PostId
        }, {
            headers:{
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((res) => {
            setListOfPosts(listOfPost.map((post)=> {
                if (post.id === PostId) {
                    if (res.data.like) {
                        return {...post, likes: [...post.likes, 0]};
                    } else {
                        const likePosts = post.likes;
                        likePosts.pop();
                        return {...post, likes: likePosts};
                    }
                } else {
                    return post;
                }
            }));
                if(likedPost.includes(PostId))
                {
                    setlikedPosts(likedPost.filter((id)=>{
                        return id!=PostId;
                    }));
                }
                else{
                    setlikedPosts([...likedPost,PostId]);
                }
        })
    }
    const [listOfPost,setListOfPosts]=useState([]);
    const [likedPost,setlikedPosts]=useState([]);
    const {auth,setAuth}=useContext(AuthContext);
    useEffect(()=>{
        if(!localStorage.getItem("accessToken"))
        {
            navigate("/login");
        }
        else {
            axios.get("http://localhost:3002/posts", {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                }
            }).then((response) => {
                setListOfPosts(response.data.listOfPost);
                setlikedPosts(response.data.likedPost.map((like) => {
                    return like.PostId;
                }));
            })
        }},[]);
    return (
        <div>
            <div className={"navbar"}>
                <Link to={"/create-post"}>Create A Post</Link>
                <Link to={"/"}>Home</Link>
                {
                    !auth.status?(
                    <>
                    <Link to={"/login"}>Login</Link>
                    <Link to={"/register"}>Register</Link>
                    </>):
                    <button onClick={logoutHandler}>Logout</button>
                }
            </div>
            {listOfPost.map((post,key)=>{
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
                        <Link to={`/profile/${post.UserId}`}>{post.username}</Link>
                        {likedPost.includes(post.id)?< FavoriteSharpIcon onClick={()=>{
                            likeHandler(post.id);
                        }}/>:< FavoriteBorderSharpIcon  onClick={()=>{
                            likeHandler(post.id);
                        }}/>
                        }
                     <label>{post.likes.length}</label>
                    </div>
                </div>);
            })}
        </div>
    );
}
export default Home;