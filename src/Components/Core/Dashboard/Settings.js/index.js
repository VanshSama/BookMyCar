import React from 'react'
import ProfileImage from './ProfileImage'
import PersonalInfo from './PersonalInfo'
import Password from './Password'

const Settings = () => {

    return (
        <div className='w-full h-full flex justify-center px-5 py-5'>
            <div className='flex flex-col items-center gap-5 w-[60%]'>
                <div className='text-3xl text-center px-3 py-3 border-[1px] border-richblack-25 rounded-lg font-edu-sa font-semibold'>
                    Settings
                </div>

                <ProfileImage />

                <PersonalInfo />

                <Password />
            </div>
        </div>
    )
}

export default Settings
