import React, { useEffect, useState } from 'react';
import { FiEdit2 } from "react-icons/fi";
import { BsTelephone } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { MdVerified } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { BsBriefcase, BsCalendar4 } from "react-icons/bs";
import Education from './Education/Education';
import ResumeHeadline from './ResumeHeadline/ResumeHeadline';
import KeySkills from './KeySkills/KeySkills';
import ProfileSummary from './ProfileSummary/ProfileSummary';
import ResumeUpload from './ResumeUpload/ResumeUpload';
import PersonalDetails from './PersonalDetails/PersonalDetails';
import { useAppDispatch, useAppSelector } from '../../../';
import { profileDashboardGet, clearGetProfileDashboardSlice } from '../../../store/reducers/jobSeekerProfile/ProfileDashboardGet';
import CareerProfile from './CareerProfile/CareerProfile';
import defaultPicture from '../../../../src/assets/jpeg/default_picture.jpg';
import Modal from '../../commonComponents/Modal';
import ProfilePictureUploadForm from './ProfilePictureUpload/ProfilePictureUploadForm';
import ProfileBasicDetails from './ProfileBasicDetails/ProfileBasicDetails';

const Profile = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [profilePicPath, setProfilePicPath] = useState();
  const dispatch = useAppDispatch();
  const { success, profileDashboard } = useAppSelector((state) => state.getProfileDashboard);
  const { success: profilePictureUploadSuccess } = useAppSelector((state) => state.jobSeekerUploadProfilePicture);
  const { success: profilePictureDeleteSuccess } = useAppSelector((state) => state.jobSeekerDeleteProfilePicture)

  useEffect(() => {
    dispatch(profileDashboardGet());
  }, [dispatch]);
  useEffect(() => {
    if (success) {
      dispatch(clearGetProfileDashboardSlice());
    }
  }, [dispatch, success]);

  useEffect(() => {
    if (profilePictureUploadSuccess) {
      setIsOpen(false);
    }
  }, [profilePictureUploadSuccess]);

  useEffect(() => {
    if (profilePictureDeleteSuccess) {
      setIsOpen(false);
    }
  }, [profilePictureDeleteSuccess]);


  useEffect(() => {
    let profilePictureCompletePath;

    if (profileDashboard[0]?.profilePicturePath) {
      profilePictureCompletePath = `${process.env.REACT_APP_PROFILE_PICTURE_FILE_LOCATION}/${profileDashboard[0]?.profilePicturePath}`;
      setProfilePicPath(profilePictureCompletePath as any)
    } else {
      //let profilePicture = defaultPicture;
      //if (profilePictureCompletePath) {
      //profilePicture = profilePictureCompletePath;
      setProfilePicPath(defaultPicture as any)
      //}
    }

  }, [profileDashboard])

  const openModal = () => {
    setIsOpen(true);
  }
  const closeDialog = () => {
    setIsOpen(false);
  }

  return (
    <div className="bg-zinc-100 font-sans">
      <div className="px-40 py-10 flex justify-center flex-col">
        {/* card */}
        <div className="w-full rounded-2xl bg-white p-8">
          <div className="grid grid-cols-5 h-full">
            <div className="h-full w-full flex justify-start items-center">
              <div className="rounded-full h-full">
                <img src={profilePicPath} alt="logo" height="100%" className="rounded-full object-fill h-30 w-40" onClick={openModal} />
              </div>
            </div>
            {
              isOpen && <div className="col-start-2 col-end-6">
                <Modal
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  modalBody={
                    <ProfilePictureUploadForm
                      closeDialog={closeDialog}
                    />
                  }
                />
              </div>
            }
           
            {/* display profile basic details */}
            <ProfileBasicDetails/>
          </div>
        </div>
        <div className="grid grid-cols-4 mt-5">
          <div>
            {/* card */}
            <div className="mr-5 rounded-lg border bg-white p-5 sticky top-[13%]">
              <h1 className="font-semibold mb-1">Quick links</h1>
              <button className="text-sm mt-3 px-3 py-1.5 hover:bg-gray-200 hover:text-black hover:font-semibold w-full rounded-2xl flex justify-between">
                <span>Resume</span>
                <span className="text-blue-600 font-semibold">Update</span>
              </button>
              <button className="text-sm mt-3 px-3 py-1.5 hover:bg-gray-200 hover:text-black hover:font-semibold w-full rounded-2xl flex justify-between">
                <span>Resume headline</span>
              </button>
              <button className="text-sm mt-3 px-3 py-1.5 hover:bg-gray-200 hover:text-black hover:font-semibold w-full rounded-2xl flex justify-between">
                <span>Key skills</span>
              </button>
              <button className="text-sm mt-3 px-3 py-1.5 hover:bg-gray-200 hover:text-black hover:font-semibold w-full rounded-2xl flex justify-between">
                <span>Education</span>
                <span className="text-blue-600 font-semibold">Add</span>
              </button>
              <button className="text-sm mt-3 px-3 py-1.5 hover:bg-gray-200 hover:text-black hover:font-semibold w-full rounded-2xl flex justify-between">
                <span>IT skills</span>
              </button>
              <button className="text-sm mt-3 px-3 py-1.5 hover:bg-gray-200 hover:text-black hover:font-semibold w-full rounded-2xl flex justify-between">
                <span>Projects</span>
                <span className="text-blue-600 font-semibold">Add</span>
              </button>
              <button className="text-sm mt-3 px-3 py-1.5 hover:bg-gray-200 hover:text-black hover:font-semibold w-full rounded-2xl flex justify-between">
                <span>Profile summary</span>
                {!profileDashboard[0]?.profileSummary
                  &&
                  <span className="text-blue-600 font-semibold">Add</span>
                }
              </button>
              <button className="text-sm mt-3 px-3 py-1.5 hover:bg-gray-200 hover:text-black hover:font-semibold w-full rounded-2xl flex justify-between">
                <span>Accomplishments</span>
              </button>
              <button className="text-sm mt-3 px-3 py-1.5 hover:bg-gray-200 hover:text-black hover:font-semibold w-full rounded-2xl flex justify-between">
                <span>Career profile</span>
              </button>
              <button className="text-sm mt-3 px-3 py-1.5 hover:bg-gray-200 hover:text-black hover:font-semibold w-full rounded-2xl flex justify-between">
                <span>Personal details</span>
              </button>
            </div>
          </div>
          <div className="col-start-2 col-end-5">
            {/* card  profile upload*/}
            <ResumeUpload />
            {/* <div className="w-full rounded-2xl bg-white p-4">
              <h1 className="mb-4">Resume</h1>
              <p className="mb-4 text-sm text-gray-500">
                Resume is the most important document recruiters look for. Recruiters generally do not look at profiles without resumes.
              </p>
              <div className="p-10 border border-dashed border-gray-500 rounded-2xl flex flex-col justify-center items-center">
                <label className="cursor-pointer px-3 py-1 mb-1 rounded-3xl border-2 border-blue-400">
                  <input type="file" className="hidden" />
                  Upload resume
                </label>
                <span className=" text-gray-400">Supported Formats: doc, docx, rtf, pdf, upto 2 MB</span>
              </div>
            </div> */}

            {/* card */}
            <ResumeHeadline />
            {/* card */}
            <KeySkills profileDashboard={profileDashboard} />
            {/* card */}
            <Education />
            <ProfileSummary />
            <PersonalDetails />
            {/* card */}

            {/* card */}
            <CareerProfile profileDashboard={profileDashboard} />
            {/* card */}

            <div className="w-full rounded-2xl bg-white p-4 mt-5">
              <div className="flex items-center justify-between mb-4">
                <h1>Employment</h1>
                <h1 className="text-blue-600 font-medium">Add employment</h1>
              </div>
              <span className="text-sm text-gray-500">Mention your employment details including your current and previous company work experience.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;