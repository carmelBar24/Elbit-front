import {useParams,useNavigate} from "react-router-dom";
import {useContext, useEffect, useRef, useState} from "react";
import axios from "axios";
import {AuthContext} from "../helpers/AuthContext";
import {hasPointerEvents} from "@testing-library/user-event/dist/utils";

function Post() {
    let {id} =useParams();
    const {auth}=useContext(AuthContext);
    const comment=useRef();
    const navigate=useNavigate();
    const [Post,setPost]=useState([]);
    const [Comments,setComments]=useState([]);
    const editPost=(option)=>{
        if(option=='title')
        {
            let newTitle=prompt("enter new title");
            if(newTitle)
            {
                axios.put('http://localhost:3002/posts/title',{
                    newTitle:newTitle,
                    id:id
                },{
                    headers:
                        {
                            accessToken:localStorage.getItem("accessToken")
                        }
                }).then((res)=>{
                    setPost({...Post,title:res.data})
                })
            }
        }
        else{
            let newBody=prompt("enter new text");
            if(newBody)
            {
                axios.put('http://localhost:3002/posts/title',{
                    newText:newBody,
                    id:id
                },{
                    headers:
                        {
                            accessToken:localStorage.getItem("accessToken")
                        }
                }).then((res)=>{
                    setPost({...Post,postText:newBody})
                })
            }
        }
    }
    const deleteHandler=(id)=>{
        axios.delete(`http://localhost:3002/comments/${id}`,{
            headers:{
                accessToken:localStorage.getItem("accessToken")
            }
        }).then(()=>{
            setComments(Comments.filter((val)=>{
                return val.id!=id;
            }));
        });
    }
    const deletePostHandler=()=>{
        axios.delete(`http://localhost:3002/posts/${id}`,{
            headers:{
                accessToken:localStorage.getItem("accessToken")
            }
        }).then((res)=>{
            console.log(res);
            navigate("/");
            });
        };
    useEffect(()=>{
        axios.get(`http://localhost:3002/posts/byId/${id}`).then((response)=>{
            setPost(response.data);
        })
        axios.get(`http://localhost:3002/comments/${id}`).then((response)=>{
            setComments(response.data);
        })
    },[]);
    const addComment=()=>{
        axios.post('http://localhost:3002/comments',{
        commentBody:comment.current.value,
        PostId:id
        },
            {
                headers:{
                    accessToken:localStorage.getItem("accessToken")
                }
            }).then((response)=>{
                if(response.data.error) alert(response.data.error);
                else {

                    const newComment = {
                        commentBody: comment.current.value,
                        username:response.data.username
                    }
                    setComments([...Comments, newComment]);
                }
            comment.current.value="";
        })
    }
    return (
        <div className="postPage">
            <div className="leftSide">
                <div className="post" id="individual">
                    <div className="title" onClick={()=>{
                        if(auth.username==Post.username)
                        editPost('title')
                    }}> {Post.title} </div>
                    <div className="body" onClick={()=>{
                        if(auth.username==Post.username)
                        editPost('body')
                    }}>{Post.postText}</div>
                    <div className="footer">
                        {Post.username}
                        {auth.username==Post.username&&<button onClick={deletePostHandler}>DELETE POST</button>}
                       </div>
                </div>
            </div>
            <div className="rightSide">
                <div className={"addCommentsContainer"}>
                    <input type={"text"} placeholder={"add Comment"} ref={comment}/>
                    <button type={"submit"} onClick={addComment}>Add Comment</button>
                </div>
                <div className={"listOfComments"}>
                    {Comments.map((comment,key)=>{
                        return <div key={key} className={"comment"}>{comment.commentBody}
                        <label> Username: {comment.username}</label>
                            {auth.username==comment.username&&<button onClick={()=>{deleteHandler(comment.id)}}>X</button>}</div>
                    })}
                </div>
            </div>
        </div>
    );
}

export default Post;