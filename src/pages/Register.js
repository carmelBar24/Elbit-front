import axios from "axios";
import * as Yup from "yup";
import {Link, useNavigate} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import React from "react";

function Register() {
            const initialValues={
                username:"",
                password:""
            }
            const onSubmit=(data)=>{
                axios.post("http://localhost:3002/auth",data).then((response)=>{
                    console.log("register complete")
                })
                };
            const validationSchema=Yup.object().shape(
            {
                username:Yup.string().min(3).max(15).required(),
                password:Yup.string().min(4).max(20).required()
            });
            return (
            <div >
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    <Form className="formContainer">
                        <label>UserName:</label>
                        <ErrorMessage name={"username"} component={"span"}/>
                        <Field id={"inputCreatePost"} name={"username"} placeholder={"username example"}/>
                        <label>Password:</label>
                        <ErrorMessage name={"password"} component={"span"}/>
                        <Field type={"password"} id={"inputCreatePost"} name={"password"} placeholder={"password example"}/>

                        <button type={"submit"}>Create User</button>
                    </Form>
                </Formik>

        </div>
    );
}

export default Register;