import React from 'react'
import JobLeftPanel from './JobLeftPanel'
import JobDetails from './JobDetails'
import Requirements from './Requirements'
import Company from './Company'
import Recruiter from './Recruiter'
import Response from './Response'

const PostJob = () => {
  return (
    <>
      <div className="h-[10%] w-full"></div>
      <div className="bg-[#F8FAFC] font-sans px-32 py-10">
        <div className="grid grid-cols-9 gap-4">
          <div className="col-start-1 col-end-4">
            <JobLeftPanel />
          </div>
          <div className="col-start-4 col-end-11">
            <div id="jobDetails" className="scroll-mt-24 scroll-smooth">
              <JobDetails />
              {/* <Requirements /> */}
              {/* <Company /> */}
              {/* <Recruiter /> */}
              {/* <Response /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PostJob