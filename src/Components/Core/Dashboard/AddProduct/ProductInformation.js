import React, { useEffect } from 'react'
import { Form, useForm } from 'react-hook-form';
import Upload from '../../../Common/Upload';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { createProduct, editProductDetails, editProductInformation } from '../../../../Services/Operations/productAPI';
import { setProduct, setStep } from '../../../../Reduer/Slices/productSlice';

const ProductInformation = () => {
    const {step, editProduct, product} = useSelector((state) => state.product);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const {register, handleSubmit, reset, setValue, getValues,
        formState: {errors}
    } = useForm();

    useEffect(() => {
        if(editProduct || product){
            setValue("productName", product.productName);
            setValue("productDescription", product.productDescription);
            setValue("productType", product.productType);
            setValue("price", product.price);
            setValue('thumbnail', product.thumbnail);
        }
    }, []);

    const submitHandler = async (data) => {
        if(editProduct){
            const formData = new FormData();
            // console.log("Data :- ", data);

            formData.append('productId', product._id);
            formData.append("productName", data.productName);
            formData.append("productDescription", data.productDescription);
            formData.append("productType", data.productType);
            formData.append("price", data.price);
            formData.append("thumbnail", data.thumbnail);

            const response = await editProductInformation(formData, token);

            // console.log("Response :- ", response);
            if(response){
                dispatch(setStep(2));
                dispatch(setProduct(response));
            }
        }
        else{
            const formData = new FormData();

            formData.append("productName", data.productName);
            formData.append("productDescription", data.productDescription);
            formData.append("productType", data.productType);
            formData.append("price", data.price);
            formData.append("thumbnail", data.thumbnail);

            const response = await createProduct(formData, token);
            // console.log("Add Response :- ", response);

            if(response){
                dispatch(setStep(2));
                dispatch(setProduct(response));
            }
        }
    }

    return (
        <div className='flex w-full items-center gap-5 flex-col px-2 py-2'>
            <div className='text-3xl font-semibold font-edu-sa border-[1px] px-2 py-2 rounded-md border-richblack-5'>
                Product Information
            </div>
            
            <form className='flex w-[70%] flex-col gap-3' onSubmit={handleSubmit(submitHandler)}>
                {/* Product Name */}
                <div className='flex flex-col gap-[6px] w-full'>
                    <label htmlFor='productName'
                    className='flex items-center gap-[2px]'>
                        Product Name<sup className='text-[#EF476F]'>*</sup>
                    </label>
                    <input 
                        type='text'
                        name='productName'
                        placeholder='Enter Product Name'
                        id='productName'
                        {...register("productName", {required: true})}
                        className='flex rounded-lg p-3 gap-[12px] bg-richblack-700'
                    />
                    {
                        errors.productName && (
                            <span>
                                Please enter product Name
                            </span>
                        )
                    }
                </div>

                {/* Product Description */}
                <div className='flex flex-col gap-[6px] w-full'>
                    <label htmlFor='productDescription'
                    className='flex items-center gap-[2px]'>
                        Product Description<sup className='text-[#EF476F]'>*</sup>
                    </label>
                    <textarea 
                        name='productDescription'
                        placeholder='Enter Product Description'
                        id='productDescription'
                        {...register("productDescription", {required: true})}
                        className='flex rounded-lg p-3 gap-[12px] bg-richblack-700'
                    />
                    {
                        errors.productDescription && (
                            <span>
                                Please enter product Description
                            </span>
                        )
                    }
                </div>

                {/* Product Type */}
                <div className='flex flex-col gap-[6px] w-full'>
                    <label htmlFor='productType'
                    className='flex items-center gap-[2px]'>
                        Product Type<sup className='text-[#EF476F]'>*</sup>
                    </label>
                    <select 
                        name='productType'
                        id='productType'
                        {...register("productType", {required: true})}
                        className='flex rounded-lg p-3 gap-[12px] bg-richblack-700'
                    >
                        <option >Select Product Type</option>
                        <option value={"Car"}>Car</option>
                        <option value={"Bike"}>Bike</option>
                        <option value={"Spare part"}>Spare part</option>
                        <option value={""}>Others</option>
                    </select>
                    {
                        errors.productType && (
                            <span>
                                Please Select product Type
                            </span>
                        )
                    }
                </div>

                {/* Price */}
                <div className='flex flex-col gap-[6px] w-full'>
                    <label htmlFor='price'
                    className='flex items-center gap-[2px]'>
                        Price<sup className='text-[#EF476F]'>*</sup>
                    </label>
                    <input 
                        type='text'
                        name='price'
                        placeholder='Enter Price'
                        id='price'
                        {...register("price", {required: true})}
                        className='flex rounded-lg p-3 gap-[12px] bg-richblack-700'
                    />
                    {
                        errors.price && (
                            <span>
                                Please enter price
                            </span>
                        )
                    }
                </div>

                {/* Thumbnail */}
                <div className='flex flex-col gap-[6px] w-full '>
                    <label htmlFor="thumbnail"
                    className='flex items-center gap-[2px]'>
                        Thumbnail<sup className='text-[#EF476F]'>*</sup>
                    </label>

                    <Upload name="thumbnail" viewData={null} label="Product Thumbnail" register={register} errors={errors} setValue={setValue} getValues={getValues} accepted="image/*" file={product ? product.thumbnail : null} />
                </div>

                {/* Button to move next */}
                <button type='submit' className='py-2 px-4 bg-yellow-50 text-center text-richblack-900 font-semibold rounded-md font-inter transition-all duration-200 hover:scale-95'>
                    Next
                </button>
            </form>
        </div>
    )
}

export default ProductInformation
