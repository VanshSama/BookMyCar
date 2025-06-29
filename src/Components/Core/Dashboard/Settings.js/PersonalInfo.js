import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { updatePersonalInfo } from '../../../../Services/Operations/profileAPI';
import { setUser } from '../../../../Reduer/Slices/profileSlice';

const PersonalInfo = () => {
    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    
    const {register, handleSubmit, reset, setValue, getValues} = useForm();

    function valuesPutting(){
        setValue("firstName", user?.firstName);
        setValue("lastName", user?.lastName);
        setValue("contactNo", user?.contactNo);
        setValue("dateOfBirth", user?.additionalDetails?.dateOfBirth);
        setValue("gender", user?.additionalDetails?.gender);
        setValue("about", user?.additionalDetails?.about);
        setValue("pincode", user?.additionalDetails?.pincode);
        setValue("state", user?.additionalDetails?.state);
        setValue("city", user?.additionalDetails?.city);
    }

    useEffect(() => {
        valuesPutting();
    }, [])

    const submitHandler = async (data) => {
        const formData = new FormData();

        // console.log("Data :- ", data);
        formData.append("firstName", data.firstName);
        formData.append("lastName", data.lastName);
        formData.append("dataOfBirth", data.dateOfBirth);
        formData.append("contactNo", data.contactNo);
        formData.append("gender", data.gender);
        formData.append("about", data.about);
        formData.append("pincode", data.pincode);
        formData.append("state", data.state);
        formData.append("city", data.city);

        const response = await updatePersonalInfo(formData, token);
        // console.log("Response :- ", response);

        if(response){
            dispatch(setUser(response));
            // console.log("Usr :- ", user);
            reset();
        }
    }

    return (
        <div className='flex w-full flex-col gap-4 bg-richblack-600 px-4 py-6 rounded-lg'>
            <div className='font-mono font-semibold text-xl text-richblack-5'>
                Personal Information
            </div>

            <form className='flex flex-col gap-4' onSubmit={handleSubmit(submitHandler)}>
                <div className='grid grid-cols-2 gap-5 items-center justify-center'>
                    <div className='flex flex-col gap-[6px] '>
                        <label htmlFor='firstName'
                        className='font-inter text-base font-semibold'>
                            First Name
                        </label>

                        <input 
                        type='text'
                        name='firstName'
                        id='firstName'
                        placeholder={`${user.firstName}`}
                        {...register("firstName")}
                        className='select-none bg-richblack-700 rounded-md py-2 px-3 border-[1px] border-richblack-25'
                        />
                    </div>

                    <div className='flex flex-col gap-[6px] '>
                        <label htmlFor='lastName'
                        className='font-inter text-base font-semibold'>
                            Last Name
                        </label>

                        <input 
                        type='text'
                        name='lastName'
                        id='lastName'
                        placeholder={`${user.lastName}`}
                        {...register("lastName")}
                        className='select-none bg-richblack-700 rounded-md py-2 px-3 border-[1px] border-richblack-25'
                        />
                    </div>

                    <div className='flex flex-col gap-[6px] '>
                        <label htmlFor='dateOfBirth'
                        className='font-inter text-base font-semibold'>
                            Date Of Birth
                        </label>

                        <input 
                        type='date'
                        name='dateOfBirth'
                        id='dateOfBirth'
                        placeholder={`${user?.additionalDetails?.dateOfBirth}`}
                        {...register("dateOfBirth")}
                        className='select-none bg-richblack-700 rounded-md py-2 px-3 border-[1px] border-richblack-25'
                        />
                    </div>

                    <div className='flex flex-col gap-[6px] '>
                        <label htmlFor='gender'
                        className='font-inter text-base font-semibold'>
                            Gender
                        </label>

                        <select 
                        name='gender'
                        id='gender'
                        {...register("gender")}
                        className='select-none bg-richblack-700 rounded-md py-2 px-3 border-[1px] border-richblack-25'>
                            <option value={""} >Select gender</option>
                            <option value={"Male"}>Male</option>
                            <option value={"Female"}>Female</option>
                            <option value={"Others"}>Others</option>
                        </select>
                    </div>

                    <div className='flex flex-col gap-[6px] '>
                        <label htmlFor='contactNo'
                        className='font-inter text-base font-semibold'>
                            Contact Number
                        </label>

                        <input 
                        type='text'
                        name='contactNo'
                        id='contactNo'
                        placeholder={`${user?.contactNo}`}
                        {...register("contactNo")}
                        className='select-none bg-richblack-700 rounded-md py-2 px-3 border-[1px] border-richblack-25'
                        />
                    </div>

                    <div className='flex flex-col gap-[6px] '>
                        <label htmlFor='about'
                        className='font-inter text-base font-semibold'>
                            About
                        </label>

                        <textarea
                        type='text'
                        name='about'
                        id='about'
                        rows={1}
                        placeholder={`${user?.additionalDetails?.about ? user.additionalDetails.about : "About yourself (in 50 words)"}`}
                        {...register("about")}
                        className='select-none bg-richblack-700 rounded-md py-2 px-3 border-[1px] border-richblack-25'
                        />
                    </div>

                    <div className='flex flex-col gap-[6px] '>
                        <label htmlFor='pincode'
                        className='font-inter text-base font-semibold'>
                            Pincode
                        </label>

                        <input 
                        type='text'
                        name='pincode'
                        id='pincode'
                        placeholder={`${user?.additionalDetails?.pincode ? user.additionalDetails.pincode : "Enter your pincode"}`}
                        {...register("pincode")}
                        className='select-none bg-richblack-700 rounded-md py-2 px-3 border-[1px] border-richblack-25'
                        />
                    </div>

                    <div className='flex flex-col gap-[6px] '>
                        <label htmlFor='state'
                        className='font-inter text-base font-semibold'>
                            State
                        </label>

                        <input 
                        type='text'
                        name='state'
                        id='state'
                        placeholder={`${user?.additionalDetails?.state ? user.additionalDetails.state : "Enter your State"}`}
                        {...register("state")}
                        className='select-none bg-richblack-700 rounded-md py-2 px-3 border-[1px] border-richblack-25'
                        />
                    </div>

                    <div className='flex flex-col gap-[6px] '>
                        <label htmlFor='city'
                        className='font-inter text-base font-semibold'>
                            City
                        </label>

                        <input 
                        type='text'
                        name='city'
                        id='city'
                        placeholder={`${user?.additionalDetails?.city ? user.additionalDetails.city : "Enter your City"}`}
                        {...register("city")}
                        className='select-none bg-richblack-700 rounded-md py-2 px-3 border-[1px] border-richblack-25'
                        />
                    </div>
                </div>

                <div className='flex flex-row gap-4 justify-end'>
                    <button className='py-2 px-4 bg-richblack-700 rounded-md hover:scale-95 transition-all duration-200 text-base font-semibold font-inter' onClick={() => reset()}>
                        Cancel
                    </button>

                    <button type='submit' className='py-2 px-4 bg-yellow-50 rounded-md hover:scale-95 transition-all duration-200 text-base font-inter font-semibold text-richblack-900'>
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    )
}

export default PersonalInfo
