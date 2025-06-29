import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { Link, useNavigate } from 'react-router-dom';

const Swiperr = ({showProducts}) => {
    const navigate = useNavigate();

    return (
        <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className='w-full pt-[50px] pb-[50px] '
        >
            {
                showProducts && showProducts.length > 0 && (
                    showProducts.map((prd, index) => (
                        <SwiperSlide key={index}
                        className='border-[2px] flex flex-col border-richblack rounded-lg bg-center bg-cover w-[300px] h-[300px] '>
                            <Link to={`/product/${prd._id}`}>
                                <img src={prd?.thumbnail} 
                                className='w-[300px] block rounded-lg h-[300px] object-cover '/>
                            </Link>
                        </SwiperSlide>
                    ))
                )
            }
        </Swiper>
    )
}

export default Swiperr
