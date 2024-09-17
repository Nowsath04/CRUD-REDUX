import React, { useEffect, useState } from 'react';
import "./Table.css";
import { useDispatch, useSelector } from 'react-redux';
import { LogOut } from '../Actions/userAction';
import { Link, useNavigate } from 'react-router-dom';
import CreateData from '../CreateData/CreateData';
import { AllDataAction } from '../Actions/dataAction';
import axios from 'axios';
import { API_URL } from '../Constant/Url';
import { toast } from 'react-toastify';

const Table = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [create, setCreate] = useState(false);
    const [edit, setEdit] = useState(false);
    const [done, setDone] = useState(0);

    const { Alldata } = useSelector((reducer) => reducer.dataReducer);

    useEffect(() => {
        dispatch(AllDataAction);
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
                        </tr>
                    </thead>
                    <tbody>
                        {Alldata?.map((value, index) => (
                            <tr key={index}>
                                <td>{value?.FirstName}</td>
                                <td>{value?.LastName}</td>
                                <td>{value?.Role}</td>
                                <td>{value?.DOB}</td>
                                <td>{value?.Gender}</td>
                                <td>{value?.Email}</td>
                                <td>{value?.Mobile}</td>
                                <td className='table_btn_div'>
                                    <Link to={`/edit/${value._id}`} className='edit_btn' onClick={() => setEdit(true)}>Edit</Link>
                                    <button onClick={() => handleDelete(value._id)} className='delete_btn'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;