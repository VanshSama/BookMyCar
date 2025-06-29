import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendOTP, signUp } from '../Services/Operations/authAPI';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import signupPic from "../Assets/singupPic.webp"
import codes from "../Data/countrycode.json"
import { setsignupData } from '../Reduer/Slices/authSlice';

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [accountType, setAccountType] = useState("Customer");

    const [formData, setFormData] = useState({
        accountType: "Customer",
        firstName: "",
        lastName: "",
        contactNo: "",
        email: "", 
        password: "",
        confirmPassword: "",
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
        dispatch(setsignupData(formData));
        dispatch(sendOTP(formData.email, navigate));
    }

    return (
        <div className='w-full flex items-center justify-center'>
            <div className='w-10/12 my-20 flex flex-row gap-x-10 items-start '>
                <div className='flex flex-col w-full h-full justify-center gap-6'>
                    <div className='flex flex-col gap-1 w-full justify-start'>
                        <h2 className='text-4xl font-inter font-semibold text-richblack-5'>
                            Drive the future - Join Now!
                        </h2>

                        <div className='text-lg font-inter text-richblack-100'>
                            <p>Exclusive access to premium car deals, rentals, and trusted sellers.</p>
                            <span className='text-base font-edu-sa font-bold text-blue-100'>
                                Buy, Sell, Rent with ease
                            </span>
                        </div>
                    </div>

                    <div className='cursor-pointer p-[4px] rounded-full flex flex-row gap-[10px] bg-richblack-700 text-richblack-200 items-center w-max'>
                        <div className={`font-medium font-inter rounded-full px-[18px] text-base ${accountType === "Customer" ? "bg-richblack-900 py-[6px] gap-[10px]" : ""}`}  onClick={() => {
                            setAccountType("Customer");
                            formData.accountType = "Customer"
                        }}>
                            Customer
                        </div>

                        <div className={`font-medium font-inter rounded-full px-[18px] text-base ${accountType === "Provider" ?  "bg-richblack-900 py-[6px] gap-[10px]" : ""}` } 
                        onClick={() => {
                            setAccountType("Provider");
                            formData.accountType = "Provider"
                        }}>
                            Provider
                        </div>
                    </div>

                    <form onSubmit={submitHandler} className='flex flex-col justify-between gap-10 w-full h-full'>
                        <div className='flex flex-col gap-2 w-full h-full'>
                            <div className='flex flex-row gap-3 w-full'>
                                <div className='flex w-full flex-col gap-[6px] '>
                                    <label htmlFor='firstName'
                                    className='flex items-center gap-[2px]'>
                                        First Name<sup className='text-[#EF476F]'>*</sup>
                                    </label>
                                    <input 
                                        type='text'
                                        name='firstName'
                                        placeholder='Enter First Name'
                                        id='firstName'
                                        onChange={changeHandler}
                                        value={formData.firstName}
                                        className='flex rounded-lg text-richblack-25 p-3 gap-[12px] bg-richblack-700'
                                    />
                                </div>

                                <div className='flex w-full flex-col gap-[6px] '>
                                    <label htmlFor='lastName'
                                    className='flex items-center gap-[2px]'>
                                        Last Name<sup className='text-[#EF476F]'>*</sup>
                                    </label>
                                    <input 
                                        type='text'
                                        name='lastName'
                                        placeholder='Enter Last Name'
                                        id='lastName'
                                        onChange={changeHandler}
                                        value={formData.lastName}
                                        className='flex rounded-lg text-richblack-25 p-3 gap-[12px] bg-richblack-700'
                                    />
                                </div>
                            </div>

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

                            <div className='flex flex-col gap-[3px] w-full'>
                                <label htmlFor='contactNo'
                                className='flex items-center gap-[2px]'>
                                    Contact Number<sup className='text-[#EF476F]'>*</sup>
                                </label>

                                <div className='flex flex-row gap-3 w-full'>
                                    <select className='bg-richblack-700 rounded-lg p-3 flex gap-3 w-20 '>
                                        {
                                            codes.map((ele, index) => {
                                                return <option key={index} value={ele.country}>{ele.code}</option>
                                            })
                                        }
                                    </select>

                                    <input 
                                        type='text'
                                        name='contactNo'
                                        placeholder='Contact Number'
                                        id='contactNo'
                                        onChange={changeHandler}
                                        value={formData.contactNo}
                                        className='flex rounded-lg p-3 gap-[12px] bg-richblack-700 w-full'
                                    />
                                </div>
                            </div>

                            <div className='flex flex-row gap-3 items-center w-full justify-between'>
                                <div className='flex w-full flex-col gap-[6px] '>
                                    <label htmlFor='password'
                                    className='flex items-center gap-[2px]'>
                                        Password<sup className='text-[#EF476F]'>*</sup>
                                    </label>

                                    <div className='flex flex-row w-full h-full relative'>
                                        <input 
                                            type='password'
                                            name='password'
                                            placeholder='Enter Password'
                                            id='password'
                                            onChange={changeHandler}
                                            value={formData.password}
                                            className='flex w-full h-full rounded-lg text-richblack-5 p-3 gap-[12px] bg-richblack-700'
                                        />
                                    </div>
                                </div>

                                <div className='flex w-full flex-col gap-[6px] '>
                                    <label htmlFor='confirmPassword'
                                    className='flex items-center gap-[2px]'>
                                        Confirm Password<sup className='text-[#EF476F]'>*</sup>
                                    </label>

                                    <div className='flex flex-row w-full h-full relative'>
                                        <input 
                                            type={showPassword ? 'text' : 'password'}
                                            name='confirmPassword'
                                            placeholder='Confirm Password'
                                            id='confirmPassword'
                                            onChange={changeHandler}
                                            value={formData.confirmPassword}
                                            className='flex w-full h-full rounded-lg text-richblack-5 p-3 gap-[12px] bg-richblack-700'
                                        />

                                        <div onClick={() => setShowPassword(!showPassword)} className='absolute right-[2%] top-[30%]  '>
                                            {
                                                showPassword ? <IoEyeOff /> : <IoEye /> 
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button type='submit' className='bg-yellow-50 text-richblack-900 rounded-md px-2 py-3 hover:scale-95 duration-200 transition-all font-semibold text-lg'>
                            Sign Up
                        </button>
                    </form>
                </div>
                
                <div className='relative hidden w-full lg:flex z-10'>
                    <img src={signupPic} className='w-[558px] h-[504px]'/>
                </div>
            </div>
        </div>
    )
}

export default Signup
