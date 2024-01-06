import {Formik,Form,Field,ErrorMessage} from 'formik';
import * as Yup from 'yup'
import axios from "axios";
import {Link,useNavigate} from "react-router-dom";
import React from "react";
import {useEffect,useContext} from "react"
import {AuthContext} from "../helpers/AuthContext";

function CreatePost(){
    const {auth}=useContext(AuthContext);
    const initialValues={
        title:"",
        postText:"",
    }
    const onSubmit=(data)=>{
        axios.post("http://localhost:3002/posts",data,{
            headers:{
                accessToken:localStorage.getItem("accessToken")
            }
        }).then((response)=>{
           navigate("/")
        })
        console.log(data)};
    const validationSchema=Yup.object().shape(
        {
            title:Yup.string().required("you must input a title"),
            postText:Yup.string().required(),
        });
    let navigate = useNavigate();
    useEffect(()=>{
       if(!auth.status)
       {
           navigate("/login");
       }
    },[])
    return (
    <div className={"createPostPage"}>
        <div className={"navbar"}>
            <Link to={"/create-post"}>Create A Post</Link>
            <Link to={"/"}>Home</Link>
        </div>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className="formContainer">
                <label>Title:</label>
                <ErrorMessage name={"title"} component={"span"}/>
                <Field id={"inputCreatePost"} name={"title"} placeholder={"title example"}/>
                <label>Post:</label>
                <ErrorMessage name={"postText"} component={"span"}/>
                <Field id={"inputCreatePost"} name={"postText"} placeholder={"post example"}/>

                <button type={"submit"}>Create Post</button>
            </Form>
        </Formik>

    </div>
    );
}
export default CreatePost;