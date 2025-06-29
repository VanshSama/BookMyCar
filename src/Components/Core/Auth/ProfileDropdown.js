import React, { useRef, useState } from 'react'
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../Services/Operations/authAPI';
import {VscDashboard, VscSignOut} from "react-icons/vsc"
import ChangeOnOutsideTouch from '../../Common/ChangeOnOutsideTouch';

const ProfileDropdown = () => {
    const ref = useRef(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.profile);
    const [open, setOpen] = useState(false);

    ChangeOnOutsideTouch(ref, () => setOpen(false));

    return (
        <button onClick={() => setOpen(!open)}>
            <div className='flex flex-row items-center py-4'>
                <img src={user?.image} alt='user image' className='flex w-[30px] object-cover h-[30px] rounded-full'/>
                
                <MdOutlineArrowDropDown className='w-[25px] h-[25px] '/>
            </div>

            {
                open && (
                    <div className='absolute flex flex-col -translate-x-10 text-center bg-richblack-600 rounded-lg text-richblack-5 font-inter text-base font-semibold' 
                    onClick={(e) => e.stopPropagation()} ref={ref}>
                        <Link to={"/dashboard/my-profile"} onClick={() => setOpen(false)}
                        className='border-b-[1px] mx-auto flex gap-x-1 items-center hover:bg-richblack-700 hover:rounded-t-lg duration-200 transition-all hover:text-yellow-50 pt-3 pb-2 px-4 border-richblack-5'>
                            <VscDashboard className="text-lg" />
                            Dashboard
                        </Link>

                        <button onClick={() => {
                            setOpen(false);
                            dispatch(logout(navigate, dispatch));
                        }} className='pb-3 pt-2 flex items-center gap-x-1 hover:bg-richblack-700 hover:rounded-b-lg duration-200 transition-all hover:text-yellow-50 text-center px-4'>
                            <VscSignOut className="text-lg" />
                            Logout
                        </button>
                    </div>
                )
            }
        </button>
    )
}

export default ProfileDropdown
