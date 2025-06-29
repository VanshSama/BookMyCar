import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { productDetails } from '../Services/Operations/productAPI';
import toast from 'react-hot-toast';
import { Table, Tbody, Td, Thead, Tr } from 'react-super-responsive-table';
import Swiperr from '../Components/Core/Products/Swiperr';
import { IoIosShareAlt } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../Reduer/Slices/cartSlice';
import copy from 'copy-to-clipboard';
import { buyCourse } from '../Services/Operations/customerOperations';

const Product = () => {
    const location = useLocation();
    const [prdId, setPrdId] = useState(null);
    const [productInfo, setProductInfo] = useState(null);
    const [productAdditionalInfo, setProductAdditionalInfo] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const {token} = useSelector(state => state.auth)
    const {user} = useSelector(state => state.profile)
    const navigate = useNavigate();

    const infoFind = async () => {
        const response = await productDetails(prdId);

        // console.log("Response :- ", response);
        if(response){
            setProductInfo(response);
            toast.success("Info. fetched");
            setLoading(false);

            Object?.keys(response?.productDetails).map((key) => (
                key[0] !== '_' && setProductAdditionalInfo((prev) => [...prev, {
                    name: key,
                    value: response.productDetails[key]
                }])
            ))
        }
        
    }

    const splitByCapital = (str) => {
        let ans = "";
        for(let i=0;i<str.length;i++){
            if(str[i] >= 'A' && str[i] <= 'Z'){
                ans += " ";
            }
            ans += str[i];
        }
        return ans;
    }

    useEffect(() => {
        setLoading(true);
        if(prdId && ! productInfo){
            infoFind();
        }
        // console.log(productInfo)
        setLoading(false);
    }, [prdId])

    useEffect(() => {
        let id = location.pathname.split('/').at(-1);
        setPrdId(id);
    }, [location])

    function addToCartHandler() {
        dispatch(addToCart(productInfo));
    }

    function handleBuyProduct(){
        const products = [productInfo]

        // TODO :- API Integrate --> Take to payment gateway
        buyCourse(token, products, user, navigate, dispatch);
    }
    async function copyHandler(){
        copy(window.location.href);
        toast.success("Copied to Clipboard")
    }

    return (
        <div className='flex flex-col gap-2 justify-center items-center w-full h-full'>
            {
                loading ? (<div className='loader my-auto'></div>) : (
                    <div className='flex flex-col gap-2 justify-center w-full h-full'>
                        <div className='flex flex-col py-6 w-full bg-richblack-600 items-center gap-1'>
                            <div className='w-10/12 flex flex-col items-center gap-1'>
                                <div className='text-4xl font-semibold border-[1px] border-yellow-50 px-2 py-2 rounded-md font-mono text-yellow-50'>
                                    {productInfo?.productName}
                                </div>

                                <div className='text-lg text-center font-semibold font-mono text-richblack-100'>
                                    {productInfo?.productDescription}
                                </div>

                                <div className='flex flex-row items-center gap-5'>
                                    <div className='flex flex-row gap-1 items-center'>
                                        <p className='font-semibold'>
                                            Owner :- 
                                        </p>
                                        <span className='text-richblack-100'>
                                            {productInfo?.owner?.firstName + " " + productInfo?.owner?.lastName}
                                        </span>
                                    </div>

                                    <div className='flex flex-row gap-1 items-center'>
                                        <p className='font-semibold'>
                                            Contact Info. :- 
                                        </p>
                                        <p className='text-richblack-100'>
                                            {productInfo?.owner?.contactNo}
                                        </p>
                                    </div>

                                    <div className='flex flex-row gap-1 items-center'>
                                        <p className='font-semibold'>
                                            Email :- 
                                        </p>
                                        <p className='text-richblack-100'>
                                            {productInfo?.owner?.email}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='w-10/12 mx-auto flex flex-row pt-5 justify-center gap-2 pb-10'>
                            <div className='w-[70%] flex flex-col gap-10'>
                                <div className='w-full'>
                                    <div className='text-xl font-mono font-semibold '>
                                        Additonal Images :- 
                                    </div>

                                    {
                                        productInfo?.images && productInfo.images.length > 0 ? (
                                            <Swiperr showProducts={productInfo?.images} />
                                        ) : (
                                            <div className='text-base font-inter'>
                                                No additional images has been uploaded yet.
                                            </div>
                                        )
                                    }
                                    
                                </div>

                                <Table className='flex w-full flex-col border-[1px] border-richblack-5 rounded-lg bg-richblack-600'>
                                    <Thead className='w-full bg-richblack-25 border-b-[1px] px-2 text-richblack-900 font-semibold font-mono text-lg rounded-t-lg'>
                                        <Tr className='w-full flex flex-row gap-4 justify-between items-center'>
                                            <Td className='w-[60%] text-center border-r-2 py-2 border-richblack-900 '>
                                                Properties
                                            </Td>

                                            <Td className='mx-auto text-center py-2'>
                                                Values
                                            </Td>
                                        </Tr>
                                    </Thead>
                                    <Tbody className={`w-full`}>
                                        {
                                            productAdditionalInfo.length > 0 && productAdditionalInfo.map((prd, index) => (
                                                <Tr key={index} 
                                                className={`px-2 flex flex-row items-center w-full justify-between ${index < productAdditionalInfo.length - 1 ? "border-b-[1px] border-richblack-5 " : ""} `}>
                                                    <Td className='capitalize text-base font-semibold border-r-2 py-2 border-richblack-5 w-[60%]'>
                                                        {splitByCapital(prd.name)}
                                                    </Td>
                                                    <Td className='font-semibold'>
                                                        {prd?.value ? prd.value : "-"}
                                                    </Td>
                                                </Tr>
                                            ))
                                        }
                                    </Tbody>
                                </Table>
                            </div>

                            <div className='flex w-[30%] h-full flex-col rounded-lg items-center border-[1px] border-richblack-5 gap-3 '>
                                <img src={productInfo?.thumbnail} className='flex border-b-[1px] rounded-t-lg object-cover flex-row w-full h-[200px]' />

                                <div className='flex w-full flex-col pb-2 gap-2'>
                                    <div className='px-4 text-2xl font-semibold font-mono text-yellow-50 '>
                                        Rs. {productInfo?.price}
                                    </div>
                                    <div className='flex px-2 w-full flex-col gap-1'>
                                        <button className='py-2 font-semibold text-richblack-900 text-lg bg-yellow-50 rounded-lg hover:scale-95 duration-200 transition-all '
                                        onClick={handleBuyProduct}>
                                            Buy Now
                                        </button>
                                        
                                        <button className='py-2 font-semibold text-richblack-900 text-lg bg-richblack-500 rounded-lg hover:scale-95 duration-200 transition-all' 
                                        onClick={addToCartHandler}>
                                            Add to Cart
                                        </button>
                                    </div>

                                    <div className='text-richblack-100 font-semibold text-center'>
                                        30 days money back gurantee
                                    </div>

                                    <div className='text-yellow-50 flex flex-row items-center justify-center gap-1 py-2 mx-2 rounded-lg transition-all duration-200 cursor-pointer hover:bg-richblack-500 font-semibold text-center'
                                    onClick={copyHandler}>
                                        <IoIosShareAlt />
                                        <p>Share</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Product
