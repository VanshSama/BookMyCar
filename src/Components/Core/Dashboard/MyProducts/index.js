import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productsOfUser } from '../../../../Services/Operations/profileAPI';
import { setEditProduct, setProduct, setStep } from '../../../../Reduer/Slices/productSlice';
import { FaPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { deleteProduct, productDetails } from '../../../../Services/Operations/productAPI';

const MyProducts = () => {
    const {token} = useSelector((state) => state.auth);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let formattedDate = "";
    const productFetching = async () => {
        if(token){
            setLoading(true);
            const response = await productsOfUser(token);

            // console.log("Products :- ", response);
            if(response){
                setProducts(response);
            }
            setLoading(false);
        }
    }

    useEffect(() => {
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, "0");
        const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based
        const year = currentDate.getFullYear();

        formattedDate = `${day}-${month}-${year}`;
        productFetching();
    }, [token]);

    async function editProducthandler(prdId){
        const details = await productDetails(prdId);

        if(details){
            dispatch(setProduct(details));
            dispatch(setStep(1));
            dispatch(setEditProduct(true));
            navigate("/dashboard/add-product");
        }
    }

    async function deleteProductHandler(prdId){
        const response = await deleteProduct(prdId, token);

        if(response){
            productFetching();
        }
    }


    return (
        <div className='flex flex-col gap-5 py-5 px-10 w-full'>
            <div className='flex w-full flex-row justify-between items-center'>
                <div className='flex flex-col gap-3'>
                    <div className='flex text-richblack-25 flex-row gap-1 items-center'>
                        <p>Home/ Dashboard/</p>
                        <span className='text-yellow-50'>My Courses</span>
                    </div>

                    <div className='text-3xl font-edu-sa font-semibold'>
                        My Products
                    </div>
                </div>

                <button className='flex flex-row items-center gap-1 font-semibold text-richblack-900 bg-yellow-50 rounded-md py-2 px-3 hover:scale-95 transition-all duration-200'
                onClick={() => navigate("/dashboard/add-product")}>
                    <FaPlus />
                    <p>Add Product</p>
                </button>
            </div>

            <Table className='w-full flex flex-col rounded-lg h-full border-[1px] border-richblack-25'>
                <Thead className='flex w-full bg-richblack-600 rounded-t-lg border-b-[1px] border-richblack-25 '>
                    <Tr className='flex flex-row w-full text-xl'>
                        <Td className='text-richblack-5 w-[70%] font-semibold border-r-[1px] border-richblack-5 py-2 px-2 text-center'>
                            Product
                        </Td>
                        <Td className='text-richblack-5 w-[20%] font-semibold border-r-[1px] border-richblack-5 py-2 px-2 text-center'>
                            Price
                        </Td>
                        <Td className='text-richblack-5 w-[10%] font-semibold py-2 px-2 text-center'>
                            Actions
                        </Td>
                    </Tr>
                </Thead>
                <Tbody className='w-full flex flex-col'>
                    {
                        products && products.length > 0 && products.map((prd, index) => (
                            <Tr key={index} className={`w-full flex flex-row items-center h-full ${index < products.length - 1 ? "border-b-[1px] border-richblack-25 " : ""}`}>
                                <Td className='flex flex-row gap-2 w-[70%] border-r-[1px] border-richblack-5 py-2 px-2 text-center cursor-pointer'>
                                    <div>
                                        <img src={prd?.thumbnail} className='w-[300px] border-[1px] rounded-md border-richblack-25  h-[150px] object-cover ' />
                                    </div>
                                    <div className='flex flex-col gap-2 items-start'>
                                        <div className='flex flex-col items-start gap-1'>
                                            <p className='text-xl font-semibold font-inter'>
                                                {prd?.productName}
                                            </p>
                                            <p className='font-base text-richblack-200'>
                                                {prd.productDescription.substring(0, 50) + '...'}
                                            </p>
                                        </div>

                                        <div className='text-richblack-25 flex flex-row gap-1 items-center'>
                                            <p>Created At :- </p>
                                            <p>{prd.createdAt ? prd.createdAt : formattedDate}</p>
                                        </div>

                                        <div className='text-richblack-25 flex flex-row gap-1 items-center'>
                                            <p>No. of Customers :-</p>
                                            <p>{prd?.customers.length}</p>
                                        </div>
                                    </div>
                                </Td>
                                <Td className='h-full flex flex-row items-center justify-center w-[20%] border-r-[1px] border-richblack-5 font-semibold text-xl py-2 px-2 text-center'>
                                    $ {prd.price}
                                </Td>
                                <Td className='flex flex-row gap-5 w-[10%] items-center px-5 text-center'>
                                    <MdModeEdit className='w-[30px] h-[30px] cursor-pointer ' 
                                    onClick={() => editProducthandler(prd._id)}/>

                                    <MdDelete className='w-[30px] h-[30px] cursor-pointer' 
                                    onClick={() => deleteProductHandler(prd._id)} />
                                </Td>
                            </Tr>
                        ))
                    }
                </Tbody>
            </Table>
        </div>
    )
}

export default MyProducts
