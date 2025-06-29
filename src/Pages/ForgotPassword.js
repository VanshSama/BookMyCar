import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { resetPasswordToken } from '../Services/Operations/authAPI';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const [emailSent, setEmailSent] = useState(false);

    function changeHandler(event){
        setEmail(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(resetPasswordToken(email, setEmailSent));
    }

    return (
        <div className='w-full flex flex-col mt-[7%] h-full items-center justify-center'>
            <div className='flex flex-col w-[50%] items-center justify-center gap-10'>
                <div className='flex flex-col w-[50%] gap-1'>
                    <h1 className='text-3xl w-full font-inter font-semibold text-richblack-5'>
                        Forgot Password
                    </h1>

                    <div className='text-sm flex w-full font-inter font-medium text-richblack-300'>
                        {
                            emailSent ? (<p className='w-full'>
                                We have sent an email to {email}
                            </p>) : (<p className='w-full '>
                                Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery.
                            </p>)
                        }
                    </div>
                </div>

                <div className='flex flex-col gap-2 w-full items-center'>
                    <form className='flex flex-col w-[50%] gap-4' onSubmit={submitHandler}>
                        {
                            emailSent === false && (
                                <div className='flex flex-col gap-[6px] '>
                                    <label htmlFor='email'
                                    className='flex items-center gap-[2px]'>
                                        Email Address<sup className='text-[#EF476F]'>*</sup>
                                    </label>
                                    <input 
                                        type='email'
                                        name='email'
                                        placeholder='Enter email address'
                                        id='email'
                                        onChange={changeHandler}
                                        value={email}
                                        className='flex rounded-lg text-richblack-25 p-3 gap-[12px] bg-richblack-700'
                                    />
                                </div>
                            )
                        }

                        <button type='submit' className='bg-yellow-50 text-richblack-900 rounded-md px-2 py-3 hover:scale-95 duration-200 transition-all font-semibold text-lg'>
                            {
                                emailSent ? "Resend Email" : "Reset Password"
                            }
                        </button>
                    </form>

                    <Link to={"/login"} className='flex w-[50%] flex-row justify-start gap-2 items-center'>
                        <FaArrowLeft />
                        <p>Back to login</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
