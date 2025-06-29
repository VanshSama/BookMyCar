import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { MdEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();

    // useEffect(() => {
    //     console.log("User :- ", user);
    // }, [])
    function clickHandler(){
        navigate("/dashboard/settings");
    }
    return (
        <div className='flex flex-row items-center justify-center w-full h-full px-5 py-3'>
            <div className='flex flex-col items-center gap-6 w-[60%]'>
                <div className='text-3xl px-3 py-3 border-[1px] border-richblack-25 rounded-lg font-edu-sa font-semibold'>
                    My Profile
                </div>

                    {/* Name */}
                <div className='bg-richblack-600 w-full px-4 py-6 rounded-lg flex flex-row items-center justify-between'>
                    <div className='flex flex-row gap-2 items-center'>
                        <img src={user?.image} className='w-[50px] h-[50px] rounded-full ' />

                        <div className='flex flex-col gap-1'>
                            <p className='text-richblack-25 font-inter font-semibold text-lg'>
                                {user?.firstName + " " + user?.lastName}
                            </p>
                            <p className='text-richblack-50 select-none'>
                                {user?.email}
                            </p>
                        </div>
                    </div>

                    <button className='flex hover:scale-95 transition-all duration-200 flex-row items-center gap-1 font-semibold text-richblack-900 bg-yellow-50 px-3 py-2 rounded-md'
                    onClick={clickHandler}>
                        <MdEdit />
                        <p>
                            Edit
                        </p>
                    </button>
                </div>

                    {/* About */}
                <div className='bg-richblack-600 w-full px-4 py-6 rounded-lg flex flex-row items-center justify-between'>
                    <div className='flex flex-col gap-2'>
                        <div className='text-richblack-5 font-mono font-semibold text-xl'>
                            About
                        </div>
                        <div className='text-richblack-50 select-none'>
                            {user?.additionalDetails?.about ? user.additionalDetails.about : "Add about yourself to show your skills..."} 
                        </div>
                    </div>

                    <button className='flex hover:scale-95 transition-all duration-200 flex-row items-center gap-1 font-semibold text-richblack-900 bg-yellow-50 px-3 py-2 rounded-md' 
                    onClick={clickHandler}>
                        <MdEdit />
                        <p>
                            Edit
                        </p>
                    </button>
                </div>

                <div className='bg-richblack-600 w-full px-4 py-6 rounded-lg flex flex-row items-start justify-between'>
                    <div className='w-full flex flex-col gap-2'>
                        <div className='text-richblack-5 font-mono font-semibold text-xl'>
                            Personal Details
                        </div>
                        <div className='w-full grid grid-cols-2 gap-3 justify-between'>
                            <div className=''>
                                <p className='text-lg font-semibold font-inter text-richblack-25'>
                                    First Name
                                </p>
                                <p className='text-base text-richblack-50 select-none'>
                                    {user?.firstName}
                                </p>
                            </div>

                            <div className=''>
                                <p className='text-lg font-semibold font-inter text-richblack-25'>
                                    Last Name
                                </p>
                                <p className='text-base text-richblack-50 select-none'>
                                    {user?.lastName}
                                </p>
                            </div>

                            <div className=''>
                                <p className='text-lg font-semibold font-inter text-richblack-25'>
                                    Email Address
                                </p>
                                <p className='text-base text-richblack-50 select-none'>
                                    {user?.email}
                                </p>
                            </div>

                            <div className=''>
                                <p className='text-lg font-semibold font-inter text-richblack-25'>
                                    Contact No.
                                </p>
                                <p className='text-base text-richblack-50 select-none'>
                                    {user?.contactNo}
                                </p>
                            </div>

                            <div className=''>
                                <p className='text-lg font-semibold font-inter text-richblack-25'>
                                    Gender
                                </p>
                                <p className='text-base text-richblack-50 select-none'>
                                    {user?.additionalDetails?.gender ? user.additionalDetails.gender : "M / F"}
                                </p>
                            </div>

                            <div className=''>
                                <p className='text-lg font-semibold font-inter text-richblack-25'>
                                    Date Of Birth
                                </p>
                                <p className='text-base text-richblack-50 select-none'>
                                    {user?.additonalDetails?.dateOfBirth ? user.additonalDetails.dateOfBirth : "Date Of birth"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <button className='flex hover:scale-95 transition-all duration-200 flex-row items-center gap-1 font-semibold text-richblack-900 bg-yellow-50 px-3 py-2 rounded-md'
                    onClick={clickHandler}>
                        <MdEdit />
                        <p>
                            Edit
                        </p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MyProfile
