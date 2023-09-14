import { useEffect, useState } from 'react';
import Education from './Education/Education';
import ResumeHeadline from './ResumeHeadline/ResumeHeadline';
import KeySkills from './KeySkills/KeySkills';
import ProfileSummary from './ProfileSummary/ProfileSummary';
import ResumeUpload from './ResumeUpload/ResumeUpload';
import PersonalDetails from './PersonalDetails/PersonalDetails';
import { useAppDispatch, useAppSelector } from '../../../';
import { profileDashboardGet, clearGetProfileDashboardSlice } from '../../../store/reducers/jobSeekerProfile/ProfileDashboardGet';
import CareerProfile from './CareerProfile/CareerProfile';
import Modal from '../../commonComponents/Modal';
import ProfilePictureUploadForm from './ProfilePictureUpload/ProfilePictureUploadForm';
import ProfileBasicDetails from './ProfileBasicDetails/ProfileBasicDetails';
import Employment from './Employment/Employment';
import defaultPicture from '../../../../src/assets/jpeg/default_picture.jpg';

const Profile = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [profilePicPath, setProfilePicPath] = useState();
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
    if (profileDashboard?.profilePicturePath) {
      profilePictureCompletePath = `${process.env.REACT_APP_PROFILE_PICTURE_FILE_LOCATION}/${profileDashboard?.profilePicturePath}`;
      setProfilePicPath(profilePictureCompletePath as any)
    } else {
      setProfilePicPath(defaultPicture as any)
    }
  }, [profileDashboard])

  const openModal = () => {
    setIsOpen(true);
  }

  const closeDialog = () => {
    setIsOpen(false);
  }

  return (
    <>
      <div className="h-[10%] w-full"></div>
      <div className="bg-zinc-100 font-sans">
        <div className="px-32 py-10 flex justify-center flex-col">
          {/* card */}
          <div className="w-full rounded-2xl bg-white p-8">
            <div className="grid grid-cols-5 h-full">
              <div className="h-full w-full flex justify-start items-center">
                <div className="rounded-full h-full">
                  <img src={profilePicPath} alt="logo" height="100%" className="rounded-full object-fill h-30 w-40" onClick={openModal} />
                </div>
              </div>
              <ProfileBasicDetails />
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
          </div>
          <div className="grid grid-cols-4 mt-5">
            <div>
              {/* card */}
              <div className="mr-5 rounded-lg border bg-white p-5 sticky top-[13%]">
                <h1 className="font-semibold mb-1">Quick links</h1>
                <a href="#resumeUpload" className="text-sm mt-3 px-3 py-1.5 hover:bg-gray-200 hover:text-black hover:font-semibold w-full rounded-2xl flex justify-between">
                  <span>Resume</span>
                  <span className="text-blue-600 font-semibold">Update</span>
                </a>
                <a href="#resumeHeadline" className="text-sm mt-3 px-3 py-1.5 hover:bg-gray-200 hover:text-black hover:font-semibold w-full rounded-2xl flex justify-between">
                  <span>Resume headline</span>
                </a>
                <a href="#careerProfile" className="text-sm mt-3 px-3 py-1.5 hover:bg-gray-200 hover:text-black hover:font-semibold w-full rounded-2xl flex justify-between">
                  <span>Career profile</span>
                </a>
                <a href="#keySkills" className="text-sm mt-3 px-3 py-1.5 hover:bg-gray-200 hover:text-black hover:font-semibold w-full rounded-2xl flex justify-between">
                  <span>Key skills</span>
                </a>
                <a href="#education" className="text-sm mt-3 px-3 py-1.5 hover:bg-gray-200 hover:text-black hover:font-semibold w-full rounded-2xl flex justify-between">
                  <span>Education</span>
                  <span className="text-blue-600 font-semibold">Add</span>
                </a>
                <button className="text-sm mt-3 px-3 py-1.5 hover:bg-gray-200 hover:text-black hover:font-semibold w-full rounded-2xl flex justify-between">
                  <span>IT skills</span>
                </button>
                <button className="text-sm mt-3 px-3 py-1.5 hover:bg-gray-200 hover:text-black hover:font-semibold w-full rounded-2xl flex justify-between">
                  <span>Projects</span>
                  <span className="text-blue-600 font-semibold">Add</span>
                </button>
                <a href="#profileSummary" className="text-sm mt-3 px-3 py-1.5 hover:bg-gray-200 hover:text-black hover:font-semibold w-full rounded-2xl flex justify-between">
                  <span>Profile summary</span>
                  {!profileDashboard?.profileSummary
                    &&
                    <span className="text-blue-600 font-semibold">Add</span>
                  }
                </a>
                <button className="text-sm mt-3 px-3 py-1.5 hover:bg-gray-200 hover:text-black hover:font-semibold w-full rounded-2xl flex justify-between">
                  <span>Accomplishments</span>
                </button>
                <a href="#personalDetails" className="text-sm mt-3 px-3 py-1.5 hover:bg-gray-200 hover:text-black hover:font-semibold w-full rounded-2xl flex justify-between">
                  <span>Personal details</span>
                </a>
              </div>
            </div>
            <div className="col-start-2 col-end-5">
              <div id="resumeUpload" className="scroll-mt-24 scroll-smooth">
                <ResumeUpload />
              </div>
              <div id="resumeHeadline" className="scroll-mt-24 scroll-smooth">
                <ResumeHeadline />
              </div>
              <div id="careerProfile" className="scroll-mt-24 scroll-smooth">
                <CareerProfile profileDashboard={profileDashboard} />
              </div>
              <div id="keySkills" className="scroll-mt-24 scroll-smooth">
                <KeySkills profileDashboard={profileDashboard} />
              </div>
              <div id="education" className="scroll-mt-24 scroll-smooth">
                <Education />
              </div>
              <div id="profileSummary" className="scroll-mt-24 scroll-smooth">
                <ProfileSummary />
              </div>
              <div id="personalDetails" className="scroll-mt-24 scroll-smooth">
                <PersonalDetails />
              </div>
              <div id="employment" className="scroll-mt-24 scroll-smooth">
                <Employment />
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default Profile;