import React from 'react'
import { Outlet } from 'react-router-dom'
import section1 from '../Assets/HomeSection1.jpeg'
import { latestCars } from '../Data/latestCars'
import Swiper from 'swiper'

const Home = () => {
    return (
        <div className='flex flex-col gap-2 items-center w-full h-full'>
            <div className='flex flex-col gap-7 w-11/12 py-4'>
                {/* Section 1 */}
                <div className=''>
                    <img src={section1} 
                    className='rounded-md object-cover ' />
                </div>

                {/* Section 2 */}
                <div>
                    <div className='text-lg font-semibold font-inter text-richblack-5 '>
                        Latest Cars
                    </div>

                    <div>
                        {
                            latestCars.length > 0 && latestCars.map((car, index) => (
                                <div key={index}>
                                    
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
