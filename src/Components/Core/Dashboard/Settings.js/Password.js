import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../../../Services/Operations/authAPI';
import { setUser } from '../../../../Reduer/Slices/profileSlice';

const Password = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {token} = useSelector((state) => state.auth);
    const {register, handleSubmit, reset, setValue, getValues} = useForm();
    const dispatch = useDispatch();

    const submitHandler = async (data) => {
        const formData = new FormData();

        formData.append("newPassword", data.password);
        formData.append("confirmNewPassword", data.confirmPassword);

        const response = await changePassword(formData, token);
        // console.log("Response :- ", response);
        if(response){
            dispatch(setUser(response));
            reset();
        }
    }

    return (
        <div className='flex w-full flex-col gap-4 bg-richblack-600 px-4 py-6 rounded-lg'>
            <div className='font-mono font-semibold text-xl text-richblack-5'>
                Password
            </div>

            <form className='flex flex-col gap-5 w-full' onSubmit={handleSubmit(submitHandler)}>
                <div className='flex flex-row gap-5 items-center w-full'>
                    <div className='flex flex-col w-full gap-[6px] '>
                        <label htmlFor='password'
                        className='font-inter text-base font-semibold'>
                            Password
                        </label>

                        <input 
                        type='password'
                        name='password'
                        id='password'
                        placeholder={`Enter new password`}
                        {...register("password")}
                        className='select-none w-full bg-richblack-700 rounded-md py-2 px-3 border-[1px] border-richblack-25'
                        />
                    </div>

                    <div className='flex flex-col w-full gap-[6px] '>
                        <label htmlFor='confirmPassword'
                        className='font-inter text-base font-semibold'>
                            Confirm Password
                        </label>

                        <div className='relative flex flex-row w-full items-center'>
                            <input 
                            type={`${showPassword ? "text" : "password"}`}
                            name='confirmPassword'
                            id='confirmPassword'
                            placeholder={`Confirm new password`}
                            {...register("confirmPassword")}
                            className='select-none w-full bg-richblack-700 rounded-md py-2 px-3 border-[1px] border-richblack-25'
                            />

                            <div className='absolute right-[5%] cursor-pointer' onClick={() => setShowPassword(! showPassword)}>
                                {
                                    showPassword ? (<FaEyeSlash />) : (<FaEye />)
                                }
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className='flex flex-row gap-4 justify-end'>
                    <button className='py-2 px-4 bg-richblack-700 rounded-md hover:scale-95 transition-all duration-200 text-base font-semibold font-inter' onClick={() => reset()}>
                        Cancel
                    </button>

                    <button type='submit' className='py-2 px-4 bg-yellow-50 rounded-md hover:scale-95 transition-all duration-200 text-base font-inter font-semibold text-richblack-900'>
                        Update
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Password
