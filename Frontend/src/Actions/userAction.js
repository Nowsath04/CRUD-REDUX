import axios from "axios"
import { API_URL } from './../Constant/Url';
import { LoginError, LoginRequest, LoginSuccess, Logout, ProfileError, ProfileRequest, ProfileSuccess, registerError, registerRequest, registerSuccess } from "../Slices/userSlice";
import { toast } from "react-toastify";


export const RegisterAction = (values, navigate) => async (dispatch) => {
    try {
        dispatch(registerRequest())
        const { data } = await axios.post(`${API_URL}/auth/register`, values, { withCredentials: true })
        dispatch(registerSuccess(data))
        toast.success(`Successfully registered`);
        navigate("/login");
    } catch (error) {
        dispatch(registerError())
        toast.error(error.response.data.message);
    }
}

export const LoginAction = (values, navigate) => async (dispatch) => {
    try {
        dispatch(LoginRequest())
        const { data } = await axios.post(`${API_URL}/auth/login`, values, { withCredentials: true })
        dispatch(LoginSuccess(data))
        toast.success(`Login successfully`);
        navigate("/");
    } catch (error) {
        dispatch(LoginError())
        toast.error(error.response.data.message);
    }
}

export const LogOut = (navigate) => async (dispatch) => {
    try {
        const { data } = await axios.get(`${API_URL}/auth/logout`, { withCredentials: true });
        dispatch(Logout())
        toast.success(`Logout successfully`);
        navigate("/login");
    } catch (error) {
        console.log(error);
    }
}


export const GetProfile = async (dispatch) => {
    try {
        dispatch(ProfileRequest())
        const { data } = await axios.get(`${API_URL}/auth/profile`, { withCredentials: true });
        dispatch(ProfileSuccess(data.user))
    } catch (error) {
        dispatch(ProfileError(error.response))
        console.log(error);
    }
}