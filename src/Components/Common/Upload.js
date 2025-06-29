import React, { useEffect, useRef, useState } from 'react'
import { FiUploadCloud } from "react-icons/fi";
import { useSelector } from 'react-redux';
import { Player } from 'video-react';
import "video-react/dist/video-react.css";

const Upload = ({name, label, register, errors, setValue, getValues, accepted, viewData, editData, file}) => {
  const [fileUpload, setFileUpload] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(viewData ? viewData : editData ? editData : file ? file : "");

  const inputRef = useRef(null);

  useEffect(() => {
    register(name, {
      required: true
    });

  }, [register]);

  async function f(){
    const response = await fetch(file);
    const blob = await response.blob();
    const reader = new FileReader();
    reader.onloadend = () => {
      const file = new File([blob], 'filename.ext', { type: blob.type });
      setFileUpload(file);
    };
    reader.readAsArrayBuffer(blob);
  }

  useEffect(() => {
    // console.log(file);
    if(file){
      f();
    }
  }, [])

  useEffect(() => {
    setValue(name, fileUpload);
  }, [fileUpload, setValue]);

  const handleChange = (event) => {
    const selectedFile = event.target.files[0];

    if(selectedFile){
      setFileUpload(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  }

  return (
    <div className='flex flex-col w-full'>
      <label htmlFor='file-upload' className='flex flex-col items-center rounded-lg px-3 gap-y-4 bg-richblack-700 border-[1px] border-dotted border-richblack-600'>
        {
          ! previewUrl ? (
            <div className='flex flex-col items-center py-8 gap-y-4'>
              <div className='flex flex-col items-center gap-y-2 '>
                <FiUploadCloud className='text-yellow-50 bg-richblack-900 w-14 h-14 rounded-full px-3'/>
                
                <div className='flex flex-col items-center font-inter text-richblack-200 text-sm'>
                  <p>
                    Drag and drop an file, or
                  </p>
                  <div className='flex flex-row gap-x-1'>
                    <p>click to</p> 
                    <span className='text-yellow-50 font-semibold'>Browse</span>
                    <p>a file</p>
                  </div>
                </div>
              </div>

              <ul className='list-disc flex flex-row gap-[52px] text-sm font-semibold font-inter text-richblack-400 p-[10px] '>
                <li>
                  Aspect ratio 16:9
                </li>

                <li>
                  Recommended size 1024 x 576
                </li>
              </ul>
            </div>
          ) : (
            <div className='flex flex-col w-full h-full items-center py-4 gap-y-4'>
              {
                accepted === "image/*" ? (
                <img src={previewUrl} className='w-full h-full object-cover'/>) : 
                (<Player aspectRatio="16:9" playsInline src={previewUrl} className='w-full h-full object-cover'/>)
              }
              {
                ! viewData && (
                  <button onClick={() => {
                    setFileUpload(null);
                    setPreviewUrl(null);
                  }} 
                  className='text-richblack-300 underline'>
                    Cancel
                  </button>
                )
              }
            </div>
          )
        }
      </label>

      <input 
      type='file'
      id='file-upload'
      placeholder={`Enter ${name}`}
      className='hidden'
      onChange={handleChange}
      accept={accepted}
      ref={inputRef}
      />
      {
        errors[name] && (
          <span>Thumbnail is required</span>
        )
      }

      {/* {
        previewUrl && <video src={previewUrl} onLoadedMetadata={handleLoadedMetaData}
        style={{display: 'none'}}/>
      } */}
    </div>
  )
}

export default Upload