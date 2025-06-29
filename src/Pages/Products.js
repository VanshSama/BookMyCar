import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getAllProducts } from '../Services/Operations/productAPI';
import Swiperr from '../Components/Core/Products/Swiperr';

const Product = () => {
    const location = useLocation();
    const [currentProductType, setCurrentProductType] = useState("car");
    // const [showProducts, setShowProducts] = useState([]);
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [remProducts, setRemProducts] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const matchRoute = () => {
            let prd = location.pathname.split("/").at(-1);
    
            setCurrentProductType(prd);
        }
    
        async function getDetails() {
            const response = await getAllProducts();

            if(response){
                // setShowProducts(response);
                setCategoryProducts(response.filter((prd) => (prd.productType.toLowerCase() === currentProductType)));

                setRemProducts(response.filter((prd) => (prd.productType.toLowerCase() !== currentProductType)));
            }
        }

        matchRoute();
        getDetails();
    }, [location]);

    return (
        <div className='flex flex-col w-full h-full items-center pb-20'>
            <div className='w-full flex flex-col items-center bg-richblack-600'>
                <div className='flex flex-col w-10/12 px-4 pt-5 pb-10 gap-1'>
                    <div className='text-richblack-25 flex flex-row gap-1 text-base font-semibold font-mono'>
                        <p>
                            Home / Product /
                        </p>

                        <span className='text-yellow-50 capitalize '>
                            {currentProductType}
                        </span>
                    </div>

                    <div className='font-semibold text-3xl font-edu-sa capitalize'>
                        {currentProductType}
                    </div>

                    <div className='font-sm text-richblack-100'>
                        Here is your {currentProductType} products
                    </div>
                </div>
            </div>

            <div className='w-full flex flex-col items-center'>
                <div className='flex flex-col w-10/12 px-4 pt-10 pb-5 gap-5'>
                    <div className='flex flex-col gap-1'>
                        <div className='text-2xl font-semibold '>
                            Products you want.
                        </div>

                        <div className='flex flex-row gap-3 items-center'>
                            <p className='text-yellow-50 border-b-[1px]'>
                                Most Popular
                            </p>

                            <p>
                                New
                            </p>
                        </div>
                    </div>

                    <div>
                        {
                            categoryProducts.length > 0 ? (
                                <Swiperr showProducts={categoryProducts} />
                            ) : (
                                <div className='text-lg font-semibold text-richblack-25'>
                                    No Products found.
                                </div>
                            )
                        }
                    </div>
                </div>

                <div className='flex flex-col w-10/12 px-4 pt-10 pb-5 gap-5'>
                    <div className='flex flex-col gap-1'>
                        <div className='text-2xl font-semibold '>
                            Other products you may also like
                        </div>

                        <div className='flex flex-row gap-3 items-center'>
                            <p className='text-yellow-50 border-b-[1px]'>
                                Most Popular
                            </p>

                            <p>
                                New
                            </p>
                        </div>
                    </div>

                    <div >
                        {
                            remProducts.length > 0 ? (
                                <div className='grid grid-cols-3 w-full justify-center items-center gap-3'>
                                    {
                                        remProducts.map((prd, index) => (
                                            <Link key={index} to={`/product/${prd._id}`}
                                            className='rounded-md border-[1px] border-richblack-5 text-richblack-5 w-[100%] flex flex-col gap-2 cursor-pointer select-none pb-2'>
                                                <img src={prd?.thumbnail} alt='product-image'
                                                className='w-[400px] h-[200px] border-b-[1px] object-cover rounded-t-md'/>

                                                <div className='flex flex-col gap-[2px] px-2 py-1'>
                                                    <p className='text-lg font-semibold text-richblack-50 font-mono'>
                                                        Name :- {prd?.productName}
                                                    </p>

                                                    <p className='text-lg font-mono text-richblack-50'>
                                                        Description :- {prd?.productDescription.substr(0, 100)}
                                                    </p>

                                                    <p className='text-lg font-mono font-semibold text-richblack-50'>
                                                        Price :-
                                                        <span className='text-yellow-50'>{" Rs. " + prd?.price}</span>
                                                    </p>
                                                </div>

                                                <button className='text-richblack-900 font-semibold bg-richblack-500 py-2 mx-2 rounded-md hover:scale-95 transition-all duration-200'>
                                                    Buy Now
                                                </button>
                                            </Link>
                                        ))
                                    }
                                </div>
                            ) : (
                                <div className='text-lg font-semibold text-richblack-25'>
                                    No products found.
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product
