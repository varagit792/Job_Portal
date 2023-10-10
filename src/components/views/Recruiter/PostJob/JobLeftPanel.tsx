import React from 'react'
import Tick from '../../../commonComponents/Tick'
import ProfileIndicator from '../../../commonComponents/ProfileIndicator'

const JobLeftPanel = () => {
  return (
    <>
      <div className="border border-[#E0E7FF] rounded-lg bg-white px-10 py-10 sticky top-[13%]">
        <div className=" text-black text-xl font-medium  leading-normal tracking-tight">J13 - Product Manager</div>
        <div className=" text-slate-500 text-base font-normal  leading-snug tracking-tight">Please enter the details precisely to get best talent for the job</div>

        <hr className="my-10" />
        <ul className="max-w-md list-inside">
          <li className="flex items-center  mb-8">
            <Tick tickNumber="1" tickStatus={false} />
            <a href="#jobDetails" className="text-sm  w-full flex justify-between">
              <span className="font-semibold">Job Details</span>
              <u className="text-[#475569]" >Add</u>
            </a>
          </li>
          <li className="flex items-center  mb-8">
            <Tick tickNumber="2" tickStatus={false} />
            <a href="#resumeHeadline" className="text-sm w-full flex justify-between">
              <span className="font-semibold">Requirements</span></a>
            <a href="#resumeHeadline" className="text-sm justify-between">
              <u className="text-[#475569]">Add</u>
            </a>
          </li>
          <li className="flex items-center  mb-8">
            <Tick tickNumber="3" tickStatus={false} />
            <a href="#careerProfile" className="text-sm  w-full flex justify-between">
              <span className="font-semibold">Company</span></a>
            <a href="#careerProfile" className="text-sm justify-between">
              <u className="text-[#475569]" >Add</u>
            </a>
          </li>
          <li className="flex items-center  mb-8">
            <Tick tickNumber="4" tickStatus={false} />
            <a href="#keySkills" className="text-sm  w-full flex justify-between">
              <span className="font-semibold">Recruiter</span>
              <u className="text-[#475569]" >Add</u>
            </a>
          </li>
          <li className="flex items-center  mb-8">
            <Tick tickNumber="5" tickStatus={false} />
            <a href="#education" className="text-sm w-full flex justify-between">
              <span className="font-semibold">Response</span></a>
            <a href="#education" className="text-sm justify-between">
              <u className="text-[#475569]" >Add</u>

            </a>
          </li>

        </ul>
      </div>
    </>
  )
}

export default JobLeftPanel