import React from 'react'
import Footer from '../Components/Common/Footer';
import ReviewSlider from '../Components/Common/ReviewSlider';
import { IoMdChatboxes } from "react-icons/io";
import { FaGlobeAmericas } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { IoCallSharp } from "react-icons/io5";
import ContactUsForm from '../Components/Common/ContactUsForm';


const ContactUs = () => {
  return (
    <div className='w-full h-full'>
        {/* Section 1 */}
        <div className='flex flex-col md:flex-row md:px-[90px] py-[20px] md:py-[120px] top-[58px] gap-[52px] '>
            {/* Left */}
            <div className='flex flex-col h-full bg-richblack-700 rounded-xl p-6 gap-6'>
                <div className='flex flex-row gap-[9px] p-3 '>
                    <div className='-translate-x-[2.25px] translate-y-[2.25px] '>
                        <IoMdChatboxes color='white'/>
                    </div>

                    <div className='flex flex-col gap-[2px] '>
                        <div className='font-inter text-base font-semibold text-richblack-200'>
                            Chat on us
                        </div>
                        <div className='font-inter text-base font-semibold text-richblack-200'>
                            Our friendly team is here to help.
                        </div>
                        <div className='font-inter text-base font-semibold text-richblack-200'>
                            stdnotion@gmail.com
                        </div>
                    </div>
                </div>

                <div className='flex flex-row gap-[9px] p-3 '>
                    <div>
                        <FaGlobeAmericas color='white'/>
                    </div>

                    <div className='flex flex-col gap-[2px] '>
                        <div className='font-inter text-base font-semibold text-richblack-200'>
                            Visit us
                        </div>
                        <div className='font-inter text-base font-semibold text-richblack-200'>
                            Come and say hello to our office HQ
                        </div>
                        <div className='font-inter text-base font-semibold text-richblack-200'>
                            Village Nikuwana, PO Mehmera, Tehsil Ratia (125051), state Haryana (India)
                        </div>
                    </div>
                </div>

                <div className='flex flex-row gap-[9px] p-3 '>
                    <div>
                        <IoCallSharp color='white'/>
                    </div>

                    <div className='flex flex-col gap-[2px] '>
                        <div className='font-inter text-base font-semibold text-richblack-200'>
                            Call us
                        </div>
                        <div className='font-inter text-base font-semibold text-richblack-200'>
                            Mon - Fri from 9:00 AM to 5:00 PM
                        </div>
                        <div className='font-inter text-base font-semibold text-richblack-200'>
                            +91 94666-85579
                        </div>
                    </div>
                </div>
            </div>

            {/* Right */}
            <div className='flex flex-col p-[52px] gap-[32px] rounded-xl border-[1px] border-richblack-600 '>
                <div className='flex flex-col gap-[12px] '>
                    <div className='font-inter font-semibold text-3xl text-richblack-5 '>
                    Got a Idea? We’ve got the skills. Let’s team up
                    </div>
                    <div className='font-inter font-semibold text-base text-richblack-300 '>
                    Tell us more about yourself and what you’re got in mind.
                    </div>
                </div>

                <div>
                    <ContactUsForm />
                </div>
            </div>
        </div>

      {/* Section 2 */}
        {/* <div className='w-11/12 mx-auto max-w-maxContent hidden md:flex flex-col items-center justify-between gap-8 bg-richblack-900 text-white'>
            <h2 className='text-center text-4xl font-semibold mt-10 text-richblack-50'>
                Reviews from other learners
            </h2>

            <ReviewSlider />
        </div> */}

      {/* Section 3 */}
        {/* <div className='w-full'>
            <Footer />
        </div> */}
    </div>
  )
}

export default ContactUs