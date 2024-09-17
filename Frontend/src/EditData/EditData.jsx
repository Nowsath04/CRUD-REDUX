import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { IoCloseCircleOutline } from "react-icons/io5";
import { basicSchema } from './ValidationSchema';
import { CreateNewData, getSingle, updateAction } from '../Actions/dataAction';

const EditData = ({ }) => {

    const params = useParams()
    const dispatch = useDispatch()
    const navicate = useNavigate()

    const { updatedata } = useSelector((reducer) => reducer.dataReducer)


    const onSubmit = async (values, actions) => {
        console.log(values);
        dispatch(updateAction(params.id, values, navicate))
    };

    useEffect(() => {
        dispatch(getSingle(params.id))
    }, [])



    const formik = useFormik({
        initialValues: {
            FirstName: updatedata?.FirstName || "",
            LastName: updatedata?.LastName || "",
            Role: updatedata?.Role || "",
            DOB: updatedata?.DOB || "",
            Gender: updatedata?.Gender || "",
            Email: updatedata?.Email || "",
            Mobile: updatedata?.Mobile || ""
        },
        validationSchema: basicSchema,
        enableReinitialize: true,
        onSubmit: (values, actions) => onSubmit(values, actions)
    })

    const {
        values,
        handleChange,
        handleBlur,
        touched,
        errors,
        handleSubmit,
    } = formik;

    return (
        <div className="CreateData_overlay">
            <form onSubmit={handleSubmit} className="CreateData_div">
                <div className='CreateData_heading_div'>
                    <h2>EDIT</h2>
                    <IoCloseCircleOutline className='close_icon' />
                </div>
                <div className='login_Inputs'>
                    <div>
                        <input
                            type='name'
                            id='FirstName'
                            placeholder='First Name'
                            value={values.FirstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.FirstName && touched.FirstName ? "input_error" : ""}

                        />
                        {errors.FirstName && touched.FirstName ? (
                            <p className="formik_error">{errors.FirstName}</p>
                        ) : (
                            ""
                        )}
                    </div>
                    <div style={{ position: "relative" }}>
                        <input
                            id='LastName'
                            type="text"
                            placeholder='Last Name'
                            value={values.LastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.LastName && touched.LastName ? "input_error" : ""}
                        />
                        {errors.LastName && touched.LastName ? (
                            <p className="formik_error">{errors.LastName}</p>
                        ) : (
                            ""
                        )}
                    </div>
                    <div style={{ position: "relative" }}>
                        <input
                            id='Role'
                            type="text"
                            placeholder='Role'
                            value={values.Role}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.Role && touched.Role ? "input_error" : ""}
                        />
                        {errors.Role && touched.Role ? (
                            <p className="formik_error">{errors.Role}</p>
                        ) : (
                            ""
                        )}
                    </div>
                    <div style={{ position: "relative" }}>
                        <input
                            id='DOB'
                            type="date"
                            placeholder='DOB'
                            value={values.DOB}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.DOB && touched.DOB ? "input_error" : ""}
                        />
                        {errors.DOB && touched.DOB ? (
                            <p className="formik_error">{errors.DOB}</p>
                        ) : (
                            ""
                        )}
                    </div>
                    <div style={{ position: "relative" }}>
                        <select
                            id='Gender'
                            value={values.Gender}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.Gender && touched.Gender ? "input_error" : ""}
                        >
                            <option value="" label="Select gender" />
                            <option value="Male" label="Male" />
                            <option value="Female" label="Female" />
                            <option value="Others" label="Others" />
                        </select>
                        {errors.Gender && touched.Gender ? (
                            <p className="formik_error">{errors.Gender}</p>
                        ) : ""}
                    </div>
                    <div style={{ position: "relative" }}>
                        <input
                            id='Email'
                            type="email"
                            placeholder='Email'
                            value={values.Email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.Email && touched.Email ? "input_error" : ""}
                        />
                        {errors.Email && touched.Email ? (
                            <p className="formik_error">{errors.Email}</p>
                        ) : (
                            ""
                        )}
                    </div>
                    <div style={{ position: "relative" }}>
                        <input
                            id='Mobile'
                            type="number"
                            placeholder='Mobile'
                            value={values.Mobile}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.Mobile && touched.Mobile ? "input_error" : ""}
                        />
                        {errors.Mobile && touched.Mobile ? (
                            <p className="formik_error">{errors.Mobile}</p>
                        ) : (
                            ""
                        )}
                    </div>
                    <button className='CREATE_BTN' type='submit'>UPDATE</button>
                </div>
            </form>
        </div>
    );
}

export default EditData;
