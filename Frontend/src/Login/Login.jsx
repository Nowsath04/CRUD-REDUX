import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import { LoginAction } from '../Actions/userAction';
import "./Login.css"
import { basicSchema } from './ValidationSchema';


const Login = () => {

    const [eye, setEye] = useState(true)
    const dispatch = useDispatch()
    const navigator = useNavigate()
    const { isAuthentication } = useSelector((reducer) => reducer.auth);

    const onSubmit = async (values, actions) => {
        console.log(values);
        dispatch(LoginAction(values, navigator));
    };

    useEffect(() => {
        if (isAuthentication) {
            navigator('/')
        }
    }, [isAuthentication]);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: basicSchema,
        onSubmit: (values, actions) => onSubmit(values, actions)
    })

    const {
        values,
        handleChange,
        handleBlur,
        touched,
        errors,
        handleSubmit,
        isSubmitting,
    } = formik;

    return (
        <div className='login_Maindiv'>
            <form onSubmit={handleSubmit} className='login_div'>
                <h1>LOGIN</h1>
                <div className='login_Inputs'>
                    <div>
                        <input
                            type='email'
                            id='email'
                            placeholder='Email'
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.email && touched.email ? "input_error" : ""}

                        />
                        {errors.email && touched.email ? (
                            <p className="formik_error">{errors.email}</p>
                        ) : (
                            ""
                        )}
                    </div>
                    <div style={{ position: "relative" }}>
                        <input
                            id='password'
                            type={eye ? "password" : "text"}
                            placeholder='password'
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.password && touched.password ? "input_error" : ""}
                        />
                        {errors.password && touched.password ? (
                            <p className="formik_error">{errors.password}</p>
                        ) : (
                            ""
                        )}
                        {
                            eye ? <FaRegEye className='open_eye' onClick={() => setEye(false)} /> :
                                <FaRegEyeSlash className='open_eye' onClick={() => setEye(true)} />
                        }
                        <Link
                            style={{
                                position: "absolute",
                                whiteSpace: "nowrap",
                                bottom: "-20px",
                                right: "0",
                                fontSize: "14px"
                            }}
                            to={"/forgot-password"}>Forgot Password</Link>
                    </div>
                </div>
                <button type='submit' className='Login_button'>Login</button>
                <div>Already have an account? <Link to={"/register"}>Sign up here</Link></div>
            </form>
        </div>
    )
}

export default Login
