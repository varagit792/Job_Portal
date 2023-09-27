import React from 'react'
import { IoLocationOutline } from 'react-icons/io5';
import { AiFillFacebook, AiFillStar } from 'react-icons/ai';
import companyLogo from '../../assets/jpeg/company_small.jpeg'
const ShortJobCard = () => {

  return (

    <div className="grid grid-cols-6 gap-4">
      <div className="col-start-1 col-end-4 ">
        <h1 className="mt-1 font-semibold">React JS Developer</h1>
        <div>
          FaceBook Meta
        </div>
        <div className="flex flex-row items-center" >
          <span>
            <IoLocationOutline />
          </span>
          <span className="ml-1  overflow-hidden whitespace-nowrap text-ellipsis w-40">
            Kolkata, Mumbai, New Delhi, Hyderabad/Secunderabad, Pune, Chennai, Bangalore/Bengaluru
          </span>
        </div>
      </div>
      <div className="col-start-4 col-end-7 justify-between h-full">
        <div className="flex items-end justify-end w-full">
          <AiFillFacebook color='blue' size="24" />
        </div>
        <div className="mt-1 text-xs text-gray-400 flex items-baseline justify-end text-end ">
          Posted 10 days ago
        </div>
      </div>
    </div>
  )
}

export default ShortJobCard