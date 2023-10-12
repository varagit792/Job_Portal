import React, { useEffect, useState } from 'react'
import TickRecruiter from '../../../commonComponents/TickRecruiter'
import { useLocation } from 'react-router-dom';

const JobLeftPanel = () => {

  const location = useLocation();
  const [pageStatus, setPageStatus] = useState({ jobDetails: "", requirements: "", company: "", recruiter: "", response: "" })
  const pageName = { jobDetails: "pending", requirements: "pending", company: "pending", recruiter: "pending", response: "pending" }

  if (location.pathname === '/postJob/jobDetails/' || location.pathname === '/postJob/jobDetails') {
    pageName.jobDetails = "working";
  } else if (location.pathname === '/postJob/requirements/' || location.pathname === '/postJob/requirements') {
    pageName.jobDetails = "done";
    pageName.requirements = "working";
  } else if (location.pathname === '/postJob/company/' || location.pathname === '/postJob/company') {
    pageName.jobDetails = "done";
    pageName.requirements = "done";
    pageName.company = "working";
  } else if (location.pathname === '/postJob/recruiter/' || location.pathname === '/postJob/recruiter') {
    pageName.jobDetails = "done";
    pageName.requirements = "done";
    pageName.company = "done";
    pageName.recruiter = "working";
  } else if (location.pathname === '/postJob/response/' || location.pathname === '/postJob/response') {
    pageName.jobDetails = "done";
    pageName.requirements = "done";
    pageName.company = "done";
    pageName.recruiter = "done";
    pageName.response = "working";
  }

  useEffect(() => {
    setPageStatus(pageName)
  }, []);

  return (
    <>
      <div className="border border-[#E0E7FF] rounded-lg bg-white px-10 py-10 sticky top-[13%]">
        <div className=" text-black text-xl font-medium  leading-normal tracking-tight">J13 - Product Manager</div>
        <div className=" text-slate-500 text-base font-normal  leading-snug tracking-tight">Please enter the details precisely to get best talent for the job</div>

        <hr className="my-10" />
        <ul className="max-w-md list-inside">
          <li className="flex items-center  mb-8">
            <TickRecruiter tickNumber="1" tickStatus={pageStatus.jobDetails} />
            <a href="#jobDetails" className="text-sm  w-full flex justify-between">
              <span className="font-semibold">Job Details</span>
            </a>
          </li>
          <li className="flex items-center  mb-8">
            <TickRecruiter tickNumber="2" tickStatus={pageStatus.requirements} />
            <a href="#resumeHeadline" className="text-sm w-full flex justify-between">
              <span className="font-semibold">Requirements</span></a>
            <a href="#resumeHeadline" className="text-sm justify-between">
            </a>
          </li>
          <li className="flex items-center  mb-8">
            <TickRecruiter tickNumber="3" tickStatus={pageStatus.company} />
            <a href="#careerProfile" className="text-sm  w-full flex justify-between">
              <span className="font-semibold">Company</span></a>
            <a href="#careerProfile" className="text-sm justify-between">
            </a>
          </li>
          <li className="flex items-center  mb-8">
            <TickRecruiter tickNumber="4" tickStatus={pageStatus.recruiter} />
            <a href="#keySkills" className="text-sm  w-full flex justify-between">
              <span className="font-semibold">Recruiter</span>
            </a>
          </li>
          <li className="flex items-center  mb-8">
            <TickRecruiter tickNumber="5" tickStatus={pageStatus.response} />
            <a href="#education" className="text-sm w-full flex justify-between">
              <span className="font-semibold">Response</span></a>
            <a href="#education" className="text-sm justify-between">
            </a>
          </li>
        </ul>
        <div className=" h-10 px-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 inline-flex">
          <div className="text-indigo-900 text-xl font-medium  leading-normal tracking-tight">Save as Draft</div>
        </div>
      </div>
    </>
  )
}

export default JobLeftPanel