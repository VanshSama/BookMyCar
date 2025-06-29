import React from 'react'
import {useForm} from 'react-hook-form'
import codes from "../../Data/countrycode.json"
import { useState, useEffect } from 'react'
import { apiConnector } from '../../Services/apiConnector'
// import { contactusEndpoint } from '../../Services/apis'
import toast from 'react-hot-toast'

const ContactUsForm = () => {
    const [loading, setLoading] = useState(false);

    const{
        register, handleSubmit, reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm();

    useEffect(() => {
        if(! isSubmitSuccessful){
            reset({
                email: "",
                firstName: "",
                lastName: "",
                message: "",
                phoneno: "",
            })
        }
    }, [isSubmitSuccessful, reset]);

    const submitContactForm = async(data) => {
        console.log("Contact us data :- ", data);
        setLoading(true);
        const toastId = toast.loading("Loading...");
        try{
            // const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);

            toast.success("Message sent successfull");
            // console.log("Contact us Response", response);
        }
        catch(error){
            console.log("Error while sending message", error);
            toast.error("Error while sending message");
        }
        setLoading(false);
        toast.dismiss(toastId);
    }

  return (
    <form onSubmit={handleSubmit(submitContactForm)} className='text-richblack-25  flex flex-col gap-9'>
        <div className='flex flex-col gap-5'>
            {/* First Name - Last Name  */}
            <div className='flex flex-col md:flex-row items-center gap-3'>
                <div className='flex flex-col gap-[6px] w-full'>
                    <label htmlFor='firstName'
                    className='flex items-center gap-[2px]'>
                        First Name<sup className='text-[#EF476F]'>*</sup>
                    </label>
                    <input 
                        type='text'
                        name='firstName'
                        placeholder='Enter First Name'
                        id='firstName'
                        {...register("firstName", {required: true})}
                        className='flex rounded-lg p-3 gap-[12px] bg-richblack-700'
                    />
                    {
                        errors.firstName && (
                            <span>
                                Please enter your first Name
                            </span>
                        )
                    }
                </div>

                <div className='flex flex-col gap-[6px] w-full'>
                    <label htmlFor='lastName'
                    className='flex items-center gap-[2px]'>
                        Last Name
                    </label>
                    <input 
                        type='text'
                        name='lastName'
                        placeholder='Enter Last Name'
                        id='lastName'
                        {...register("lastName")}
                        className='flex rounded-lg p-3 gap-[12px] bg-richblack-700'
                    />
                </div>
            </div>

            {/* Email */}
            <div className='flex flex-col gap-[6px] w-full'>
                <label htmlFor='email'
                className='flex items-center gap-[2px]'>
                    Email Address<sup className='text-[#EF476F]'>*</sup>
                </label>
                <input 
                    type='email'
                    name='email'
                    placeholder='Enter your Email'
                    id='email'
                    {...register("email", {required: true})}
                    className='flex rounded-lg p-3 gap-[12px] bg-richblack-700'
                />
                {
                    errors.email && (
                        <span>
                            Please enter your email address
                        </span>
                    )
                }
            </div>

            {/* Phone No. */}
            <div className='flex flex-col gap-[3px] w-full'>
                <label htmlFor='phoneno'
                className='flex items-center gap-[2px]'>
                    Phone no.<sup className='text-[#EF476F]'>*</sup>
                </label>

                <div className='flex flex-row gap-3 w-full'>
                    <select className='bg-richblack-700 rounded-lg p-3 flex gap-3 w-20 '>
                        {
                            codes.map((ele, index) => {
                                return <option key={index} value={ele.country}>{ele.code} - {ele.country}</option>
                            })
                        }
                    </select>

                    <input 
                        type='text'
                        name='phoneno'
                        placeholder='94666-85579'
                        id='phoneno'
                        {...register("phoneno", {
                            required: true,
                            maxLength: {value:10, message: "Invalid Phone no."},
                            minLength: {value:8, message: "Invalid Phone no."}
                        })}
                        className='flex rounded-lg p-3 gap-[12px] bg-richblack-700 w-full'
                    />
                    {
                        errors.phoneno && (
                            <span>
                                Please enter your phone no.
                            </span>
                        )
                    }
                </div>
            </div>
        </div>

        <div className='flex flex-col gap-[6px] w-full'>
            <label htmlFor='message'
            className='flex items-center gap-[2px]'>
                Message<sup className='text-[#EF476F]'>*</sup>
            </label>
            <textarea 
                name='message'
                placeholder='Enter your message'
                id='message'
                rows={6}
                {...register("message", {required: true})}
                className='flex rounded-md p-3 gap-[12px] bg-richblack-700'
            />
            {
                errors.message && (
                    <span>
                        Please enter your Message
                    </span>
                )
            }
        </div>

        <button type='submit'
        className='bg-yellow-50 flex items-center justify-center rounded-lg p-3 gap-2 font-medium font-inter text-base text-richblack-900 hover:scale-95 transition-all duration-200'>
            Send Message
        </button>
    </form>
  )
}

export default ContactUsForm