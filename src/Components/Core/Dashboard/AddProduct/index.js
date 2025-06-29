import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { BsCheck } from "react-icons/bs";
import ProductInformation from './ProductInformation';
import ProductPics from './ProductPics';
import ProductDetails from './ProductDetails';


const AddProduct = () => {
    const {step} = useSelector((state) => state.product);

    const createSteps = [
        {
            id: 1, 
            name: "Product Information"
        },
        {
            id: 2,
            name: "Product Visuals"
        },
        {
            id: 3,
            name: "Additional Details",
        }
    ]

    return (
        <div className='flex flex-row w-full h-full px-4 py-2'>
            <div className='flex flex-col w-full gap-5 px-4 py-3'>
                <div className='text-richblack-5 text-4xl font-semibold font-edu-sa'>
                    Add Product
                </div>

                <div className='flex flex-row w-full justify-between items-center gap-5'>
                    {
                        createSteps.map((st) => (
                            <div key={st.id} className='flex flex-col gap-1 items-center'>
                                <div className={` flex flex-row items-center justify-center font-semibold w-[25px] h-[25px] rounded-full text-center ${st.id >= step ? "text-richblack-25 bg-richblack-500" : "bg-yellow-800 text-yellow-25"}`}>
                                    {
                                        st.id >= step ? (st.id) : (<BsCheck className='w-[25px] h-[25px] text-center ' />)
                                    }
                                </div>
                                <p className={`text-base font-semibold ${st.id >= step ? "text-richblack-25 " : " text-yellow-25"}`}>
                                    {st.name}
                                </p>
                            </div>
                        ))
                    }
                </div>
                
                {
                    step === 1 && <ProductInformation />
                }
                {
                    step === 2 && <ProductPics />
                }
                {
                    step === 3 && <ProductDetails />
                }
            </div>
        </div>
    )
}

export default AddProduct
