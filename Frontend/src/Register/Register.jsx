import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import "./Register.css"
import { useFormik } from "formik";
import { useDispatch } from 'react-redux';
import { RegisterAction } from '../Actions/userAction';
import { basicSchema } from './ValidationSchema';


const Register = () => {

    const [eye, setEye] = useState(true)
    const dispatch = useDispatch()
    const navigator = useNavigate()

    const onSubmit = async (values, actions) => {
        console.log(values);
        dispatch(RegisterAction(values, navigator));
    };


    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: ""
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
        handleSubmit
    } = formik;

    return (
        <div className='login_Maindiv'>
            <form onSubmit={handleSubmit} className='login_div'>
                <h1>REGISTER</h1>
                <div className='login_Inputs'>
                    <div>
                        <input
                            type='name'
                            id='name'
                            placeholder='name'
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.name && touched.name ? "input_error" : ""}
                        />
                        {errors.name && touched.name ? (
                            <p className="formik_error">{errors.name}</p>
                        ) : (
                            ""
                        )}
                    </div>
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
                    </div>
                </div>
                <button type='submit' className='Login_button'>Register</button>
                <div>Already have an account? <Link to={"/login"}>Sign in here</Link></div>
            </form>
        </div>
    )
}

export default Register
