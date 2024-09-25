import React, { useEffect, useState } from 'react';
import "./Table.css";
import { useDispatch, useSelector } from 'react-redux';
import { GetProfile, LogOut } from '../Actions/userAction';
import { Link, useNavigate } from 'react-router-dom';
import CreateData from '../CreateData/CreateData';
import { AllDataAction, FavouriteAction, GetFavouriteAction } from '../Actions/dataAction';
import axios from 'axios';
import { API_URL } from '../Constant/Url';
import { toast } from 'react-toastify';
import { FaRegStar, FaStar } from "react-icons/fa"

const Table = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [create, setCreate] = useState(false);
    const [edit, setEdit] = useState(false);
    const [done, setDone] = useState(0);
    const [favour, setFavour] = useState(false);

    const { Alldata, getFavour } = useSelector((reducer) => reducer.dataReducer);
    const { profile } = useSelector((reducer) => reducer.auth);

    const userid = profile?._id


    useEffect(() => {
        dispatch(GetProfile);
    }, [done]);

    useEffect(() => {
        dispatch(AllDataAction);
    }, [done]);


    useEffect(() => {
        dispatch(GetFavouriteAction(userid));

    }, [done]);

    const handleClick = () => {
        dispatch(LogOut(navigate));
    };

    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`${API_URL}/data/delete/${id}`, { withCredentials: true });
            toast.success("Deleted successfully");
            setDone(prev => prev + 1);
            console.log(done);
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete");
        }
    };


    const handleFavour = async (id) => {
        const values = {
            id,
            userid: profile._id
        }
        dispatch(FavouriteAction(values, setFavour, setDone))
    };



    return (
        <div className='Table_maindiv'>
            <div className='Table_div'>
                <div className='TableHeading_div'>
                    <div className='Table_heading'>
                        <h1>USER DATA</h1>
                    </div>
                    <button onClick={() => setCreate(true)} className='createbutton'>CREATE</button>
                    {create && <CreateData setCreate={setCreate} setDone={setDone} done={done} />}
                    <button className='logoutbutton' onClick={handleClick}>LOGOUT</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Role</th>
                            <th>DOB</th>
                            <th>Gender</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Actions</th>
                            <th>Fouraites</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Alldata?.map((value, index) => {
                            // Check if the current item is in the favourites list
                            const isFavourite = getFavour?.some((fav) => fav._id === value._id);

                            return (
                                <tr key={index}>
                                    <td>{value?.FirstName}</td>
                                    <td>{value?.LastName}</td>
                                    <td>{value?.Role}</td>
                                    <td>{value?.DOB}</td>
                                    <td>{value?.Gender}</td>
                                    <td>{value?.Email}</td>
                                    <td>{value?.Mobile}</td>
                                    <td className='table_btn_div'>
                                        <Link to={`/edit/${value?._id}`} className='edit_btn' onClick={() => setEdit(true)}>Edit</Link>
                                        <button onClick={() => handleDelete(value?._id)} className='delete_btn'>Delete</button>
                                    </td>
                                    <td>
                                        <button className='table_icon_btn' onClick={() => handleFavour(value?._id)}>
                                            {isFavourite ? (
                                                <FaStar className="star_icon_fill" /> // Filled star for favourite
                                            ) : (
                                                <FaRegStar className="star_icon_notfill" /> // Empty star for non-favourite
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Table;