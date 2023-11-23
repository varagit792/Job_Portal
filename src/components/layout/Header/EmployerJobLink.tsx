import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '../../..';
import { resetJobDetail } from '../../../store/reducers/jobs/GetJobDetails';
import { formDataReset } from '../../../store/reducers/jobs/postJobs';

const EmployerJobLink = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handlePostJobLink = () => {
    dispatch(formDataReset())
    dispatch(resetJobDetail())
    navigate("/postJob/jobDetails");
  }
  return (
    <div className="p-5 bg-white w-screen max-w-[180px] grid grid-cols-1">
      <ul>
        <li className="text-sm mb-3 cursor-pointer" onClick={() => handlePostJobLink()}>Post a Hot Vacancy</li>
        <li className="text-sm mb-3 cursor-pointer">Post a Classified</li>
        <li className="text-sm mb-3 cursor-pointer">Post an Internship</li >
        <li className="text-sm mb-3 cursor-pointer">Post a Private Job</li >
        <li className="text-sm mb-3 cursor-pointer">
          <Link to="recruiterJobList"> Manage Jobs</Link>
        </li >
      </ul>
    </div>
  )
}

export default EmployerJobLink