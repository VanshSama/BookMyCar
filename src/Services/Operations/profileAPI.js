import toast from "react-hot-toast"
import { profileEndpoints, userEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";

const {USER_DETAILS, USER_PRODUCTS, USERS_DETAILS} = userEndpoints;
const {UPDATE_PROFILE_IMAGE, UPDATE_PROFILE} = profileEndpoints

export const productsOfUser = async (token) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try{
        const response = await apiConnector("GET", USER_PRODUCTS,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        )
        // console.log("Response :- ", response);
        if(! response?.data?.success){
            throw new Error("User products getting API error");
        }

        // toast.success("Successfully fetched user products");
        result = response?.data?.data;
    }
    catch(error){
        console.log(`Product Details API Error :- ${error}`);
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const updateProfileImage = async (formData, token) => {
    const toastId = toast.loading("Loading...");
    let result = "";
    try{
        const response = await apiConnector("POST", UPDATE_PROFILE_IMAGE, 
            formData,
            {
                Authorization: `Bearer ${token}`
            }
        )

        if(! response?.data?.success){
            throw new Error("Update profile API error");
        }

        result = response?.data?.data;
        toast.success("Profile Image Updated");
    }
    catch(error){
        console.log("Profile image updation error :- ", error);
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const updatePersonalInfo = async (formData, token) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try{
        const response = await apiConnector("POST", UPDATE_PROFILE, 
            formData,
            {
                Authorization: `Bearer ${token}`
            }
        )

        if(! response?.data?.success){
            throw new Error("Personal Info. updation API error");
        }

        result = response?.data?.data;
        toast.success("Information Updated");
    }
    catch(error){
        console.log("Personal Info. updation error :- ", error);
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
    return result;
}