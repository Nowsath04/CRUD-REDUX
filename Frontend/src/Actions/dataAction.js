import axios from "axios";
import { createError, createRequest, createSuccess, dataError, dataRequest, dataSuccess, favourError, favourRequest, favourSuccess, getfavourError, getfavourRequest, getfavourSuccess, getSingleError, getSingleRequest, getSingleSuccess, updateError, updateRequest, updateSuccess } from "../Slices/dataSlice";
import { API_URL } from './../Constant/Url';
import { toast } from 'react-toastify';


export const CreateNewData = (values, setCreate, setDone, done) => async (dispatch) => {
    try {
        setDone(1)
        console.log(done);

        dispatch(createRequest())
        const { data } = await axios.post(`${API_URL}/data/create`, values, { withCredentials: true })
        console.log(data);
        dispatch(createSuccess(data))
        setDone(2)
        console.log(done);
        toast.success(`created successfully`);
        setCreate(false);
    } catch (error) {
        dispatch(createError())
        toast.error(error.response.data.message);
    }
}

export const AllDataAction = async (dispatch) => {
    try {
        dispatch(dataRequest())
        const { data } = await axios.get(`${API_URL}/data/all-data`, { withCredentials: true })
        dispatch(dataSuccess(data.AllData))
    } catch (error) {
        dispatch(dataError())
        toast.error(error.response.data.message);
    }
}


export const getSingle = (id, values) => async (dispatch) => {
    console.log(values);
    try {
        dispatch(getSingleRequest())
        const { data } = await axios.post(`${API_URL}/data/find-data/${id}`, { withCredentials: true })
        console.log(data.userID);
        dispatch(getSingleSuccess(data.userID))
    } catch (error) {
        dispatch(getSingleError())
        toast.error(error.response.data.message);
    }
}


export const updateAction = (id, values, navicate) => async (dispatch) => {
    try {
        dispatch(updateRequest())
        const { data } = await axios.post(`${API_URL}/data/update/${id}`, values, { withCredentials: true })
        console.log(data);
        dispatch(updateSuccess(data.userID))
        toast.success('Updated successfully');
        navicate("/")
    } catch (error) {
        dispatch(updateError())
        toast.error(error.response.data.message);
    }
}


export const FavouriteAction = (values, setFavour, setDone) => async (dispatch) => {
    try {
        dispatch(favourRequest())
        const { data } = await axios.post(`${API_URL}/data/favourite`, values, { withCredentials: true })
        console.log(data.message);
        dispatch(favourSuccess(data))
        setDone(prev => prev + 1);
        if (data.message == "successfully added") {
            setFavour(true)
            toast.success("favorites added", {
                className: "custom-toast"
            })
        }
        if (data.message == "successfully removed") {
            setFavour(false)
            toast.error("favorites removed", {
                className: "custom-toast"
            })
        }
    } catch (error) {
        dispatch(favourError())
        toast.error(error.response.data.message);
    }
}

export const GetFavouriteAction = (id) => async (dispatch) => {
    try {
        dispatch(getfavourRequest())
        const { data } = await axios.get(`${API_URL}/data/get-favourite/${id}`, { withCredentials: true })
        console.log(data.favouriteData);
        dispatch(getfavourSuccess(data.favouriteData))
    } catch (error) {
        dispatch(getfavourError())
        toast.error(error.response.data.message);
    }
}
