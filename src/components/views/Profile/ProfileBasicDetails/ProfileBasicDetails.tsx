import { useEffect, useState } from "react"
import { BsBriefcase, BsCalendar4, BsTelephone } from "react-icons/bs"
import { FiEdit2 } from "react-icons/fi"
import { HiOutlineMail } from "react-icons/hi"
import { MdVerified } from "react-icons/md"
import { SlLocationPin } from "react-icons/sl"
import { useAppDispatch, useAppSelector } from "../../../.."
import { getUserData } from "../../../../store/reducers/user/getUserDetails";
import { clearGetUserDataSlice } from "../../../../store/reducers/user/getUserDetails";
import Modal from "../../../commonComponents/Modal";
import ProfileBasicDetailsForm from "./ProfileBasicDetailsForm";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import { clearUpdateProfileBasicDetailsSlice } from "../../../../store/reducers/jobSeekerProfile/profileBasicDetailsUpdate";
import { profileDashboardGet } from "../../../../store/reducers/jobSeekerProfile/ProfileDashboardGet";
import PhoneIcon from '../../../../assets/svg/Phone.svg';
import EmailIcon from '../../../../assets/svg/Email.svg';
import LocationIcon from '../../../../assets/svg/LocationIcon.svg';
import { clearUploadState } from "../../../../store/reducers/jobSeekerProfile/uploadResume";
import VerifyOtpForm from "./VerifyOtpForm";
import greenTickIcon from '../../../../assets/svg/greenTickIcon.svg';


const ProfileBasicDetails = () => {
  const dispatch = useAppDispatch();
  const { profileDashboard } = useAppSelector((state) => state.getProfileDashboard);
  const { success, userData } = useAppSelector((state) => state.getUser);
  const { success: successBasicDetails } = useAppSelector((state) => state.updateProfileBasicDetails)
  const [lastUpdatedTimestamp, setLastUpdatedTimestamp] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isVerifyOtpOpen, setIsVerifyOtpOpen] = useState<boolean>(false);
  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      dispatch(clearGetUserDataSlice)
      dispatch(clearUploadState)
    }
  }, [dispatch, success]);


  useEffect(() => {
    if (successBasicDetails) {
      setIsOpen(false);
      dispatch(clearUpdateProfileBasicDetailsSlice);
      dispatch(profileDashboardGet());
      dispatch(getUserData());
    }
  }, [dispatch, successBasicDetails]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  }

  const openOtpModel = () => {
    setIsVerifyOtpOpen(true);
  };
  const closeOtpDialog = () => {
    setIsVerifyOtpOpen(false);
  }

  const parsedDate = parseISO(profileDashboard?.profileLastUpdated)
  useEffect(() => {
    if (!isNaN(parsedDate.getDate())) {
      setLastUpdatedTimestamp(parsedDate);
    }
  }, [profileDashboard])

  return (
    <>
      {/* <div className="col-start-2 col-end-6">
        <div className="mb-4">
          <div className="flex items-center">
            <h1 className="font-semibold text-2xl">{userData.name}</h1>
            <span className="ml-2 text-gray-400 hover:scale-125 cursor-pointer" onClick={openModal}> <FiEdit2 /> </span>
          </div>
          {lastUpdatedTimestamp !== null && (<span><span className="font-thin text-sm">Profile last updated - </span><span className="text-sm">  {formatDistanceToNow(lastUpdatedTimestamp, { addSuffix: true }
          )}</span></span>)}
        </div>
        <hr className="mb-4 w-4/5" />
        <div className="grid grid-cols-2 col-start-2 col-end-5">
          <div>
            <div className="mb-2 flex items-center text-sm font-medium text-gray-500">
              <SlLocationPin /><span className="ml-1">{profileDashboard?.currentLocation?.title},  {profileDashboard?.currentCountry}</span>
            </div>
            <div className="mb-2 flex items-center text-sm font-medium text-gray-500">
              <BsBriefcase /><span className="ml-1">{profileDashboard?.jobSeekerType}</span>
            </div>
            {(profileDashboard?.jobSeekerType === "Experienced" &&
              <div className="flex items-center text-sm font-medium text-gray-500">
                <BsCalendar4 />
                <div className="ml-1 w-96 ">
                  Available to join in {profileDashboard?.noticePeriod?.title}
                </div>
              </div>)}
          </div>
          <div className="border-l border-gray-300 ml-48">
            <div className="ml-2">
              <div className="mb-2 flex items-center text-sm font-medium text-gray-500">
                <BsTelephone /><span className="ml-1 mr-1">{userData.mobileNumber}</span><MdVerified color="green" />
              </div>
              <div className="flex items-center text-sm font-medium text-gray-500">
                <HiOutlineMail /><span className="ml-1 mr-1">{userData.email}</span><MdVerified color="green" />
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="px-7 pb-7 pt-5">
        <div className="flex items-center">
          <h1 className="text-lg font-bold mb-1">{userData?.name}</h1>
          <span className="ml-2 text-gray-400 hover:scale-125 cursor-pointer" onClick={openModal}> <FiEdit2 /> </span>
        </div>
        {(profileDashboard?.jobSeekerType === 'Experienced') ? (profileDashboard?.currentCompany ? <div className="flex justify-start items-center text-[#475569] text-base">
          <h1 className="mr-2">{profileDashboard?.currentJobTitle?.title}</h1>
          <h1>@ {profileDashboard?.currentCompany?.title}</h1>
        </div> : <div className="mr-4 text-blue-600 font-md cursor-pointer font-semibold" onClick={openModal}>
          Add Company Details </div>) : <h1 className="mr-2">Fresher</h1>}
        <hr className="my-5 bg-[#E0E7FF]" />
        <div className="text-sm text-[#64748B]">
          <div className="flex justify-start items-center mb-3">
            <img src={EmailIcon} alt="EmailIcon" width="12rem" height="12rem" />
            <span className="ml-1 overflow-hidden inline-block whitespace-nowrap text-ellipsis">{userData?.email}</span>
          </div>
          <div className="flex justify-start items-center">
            {userData.mobileNumber ? <div className="flex justify-start items-center mr-2">
              <img src={PhoneIcon} alt="PhoneIcon" width="12rem" height="12rem" />
              <span className="ml-1 overflow-hidden inline-block whitespace-nowrap text-ellipsis mr-1">{userData.mobileNumber}</span>
              {userData.isMobileVerified ?
                <img src={greenTickIcon} alt="PhoneIcon" width="14rem" height="14rem" /> :
                <button className=" ml-1 text-blue-600 text-sm, font-medium" onClick={openOtpModel}>Verify</button>}

            </div> : <div className="mr-4 text-blue-600 font-md cursor-pointer font-semibold" onClick={openModal}>
              Add PhoneNumber </div>
            }
            {profileDashboard?.currentLocation ? <div className="flex justify-start items-center ml-1">
              <img src={LocationIcon} alt="LocationIcon" width="12rem" height="12rem" />
              <span className="ml-1 overflow-hidden inline-block whitespace-nowrap text-ellipsis">{profileDashboard?.currentLocation?.title && `${profileDashboard?.currentLocation?.title},`} {profileDashboard?.currentCountry}</span>
            </div> :
              <div className="mr-4 text-blue-600 font-md cursor-pointer font-semibold" onClick={openModal}> Add Location </div>
            }
          </div>
        </div>
      </div>
      {isOpen && <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalBody={
          <ProfileBasicDetailsForm
            closeDialog={closeDialog}
            profileDashboard={profileDashboard}
            userData={userData}
          />
        }
      />}
      {isVerifyOtpOpen &&
        <Modal
        isOpen={isVerifyOtpOpen}
        setIsOpen={setIsVerifyOtpOpen}
          modalBody={
            <VerifyOtpForm
              closeOtpDialog={closeOtpDialog}
              mobileNumber={userData?.mobileNumber}
            />
          }
        />
      }
    </>
  )
}

export default ProfileBasicDetails