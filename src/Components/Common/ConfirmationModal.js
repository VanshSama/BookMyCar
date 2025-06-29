import React from 'react'

const ConfirmationModal = ({modalData}) => {
    return (
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="w-11/12 max-w-[350px] flex flex-col gap-10 rounded-lg border border-richblack-400 bg-richblack-800 p-6">
            <div className='flex flex-col gap-1'>
                <h1 className='text-3xl text-richblack-5 font-semibold font-inter'>
                    {modalData?.text1}
                </h1>

                <div className='text-base text-richblack-25'>
                    {modalData?.text2}
                </div>
            </div>

            <div className='flex flex-row items-center gap-4'>
                <button onClick={modalData?.btn1Handler} className='py-2 text-lg px-4 bg-yellow-50 text-richblack-900 font-bold rounded-md '>
                    {modalData.btn1Text}
                </button>

                <button onClick={modalData?.btn2Handler} className='py-2 text-lg px-4 bg-richblack-300 text-richblack-900 font-bold rounded-md '>
                    {modalData.btn2Text}
                </button>
            </div>
            </div>
        </div>
    )
}

export default ConfirmationModal
