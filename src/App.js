
import './App.css';
import {createBrowserRouter, Link, RouterProvider} from 'react-router-dom'
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import React, {useEffect, useState} from "react";
import Post from "./pages/Post";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile"
import {AuthContext} from "./helpers/AuthContext";
import axios from "axios";
import PageNotFound from "./pages/PageNotFound";
import ChangePassword from "./pages/ChangePassword";



function App() {
  const [auth,setAuth]=useState({username:"",id:0,status:false});
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>
    },
    {
      path: "/create-post",
      element: <CreatePost/>
    },
    {
      path: "/post/:id",
      element: <Post/>
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/register",
      element: <Register/>
    },
    {
      path: "/profile/:id",
      element: <Profile/>
    },
    {
      path: "/change-password",
      element: <ChangePassword/>
    },
    {
      path:"*",
      element:<PageNotFound/>
    }
  ]);
  useEffect(()=>{
    axios.get('http://localhost:3002/auth',{
      headers:{
        accessToken:localStorage.getItem("accessToken")
      }
    }).then((response)=>{
      if(response.data.error) setAuth({...auth,status:false});
      else{
        setAuth({username:response.data.username,id:response.data.id,status:true});
      }
    })


  },[])
  return (
    <div className="App">
      <AuthContext.Provider value={{auth,setAuth}}>
      <RouterProvider router={router}/>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
