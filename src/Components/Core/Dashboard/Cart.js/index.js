import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import RenderCartProducts from './RenderCartProducts';
import RenderTotalAmount from './RenderTotalAmount';

const Cart = () => {
    const {totalItems} = useSelector((state) => state.cart)

    return (
        <div className='w-full flex flex-col py-6 lg:pr-[120px] pl-1 lg:pl-6 gap-6 '>
        <div className='flex flex-col gap-3'>
            <div className='flex flex-row items-center gap-1 text-sm font-inter text-richblack-300 '>
                {"Home / Dashboard /"}
                <span className='text-yellow-50'>{"Cart"}</span>
            </div>

            <h1 className='text-3xl font-inter font-medium text-richblack-5'>
                Your Cart
            </h1>
        </div>

        <div className='text-base font-semibold font-inter text-richblack-400'>
            {totalItems} Courses in Cart
        </div>

        <div className='w-full flex flex-row place-items-center border-t-[1px] border-richblack-600'>
            {
                totalItems > 0 ? (
                    <div className='w-full flex flex-col lg:flex-row gap-5 justify-between'>
                        <RenderCartProducts />
                        <RenderTotalAmount />
                    </div>
                ) : (
                <div className='w-full h-full text-center text-richblack-5 text-3xl font-inter font-medium'>
                    Your Cart is Empty
                </div>)
            }
        </div>
    </div>
    )
}

export default Cart
