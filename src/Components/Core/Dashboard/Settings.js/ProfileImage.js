import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { FaUpload } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux'
import { updateProfileImage } from '../../../../Services/Operations/profileAPI';
import { setUser } from '../../../../Reduer/Slices/profileSlice';

const ProfileImage = () => {
    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth)
    const [currentImage, setCurrentImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if(user){
            setCurrentImage(user?.image);
        }
    }, []);

    const changeHandler = (event) => {
        const file = event.target.files[0];

        setSelectedFile(file);
        setCurrentImage(URL.createObjectURL(file));
    }

    const submitHandler = async () => {
        if(! selectedFile){
            toast.error("No file selected");
            return ;
        }

        const formData = new FormData();
        formData.append("profileImage", selectedFile);

        const response = await updateProfileImage(formData, token);
        if(response){
            dispatch(setUser(response));
        }
    }

    return (
        <div className='flex flex-row items-center gap-4 bg-richblack-600 rounded-lg w-full h-full px-4 py-6'>
            <img src={currentImage} alt='profileImage' className='w-[60px] h-[60px] rounded-full border-[1px] border-richblack-5 ' />

            <div className='flex flex-col gap-2'>
                <div className='text-xl font-semibold text-richblack-5 font-mono'>
                    Change Profile Image
                </div>

                <div className='flex flex-row items-center gap-5'>
                    <div className='flex flex-row items-center'>
                        <label htmlFor='profileImage' className='flex text-lg flex-row items-center gap-1 px-4 py-2 bg-richblack-700 object-cover rounded-lg border-[1px] cursor-pointer border-richblack-5 font-semibold '>
                            Select
                        </label>

                        <input 
                        type='file'
                        id='profileImage'
                        name='profileImage'
                        accept='image/*'
                        onChange={changeHandler}
                        className='hidden'
                        />
                    </div>

                    <button className='flex flex-row px-4 py-2 items-center gap-1 bg-yellow-50 text-richblack-900 font-semibold text-lg rounded-lg border-[1px] cursor-pointer border-richblack-5 '
                    onClick={submitHandler}>
                        <FaUpload />
                        <p>Upload</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfileImage
