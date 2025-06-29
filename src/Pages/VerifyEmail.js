import React, { useEffect, useState } from 'react'
import { sendOTP, signUp } from '../Services/Operations/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import OTPInput from 'react-otp-input';

const VerifyEmail = () => {
    const {signupData} = useSelector((state) => state.auth);
    const {loading} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [otp, setOtp] = useState("");

    useEffect(() => {
        if(! signupData){
            navigate("/signup");
        }
    }, []);

    const {accountType, firstName, lastName, email, contactNo, password, confirmPassword} = signupData;

    function submitHandler(event){
        event.preventDefault();
        dispatch(signUp(accountType, firstName, lastName, email, contactNo, password, confirmPassword, otp, navigate));
    }

    return (
        <div className='w-11/12 mx-auto mt-[10%] flex flex-row justify-center items-center'>
            {
                loading ? (
                    <div className='spinner'></div>
                ) : (
                    <div className='flex flex-col text-richblack-5 w-[30%] gap-10'>
                        <div className='flex flex-col gap-3'>
                            <h1 className='font-semibold text-3xl'>
                                Verify Email
                            </h1>

                            <div className='text-base text-richblack-400'>
                                A verification code has been sent to you. Enter the code below
                            </div>
                        </div>

                        <form onSubmit={submitHandler} className='flex flex-col gap-5 w-full'>
                            <OTPInput 
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderInput={(props) => <input {...props} />}
                            renderSeparator={<span>-</span>}
                            containerStyle={'flex text-richblack-5 items-center justify-center bg-richblack-800 gap-2 w-full'}
                            inputStyle={'w-full flex items-center justify-center mx-auto bg-richblack-700 rounded-md px-2 text-richblack-5 py-3'}
                            skipDefaultStyles={true}
                            />

                            <div className='flex flex-col gap-3 w-full'>
                                <button type='submit' className='w-full flex flex-col p-3 rounded-lg font-inter font-medium hover:scale-95 gap-3 items-center text-center text-richblack-800 justiy-center bg-yellow-50 transition-all duration-200'>
                                    Verify Email
                                </button>
                            </div>
                        </form>

                        <div className='w-full flex flex-row justify-between'>
                            <Link to={"/login"} className='flex flex-row items-center gap-2'>
                                <FaArrowLeft />
                                Back to Login
                            </Link>

                            <button type='submit' onClick={() => dispatch(sendOTP(email, navigate))} className='text-richblue-200 text-sm'>
                                Resend it
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default VerifyEmail
