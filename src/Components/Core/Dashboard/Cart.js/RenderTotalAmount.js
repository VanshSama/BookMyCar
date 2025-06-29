import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { buyCourse } from '../../../../Services/Operations/customerOperations';
import { useNavigate } from 'react-router-dom';

const RenderTotalAmount = () => {
  const {totalPrice, cart} = useSelector((state) => state.cart);
  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleBuyCourse(){
    const products = cart.map((prd) => prd._id);
    console.log("Want to buy these courses :- ", products);

    // TODO :- API Integrate --> Take to payment gateway
    buyCourse(token, cart, user, navigate, dispatch);
  }
  return (
    <div className='h-full w-full lg:min-w-[20%] lg:w-max flex flex-col gap-4 rounded-lg p-6 border-[1px] border-richblack-700 bg-richblack-800 '>
      <div className='flex flex-col gap-1'>
        <p className='text-sm font-semibold font-inter text-richblack-200'>Total: </p>
        <p className='text-2xl text-yellow-50 font-inter font-semibold'>Rs. {totalPrice}</p>
      </div>

      <button className='bg-yellow-50 rounded-md px-4 py-2 text-richblack-900 flex flex-row items-center justify-center '
      onClick={handleBuyCourse}
      >
        Buy Now
      </button>
    </div>
  )
}

export default RenderTotalAmount
