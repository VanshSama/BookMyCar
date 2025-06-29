import React, { useState } from 'react'
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { login } from '../Services/Operations/authAPI';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import loginImage from "../Assets/loginPic.webp"

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "", 
        password: "",
    });

    function changeHandler(event){
        const {name, value} = event.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        dispatch(login(formData.email, formData.password, navigate, dispatch));
    }
    
    return (
        <div className='w-full flex items-center justify-center'>
            <div className='w-10/12 my-20 flex flex-row gap-x-10 items-start '>
                <div className='flex flex-col w-full h-full justify-center gap-6'>
                    <div className='flex flex-col gap-1 w-full justify-start'>
                        <h2 className='text-4xl font-inter font-semibold text-richblack-5'>
                            Welcome Back
                        </h2>

                        <div className='text-lg font-inter text-richblack-100'>
                            <p>Your journey starts here</p>
                            <span className='text-base font-edu-sa font-bold text-blue-100'>
                                Buy, Sell, Rent with ease
                            </span>
                        </div>
                    </div>
                    <form onSubmit={submitHandler} className='flex flex-col justify-between gap-10 w-full h-full'>
                        <div className='flex flex-col gap-2 w-full h-full'>
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
                                    value={formData.email}
                                    className='flex rounded-lg text-richblack-25 p-3 gap-[12px] bg-richblack-700'
                                />
                            </div>

                            <div className='flex flex-col gap-[6px] '>
                                <label htmlFor='password'
                                className='flex items-center gap-[2px]'>
                                    Password<sup className='text-[#EF476F]'>*</sup>
                                </label>

                                <div className='flex flex-row w-full h-full relative'>
                                    <input 
                                        type={showPassword ? 'text' : 'password'}
                                        name='password'
                                        placeholder='Enter Password'
                                        id='password'
                                        onChange={changeHandler}
                                        value={formData.password}
                                        className='flex w-full h-full rounded-lg text-richblack-5 p-3 gap-[12px] bg-richblack-700'
                                    />

                                    <div onClick={() => setShowPassword(!showPassword)} className='absolute right-[2%] top-[30%]  '>
                                        {
                                            showPassword ? <IoEyeOff /> : <IoEye /> 
                                        }
                                    </div>
                                </div>
                            </div>

                            <Link to={"/forgot-password"} className='flex justify-end w-full text-sm font-inter text-richblue-100'>
                                Forgot Password
                            </Link>
                        </div>

                        <button type='submit' className='bg-yellow-50 text-richblack-900 rounded-md px-2 py-3 hover:scale-95 duration-200 transition-all font-semibold text-lg'>
                            Log In
                        </button>
                    </form>
                </div>

                <div className='relative hidden w-full lg:flex z-10'>
                    <img src={loginImage} className='w-[558px] h-[504px]'/>
                </div>
            </div>
        </div>
    )
}

export default Login
