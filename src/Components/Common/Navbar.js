import React, { useEffect, useState } from 'react'
import logo from '../../Assets/bookcar-Photoroom.png'
import { Link, useNavigate } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa';
import { MdOutlineArrowDropDown, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import ProfileDropdown from '../Core/Auth/ProfileDropdown';

const Navbar = () => {
    const navigate = useNavigate();
    const {totalItems} = useSelector((state) => state.cart)
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const productTypes = ["Car", "Bike", "Spare part", "Other"];

    return (
        <div className='w-full h-full flex items-center justify-center px-2 py-2 border-b-[1px] border-richblack-600'>
            <div className='w-11/12 h-full flex flex-row items-center justify-between'>
                <Link to={"/"}>
                    <img src={logo} alt='Logo' className='w-[50px] h-[30px] bg-yellow-50'
                    />
                </Link>
                
                <div className='flex flex-row gap-4 items-center'>
                    <Link to={"/"} className={`text-lg font-inter font-semibold text-richblack-25`}>
                        Home
                    </Link>

                    <div className={`relative flex flex-col items-center cursor-pointer  group text-lg font-inter font-semibold text-richblack-25`}>
                        <div className=' w-full font-semibold flex items-center gap-x-1 flex-row'>
                            Products
                            <MdOutlineKeyboardArrowDown  />
                        </div>

                        <div className='absolute flex flex-col w-[200px] top-[90%] rounded-lg bg-richblack-5 px-2 py-3 invisible group-hover:visible transition-all duration-200'>
                            {
                                productTypes.map((prd, index) => (
                                    <Link to={`/products/${prd.replaceAll(" ", "-").toLowerCase()}`} key={index} className=' cursor-pointer text-richblack-900 rounded-lg duration-200 transition-all font-semibold text-center text-lg px-4 py-2 hover:bg-richblack-200'>
                                        {prd}
                                    </Link>
                                ))
                            }
                        </div>
                    </div>

                    <Link to={"/compare"} className={`text-lg font-inter font-semibold text-richblack-25`}>
                        Compare
                    </Link>

                    <Link to={"/dealers"} className={`text-lg font-inter font-semibold text-richblack-25`}>
                        Dealers
                    </Link>

                    <Link to={"/about"} className={`text-lg font-inter font-semibold text-richblack-25`}>
                        About
                    </Link>

                    <Link to={"/contact"} className={`text-lg font-inter font-semibold text-richblack-25`}>
                        Contact Us
                    </Link>
                </div>

                <div className='flex flex-row items-center gap-5'>
                    {
                        user && user.accountType !== "Provider" && (
                            <div className='relative py-4 flex flex-row items-center'>
                                <FaShoppingCart className='w-[20px] h-[20px] cursor-pointer ' 
                                onClick={() => navigate("/dashboard/cart")}/>

                                {
                                    totalItems >= 1 && (
                                        <div className='absolute text-center bg-richblack-600 w-[25px] h-[25px] rounded-full top-0 right-[-10px] transition-all duration-200 translate-x-1'>
                                            {totalItems}
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                    {
                        token === null && (
                            <div className='flex flex-row gap-4 items-center'>
                                <Link to={"/login"}>
                                    <button className='bg-richblack-600 py-[6px] text-center px-3 text-richblack-25 border-[1px] border-richblack-500 rounded-md font-semibold transition-all text-lg duration-200 hover:scale-95'>
                                        Log in
                                    </button>
                                </Link>

                                <Link to={"/signup"}>
                                    <button className='bg-richblack-600 py-[6px] text-center px-3 text-richblack-25 border-[1px] border-richblack-500 rounded-md font-semibold transition-all text-lg duration-200 hover:scale-95'>
                                        Sign up
                                    </button>
                                </Link>
                            </div>
                        )
                    }
                    {
                        token !== null && (
                            <ProfileDropdown />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar