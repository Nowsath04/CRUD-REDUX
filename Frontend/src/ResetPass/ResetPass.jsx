import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import { basicSchema } from './ValidationSchema';
import { ResetPassword } from '../Actions/userAction';


const ResetPass = () => {

    const [eye, setEye] = useState(true)
    const dispatch = useDispatch()
    const navigator = useNavigate()
    const { id, token } = useParams()
    const { isAuthentication } = useSelector((reducer) => reducer.auth);


    const onSubmit = async (values, actions) => {
        console.log(values);
        dispatch(ResetPassword(values, id, token, navigator))
    };

    useEffect(() => {
        if (isAuthentication) {
            navigator('/')
        }
    }, [isAuthentication]);

    const formik = useFormik({
        initialValues: {
            password: "",
            Cpassword: "",
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
                <h1>Reset Password</h1>
                <div className='login_Inputs'>
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
                    <div style={{ position: "relative" }}>
                        <input
                            id='Cpassword'
                            type={eye ? "password" : "text"}
                            placeholder='Confirm password'
                            value={values.Cpassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.Cpassword && touched.Cpassword ? "input_error" : ""}
                        />
                        {errors.Cpassword && touched.Cpassword ? (
                            <p className="formik_error">{errors.Cpassword}</p>
                        ) : (
                            ""
                        )}
                        {
                            eye ? <FaRegEye className='open_eye' onClick={() => setEye(false)} /> :
                                <FaRegEyeSlash className='open_eye' onClick={() => setEye(true)} />
                        }
                    </div>
                </div>
                <button type='submit' className='Login_button'>Reset</button>
                <div>Already have an account? <Link to={"/login"}>Sign in here</Link></div>
            </form>
        </div>
    )
}

export default ResetPass;
