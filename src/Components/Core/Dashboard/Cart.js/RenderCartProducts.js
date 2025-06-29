import React from 'react'
import { IoIosStarOutline, IoMdStar } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { RiDeleteBin5Fill } from "react-icons/ri";
import ReactStars from 'react-stars'
import { removeFromCart } from '../../../../Reduer/Slices/cartSlice';

const RenderCartCourses = () => {
    const {cart} = useSelector((state) => state.cart)
    const dispatch = useDispatch();

    return (
        <div className='w-full flex flex-col gap-[33px] '>
        {
            cart && cart?.map((prd) => 
                 (<div key={prd._id} className='w-full border-[1px] py-4 rounded-md bg-richblack-700 border-richblack-600 flex flex-col lg:flex-row px-6 justify-between gap-5  '>
                    <div className='flex flex-col lg:flex-row gap-5'>
                        <img src={prd?.thumbnail} className='w-full lg:w-[185px] h-[148px] rounded-lg object-cover border-richblack-5 border-[1px] '/>

                        <div className='flex flex-col gap-[9px]  '>
                            <p className='text-lg font-inter font-medium text-richblack-5'>
                                {prd?.productName}
                            </p>
                            <p className='font-inter text-base text-richblack-300'>
                                {prd?.productDescription}
                            </p>
                            {/* <p className='font-inter text-base text-richblack-300'>
                                {prd?.category?.name}
                            </p> */}

                            <div className='flex flex-row items-center gap-2 font-inter text-base font-semibold'>
                                <span className='text-yellow-100'>4.8</span>
                                <ReactStars 
                                count={5}
                                size={20}
                                edit={false}
                                activeColor="#ffd700"
                                emptyIcon={<IoIosStarOutline />}
                                fullIcon={<IoMdStar />}
                                />
                                <span className='text-richblack-400'>{prd?.ratingAndReviews?.length || 0} Ratings</span>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col-reverse lg:flex-col gap-5'>
                        <button onClick={() => {
                            dispatch(removeFromCart(prd))
                        }}
                        className='flex flex-row justify-center gap-2 text-base font-medium font-inter text-center text-[#EF476F] items-center p-3 border-[1px] border-richblack-600 rounded-lg bg-richblack-600 hover:scale-95 duration-200 transition-all '>
                            <RiDeleteBin5Fill />
                            <span>Remove</span>
                        </button>
                        
                        <p className='text-2xl font-inter font-semibold text-yellow-50'>Rs. {prd?.price}</p>
                    </div>
                </div>)
            )
        }
        </div>
    )
}

export default RenderCartCourses
