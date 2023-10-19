import React from 'react'
import { useNavigate } from 'react-router-dom';

const EmployerJobLink = () => {

  const navigate = useNavigate();

  const handlePostJobLink = () => {
    navigate("/postJob/jobDetails");
  }
  return (
    <div className="p-5 bg-white w-screen max-w-[180px] grid grid-cols-1">
      <ul>
        <li className="text-sm mb-3 cursor-pointer" onClick={() => handlePostJobLink()}>Post a Hot Vacancy</li>
        <li className="text-sm mb-3 cursor-pointer">Post a Classified</li>
        <li className="text-sm mb-3 cursor-pointer">Post an Internship</li >
        <li className="text-sm mb-3 cursor-pointer">Post a Private Job</li >
        <li className="text-sm mb-3 cursor-pointer">Manage Jobs</li >
      </ul>
    </div>
  )
}

export default EmployerJobLink