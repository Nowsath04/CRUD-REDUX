import axios from "axios"
import { API_URL } from "../Constant/Url"
import { toast } from "react-toastify";



export const DeleteAction = async (id) => {
    try {
        const { data } = await axios.delete(`${API_URL}/data/delete/${id}`, { withCredentials: true })
        toast.success("Deleted successfully");
    } catch (error) {
        console.log(error);
    }
}