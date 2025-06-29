import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";
import {setToken} from "../../Reduer/Slices/authSlice"
import {setUser} from "../../Reduer/Slices/profileSlice"
import {resetCart} from "../../Reduer/Slices/cartSlice"

const {SENDOTP_API, LOGIN_API, SIGNUP_API, CHANGE_PASSWORD_API, RESETPASSTOKEN_API, RESETPASSWORD_API} = endpoints

export const sendOTP = async (email, navigate) => {
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("POST", SENDOTP_API, {email});
    
        if(! response?.data?.success){
            throw new Error(`Error while sending OTP.`)
        }

        toast.success("OTP sent")
        navigate("/verify-email");
    }
    catch(error){
        console.log(`Send OTP API error :- ${error}`);
        toast.error(`${error?.response?.data?.message}`)
    }
    toast.dismiss(toastId);
}

export const signUp = async (accountType, firstName, lastName, email, contactNo, password, confirmPassword, otp, navigate) => {
    try{
        const response = await apiConnector("POST", SIGNUP_API, 
            {
                accountType: accountType, firstName: firstName, lastName: lastName, email: email, contactNo: contactNo, password: password, confirmPassword: confirmPassword, otp: otp
            }
        )

        if(! response?.data?.success){
            throw new Error("Sign Up Failed");
        }

        toast.success("Account Created");
        navigate("/login");
    }
    catch(error){
        console.log(`Sign Up API error :- ${error}`);
        toast.error(error?.response?.data?.message);
    }
}

export const login = async (email, password, navigate, dispatch) => {
    try{
        const response = await apiConnector("POST", LOGIN_API, 
            {email: email, password: password});

        if(! response?.data?.success){
            throw new Error("Login API error")
        }

        toast.success("Logged In");
        dispatch(setToken(response.data.token));

        const userImage = response?.data?.userDetails?.image ? response.data.userDetails.image : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.userDetails.firstName}${response.data.userDetails.lastName}`
        dispatch(setUser({ ...response.data.userDetails, image: userImage }));
        
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("user", JSON.stringify({ ...response.data.userDetails, image: userImage }));
        navigate("/dashboard/my-profile");
    }
    catch(error){
        console.log(`Login API error :- ${error}`);
        toast.error(error?.response?.data?.message);
    }
}

export const changePassword = async (formData, token) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try{
        const response = await apiConnector("POST", CHANGE_PASSWORD_API, 
            formData,
            {
                Authorization: `Bearer ${token}`
            }
        );

        if(! response?.data?.success){
            throw new Error("Change Password API error")
        }

        toast.success("Password Updated");
        result = response?.data?.data;
    }
    catch(error){
        console.log(`Change Password API error :- ${error}`);
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const resetPasswordToken = async (email, setEmailSent) => {
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("POST", RESETPASSTOKEN_API, {email});

        if(! response?.data?.success){
            throw new Error("Reset password token API error");
        }

        toast.dismiss(toastId);
        toast.success("Email Sent");
        setEmailSent(true);
    }
    catch(error){
        console.log("Reset password token API error");
        toast.dismiss(toastId);
        toast.error(error?.response?.data?.message);
    }
}

export const resetPassword = async (token, password, confirmPassword, navigate) => {
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("POST", RESETPASSWORD_API, 
            {
                token: token, 
                password: password,
                confirmPassword: confirmPassword,
            });

        if(! response?.data?.success){
            throw new Error("Reset password API error");
        }

        toast.dismiss(toastId);
        toast.success("Password Updated");
        navigate("/login");
    }
    catch(error){
        console.log("Reset password API error");
        toast.dismiss(toastId);
        // console.log(error);
        toast.error(error?.response?.data?.message);
    }
}

export const logout = async (navigate, dispatch) => {
    dispatch(setUser(null));
    dispatch(setToken(null));
    dispatch(resetCart());

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logged Out");
    navigate("/");
}