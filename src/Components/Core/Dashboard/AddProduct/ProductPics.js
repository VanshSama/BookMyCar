import React, { useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { setProduct, setStep } from '../../../../Reduer/Slices/productSlice';
import { productVisuals } from '../../../../Services/Operations/productAPI';

const ProductPics = () => {
    const [files, setFiles] = useState([]);
    const [prevFile, setPrevFiles] = useState([]);
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);
    const {product} = useSelector((state) => state.product);

    useEffect(() => {
        if(product && product.images.length > 0){
            setPrevFiles(product.images);
        }
    }, [product])

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        const newFiles = selectedFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const removeFile = (file) => {
        setFiles(files.filter((f) => f !== file));
    }

    const handleSubmit = async () => {
        const formData = new FormData();
    
        formData.append("productId", product._id);
        files.forEach((file) => {
            formData.append("Visual", file.file);
        })

        const response = await productVisuals(formData, token);
        // console.log("Response :- ", response);
        if(response){
            setFiles([]);
            dispatch(setStep(3));
            dispatch(setProduct(response));
        }
    }

    return (
        <div className='flex w-full items-center gap-5 flex-col px-2 py-2'>
            <div className='flex flex-col w-[70%] items-center gap-5 px-2 py-2'>
                <div className='text-3xl font-semibold font-edu-sa border-[1px] px-2 py-2 rounded-md border-richblack-5'>
                    Product Visuals
                </div>

                <div className='text-xl flex flex-col items-center font-semibold font-edu-sa text-richblack-100'>
                    <p>Click on the plus (+) icon to add visual.</p>
                    <p>Click on the cross (×) icon to remove particulare visual.</p>
                </div>
                
                <div className='grid mx-auto grid-cols-3 gap-3'>
                    {
                        prevFile && prevFile.length > 0 && (
                            prevFile.map((file, index) => (
                                <div key={index} className='relative z-10'>
                                    <img src={file} className='w-[200px] border-[1px] border-richblack-25 h-[250px] object-cover rounded-lg'/>
                                </div>
                            ))
                        )
                    }
                    {
                        files && files.length > 0 && (
                            files.map((file, index) => (
                                <div key={index} className='relative z-10'>
                                    <img src={file.preview} className='w-[200px] border-[1px] border-richblack-25 h-[250px] object-cover rounded-lg'/>
                                    <RxCross2 className='absolute text-richblack-5 bg-richblack-400 w-[25px] h-[25px] rounded-full px-1 py-1 -top-1 -right-1 cursor-pointer' onClick={() => removeFile(file)}/>
                                </div>
                            ))
                        )
                    }
                    <label htmlFor='image'>
                        <FaPlus className='cursor-pointer w-[200px] h-[250px] rounded-lg py-8 px-6 text-richblack-900 bg-richblack-5'/>
                    </label>

                    <input 
                    type='file'
                    id='image'
                    name='image'
                    accept='image/*'
                    onChange={handleFileChange}
                    className='hidden'
                    multiplex
                    />
                </div>

                <div className='flex w-full flex-row justify-between items-center'>
                    <button className='px-6 py-2 font-semibold bg-richblack-500 rounded-md transition-all duration-200 hover:scale-95 ' onClick={() => dispatch(setStep(1))}>
                        Back
                    </button>

                    <button className='px-6 py-2 font-semibold text-richblack-900 bg-yellow-50 rounded-md transition-all duration-200 hover:scale-95' onClick={handleSubmit}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductPics
