import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../Services/Operations/authAPI';

const UpdatePassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [token, setToken] = useState("");
    const location = useLocation();
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    })

    function changeHandler(event){
        const {name, value} = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(resetPassword(token, formData.password, formData.confirmPassword, navigate));
    }

    useEffect(() => {
        const tt = location.pathname.split('/').at(-1);
        setToken(tt);
    }, [])

    return (
        <div className='w-full flex flex-col mt-[7%] h-full items-center justify-center'>
            <div className='flex flex-col w-[50%] items-center justify-center gap-10'>
                <div className='flex flex-col w-[50%] gap-1'>
                    <h1 className='text-3xl w-full font-inter font-semibold text-richblack-5'>
                        Update Password
                    </h1>

                    <div className='text-sm flex w-full font-inter font-medium text-richblack-300'>
                        Almost done, enter your new password and you are all set.
                    </div>
                </div>

                <div className='flex flex-col gap-2 w-full items-center'>
                    <form className='flex flex-col w-[50%] gap-4' onSubmit={submitHandler}>
                        <div className='flex flex-col gap-[6px] '>
                            <label htmlFor='password'
                            className='flex items-center gap-[2px]'>
                                Password<sup className='text-[#EF476F]'>*</sup>
                            </label>
                            <input 
                                type='password'
                                name='password'
                                placeholder='Enter Password'
                                id='password'
                                onChange={changeHandler}
                                value={formData.password}
                                className='flex rounded-lg text-richblack-25 p-3 gap-[12px] bg-richblack-700'
                            />
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

                        <button type='submit' className='bg-yellow-50 text-richblack-900 rounded-md px-2 py-3 hover:scale-95 duration-200 transition-all font-semibold text-lg'>
                            Update Password
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

export default UpdatePassword
