import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setEditProduct, setProduct, setStep } from '../../../../Reduer/Slices/productSlice';
import { addProductDetails, editProductDetails } from '../../../../Services/Operations/productAPI';
import { useNavigate } from 'react-router-dom';

const ProductDetails = () => {
    const dispatch = useDispatch();
    const [inputColor, setInputColor] = useState("");
    const {token} = useSelector((state) => state.auth);
    const {editProduct, product} = useSelector((state) => state.product);
    const navigate = useNavigate();
    const [colors, setColors] = useState([]);
    const {
        register, handleSubmit, reset, setValue, getValues, 
        formState: {errors}
    } = useForm();

    useEffect(() => {
        if(editProduct && product?.productDetails){
            const data = product.productDetails;

            setValue("brandModel", data?.brandModel);
            setValue("yearOfManufacture", data?.yearOfManufacture);
            setValue("fuelType", data?.fuelType);
            setValue("transmission", data?.transmission);
            setValue("vehicleType", data?.vehicleType);
            setValue("seatingCapacity", data?.seatingCapacity);
            setValue("mileage", data?.mileage);
            setValue("bodyType", data?.bodyType);
            setColors(data?.color);
            setValue("engineCapacity", data?.engineCapacity);
            setValue("powerOutput", data?.powerOutput);
            setValue("torque", data?.torque);
            setValue("topSpeed", data?.topSpeed);
            setValue("acceleration", data?.acceleration);
            setValue("fuelTankCapacity", data?.fuelTankCapacity);
            setValue("groundClearance", data?.groundClearance);
            setValue("odometerReading", data?.odometerReading);
            setValue("numberOfOwners", data?.numberOfOwners);
            setValue("tyreType", data?.tyreType);
        }
    }, [])

    const colorAddHandler = (event) => {
        event.preventDefault();
        if(event.key === 'Enter'){
            setColors((prev) => ([...prev, inputColor]))
            setInputColor("");
        }
    }

    const submitHandler = async (data) => {
        if(editProduct){
            const formData = new FormData();

            formData.append("productId", product._id);
            formData.append("brandModel", data?.brandModel);
            formData.append("yearOfManufacture", data?.yearOfManufacture);
            formData.append("fuelType", data?.fuelType);
            formData.append("transmission", data?.transmission);
            formData.append("vehicleType", data?.vehicleType);
            formData.append("seatingCapacity", data?.seatingCapacity);
            formData.append("mileage", data?.mileage);
            formData.append("bodyType", data?.bodyType);
            formData.append("color", colors);
            formData.append("engineCapacity", data?.engineCapacity);
            formData.append("powerOutput", data?.powerOutput);
            formData.append("torque", data?.torque);
            formData.append("topSpeed", data?.topSpeed);
            formData.append("acceleration", data?.acceleration);
            formData.append("fuelTankCapacity", data?.fuelTankCapacity);
            formData.append("groundClearance", data?.groundClearance);
            formData.append("odometerReading", data?.odometerReading);
            formData.append("numberOfOwners", data?.numberOfOwners);
            formData.append("tyreType", data?.tyreType);

            const response = await editProductDetails(formData, token);

            if(response){
                navigate("/dashboard/my-products");
                dispatch(setStep(1));
                dispatch(setProduct(null));
                dispatch(setEditProduct(false));
            }
        }
        else{
            const formData = new FormData();

            formData.append("productId", product._id);
            formData.append("brandModel", data?.brandModel);
            formData.append("yearOfManufacture", data?.yearOfManufacture);
            formData.append("fuelType", data?.fuelType);
            formData.append("transmission", data?.transmission);
            formData.append("vehicleType", data?.vehicleType);
            formData.append("seatingCapacity", data?.seatingCapacity);
            formData.append("mileage", data?.mileage);
            formData.append("bodyType", data?.bodyType);
            formData.append("color", colors);
            formData.append("engineCapacity", data?.engineCapacity);
            formData.append("powerOutput", data?.powerOutput);
            formData.append("torque", data?.torque);
            formData.append("topSpeed", data?.topSpeed);
            formData.append("acceleration", data?.acceleration);
            formData.append("fuelTankCapacity", data?.fuelTankCapacity);
            formData.append("groundClearance", data?.groundClearance);
            formData.append("odometerReading", data?.odometerReading);
            formData.append("numberOfOwners", data?.numberOfOwners);
            formData.append("tyreType", data?.tyreType);

            const response = await addProductDetails(formData, token);
            // console.log("Product :- ", response);

            if(response){
                navigate("/dashboard/my-products");
                dispatch(setStep(1));
                dispatch(setProduct(null));
                dispatch(setEditProduct(false));
            }
        }
    }

    const details = [
        {
            id: 1,
            name: "Brand & Model",
            class: "brandModel",
            type: "text"
        },
        {
            id: 2,
            name: "Year of manufacture",
            class: "yearOfManufacture",
            type: "Date",
        },
        {
            id: 3,
            name: "Fuel Type",
            class: "fuelType",
            type: "Select",
            options:  ["Select fuel type", "Petrol", "Diesel", "Electric", "Hybrid", "CNG"]
        },
        {
            id: 4,
            name: "Transmission",
            class: "transmission",
            type: "Select",
            options: ["Select transmission type", "Manual", "Automatic"]
        },
        {
            id: 5,
            name: "Vehicle Type",
            class: "vehicleType",
            type: "Select", 
            options: ["Select vehicle type", "SUV", "Sedan", "Hatchback", "Cruiser", "Sports", "Others"]
        },
        {
            id: 6,
            name: "Seating Capacity",
            class: "seatingCapacity",
            type: "text",
        },
        {
            id: 7,
            name: "Mileage",
            class: "mileage",
            type: "text",
            in: "(in Km / litre)"
        },
        {
            id: 8,
            name: "Body Type",
            class: "bodyType",
            type: "text",
        },
        {
            id: 9,
            name: "Engine Capacity",
            class: "engineCapacity",
            type: "text",
            in: "(in cc)"
        },
        {
            id: 10,
            name: "Power Output",
            class: "powerOutput",
            type: "text",
            in: "(in HP)"
        },
        {
            id: 11,
            name: "Torque",
            class: "torque",
            type: "text",
            in: "(in Nm)"
        },
        {
            id: 12,
            name: "Top Speed",
            class: "topSpeed",
            type: "text",
            in: "(in Km / h)"
        },
        {
            id: 13,
            name: "Acceleration",
            class: "acceleration",
            type: "text",
            in: "(in Km / h)"
        },
        {
            id: 14,
            name: "Fuel tank Capacity",
            class: "fuelTankCapacity",
            type: "text",
            in: "(in Liters)"
        },
        {
            id: 15,
            name: "Ground Clearance",
            class: "groundClearance",
            type: "Select", 
            options: ["Select ground clearance", "Yes", "No"]
        },
        {
            id: 16,
            name: "Odometer Reading",
            class: "odometerReading",
            type: "text",
            in: "(in Km)"
        },
        {
            id: 17,
            name: "Number of prev. Owners",
            class: "numberOfOwners",
            type: "text",
        },
        {
            id: 18,
            name: "Tyre Type",
            class: "tyreType",
            type: "Select",
            options: ["Select tyre type", "Tubeless", "Radial", "Alloy Wheels", "Others"]
        },
        {
            id: 19,
            name: "Braking System",
            class: "brakingSystem",
            type: "Select",
            options: ["Select braking type", "Disc", "Drum", "ABS", "CBS"]
        },
    ]

    return (
        <div className='flex w-full items-center gap-5 flex-col px-2 py-2'>
            <div className='flex flex-col w-[70%] items-center gap-5 px-2 py-2'>
                <div className='text-3xl font-semibold font-edu-sa border-[1px] px-2 py-2 rounded-md border-richblack-5'>
                    Product Additional Details
                </div>

                <form className='flex flex-col gap-5 w-full' 
                onSubmit={handleSubmit(submitHandler)}>
                    {
                        details.map((detail, index) => (
                            <div key={index} className='flex flex-col gap-[6px] w-full'>
                                <label htmlFor={detail.class}
                                className='flex items-center gap-[2px]'>
                                    {detail.name} {detail?.in}
                                </label>

                                {
                                    detail.type === "text" && (<input 
                                        onChange={(e) => e.stopPropagation()}
                                        type='text'
                                        name={detail.class}
                                        placeholder={`Enter ${detail.name}`}
                                        id={detail.class}
                                        {...register(detail.class)}
                                        className='flex rounded-lg p-3 gap-[12px] bg-richblack-700'
                                    />)
                                }
                                {
                                    detail.type === "Date" && (<input 
                                        onChange={(e) => e.stopPropagation()}
                                        type='Date'
                                        name={detail.class}
                                        placeholder={`Enter ${detail.name}`}
                                        id={detail.class}
                                        {...register(detail.class)}
                                        className='flex w-full rounded-lg p-3 gap-[12px] bg-richblack-700'
                                    />)
                                }
                                {
                                    detail.type === "Select" && (
                                        <select className='flex rounded-lg p-3 gap-[12px] bg-richblack-700'
                                        onChange={(e) => e.stopPropagation()}
                                        {...register(detail.class)} name={detail.class} id={detail.class}>{
                                            detail.options.map((opt) => (
                                                <option key={opt.id} value={opt} className={`${opt.id === 0 ? "disabled" : ""}`}>{opt}</option>
                                            ))
                                            }
                                        </select>
                                    )
                                }
                            </div>
                        ))
                    }

                        {/* Colors */}
                    <div className='flex flex-col gap-[6px] w-full'>
                        <label htmlFor='color'
                        className='flex items-center gap-[2px]'>
                            Colors Available
                        </label>

                        {
                            colors && colors.length > 0 && (
                                <div className='flex flex-wrap gap-2 text-richblack-900 font-semibold '>
                                    {
                                        colors.map((color) => (
                                            <div className='flex flex-row bg-yellow-50 px-1 rounded-lg text-xs py-1 text-richblack-900'>
                                                {color}
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        }
                        <input 
                            type='text'
                            name='color'
                            placeholder='Enter Colors and press enter'
                            id='color'
                            onSubmit={(e) => e.stopPropagation()}
                            onChange={(e) => setInputColor(e.target.value)}
                            value={inputColor}
                            className='flex rounded-lg p-3 gap-[12px] bg-richblack-700'
                            onKeyUp={colorAddHandler}
                        />
                    </div>

                        {/* Accident History & Service History */}
                    
                        {/* Button */}
                    <div className='flex w-full flex-row justify-between items-center'>
                        <button type='button' className='px-6 py-2 font-semibold bg-richblack-500 rounded-md transition-all duration-200 hover:scale-95 ' onClick={() => dispatch(setStep(2))}>
                            Back
                        </button>
    
                        <button type='submit' className='px-6 py-2 font-semibold text-richblack-900 bg-yellow-50 rounded-md transition-all duration-200 hover:scale-95'>
                            Next
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductDetails
