import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import { basicSchema } from './ValidationSchema';
import { ForgotPass } from '../Actions/userAction';


const Forgot = () => {

    const dispatch = useDispatch()
    const navigator = useNavigate()
    const [loading, setLoading] = useState(false);
    const { isAuthentication } = useSelector((reducer) => reducer.auth);

    const onSubmit = async (values, actions) => {
        dispatch(ForgotPass(values, setLoading, navigator))
    };

    useEffect(() => {
        if (isAuthentication) {
            navigator('/')
        }
    }, [isAuthentication]);

    const formik = useFormik({
        initialValues: {
            email: ""
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
                <h1>Email</h1>
                <div className='login_Inputs'>
                    <div style={{ position: "relative" }}>
                        <input
                            id='email'
                            type="email"
                            placeholder='email'
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
                </div>
                <button type='submit' className='Login_button'>{loading ? "Loading..." : "Send Mail"}</button>
                <div>Already have an account? <Link to={"/login"}>Sign in here</Link></div>
            </form>
        </div>
    )
}

export default Forgot;
