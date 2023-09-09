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
import { format, formatDistanceToNow, parseISO } from "date-fns"
import { clearUpdateProfileBasicDetailsSlice } from "../../../../store/reducers/jobSeekerProfile/profileBasicDetailsUpdate"
import { profileDashboardGet } from "../../../../store/reducers/jobSeekerProfile/ProfileDashboardGet"


const ProfileBasicDetails = () => {

  const dispatch = useAppDispatch();
  const { profileDashboard } = useAppSelector((state) => state.getProfileDashboard);
  const { success, userData } = useAppSelector((state) => state.getUser);
  const { success: successBasicDetails } = useAppSelector((state) => state.updateProfileBasicDetails)
  const [lastUpdatedTimestamp, setLastUpdatedTimestamp] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      dispatch(clearGetUserDataSlice)
    }
  }, [dispatch, success]);


  useEffect(() => {
    console.log('basic success useffect', successBasicDetails)
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

  const parsedDate = parseISO(profileDashboard?.profileLastUpdated)
  useEffect(() => {
    if (!isNaN(parsedDate.getDate())) {
      setLastUpdatedTimestamp(parsedDate);
    }
  }, [profileDashboard])

  return (
    <div>
      <div className="col-start-2 col-end-6">
        <div className="mb-4">
          <div className="flex items-center">
            <h1 className="font-semibold text-2xl">{userData.name}</h1>
            <span className="ml-2 text-gray-400 hover:scale-125 cursor-pointer" onClick={openModal}> <FiEdit2 /> </span>
          </div>
          {lastUpdatedTimestamp !== null && (<span><span className="font-thin text-sm">Profile last updated - </span><span className="text-sm">  {formatDistanceToNow(lastUpdatedTimestamp, { addSuffix: true }
          )}</span></span>)}
        </div>
        <hr className="mb-4" />
        <div className="grid grid-cols-2 col-start-2 col-end-5">
          <div>
            <div className="mb-2 flex items-center text-sm font-medium text-gray-500">
              <SlLocationPin /><span className="ml-1">{profileDashboard?.currentLocation?.title},  {profileDashboard?.currentCountry}</span>
            </div>
            <div className="mb-2 flex items-center text-sm font-medium text-gray-500">
              <BsBriefcase /><span className="ml-1">{profileDashboard?.jobSeekerType}</span>
            </div>
            {(profileDashboard?.jobSeekerType === "Experienced" && <div className="flex items-center text-sm font-medium text-gray-500">
              <BsCalendar4 /><span className="ml-1 w-full">{profileDashboard?.noticePeriod?.title}</span>
            </div>)}
          </div>
          <div className="border-l border-gray-300">
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
    </div>
  )
}

export default ProfileBasicDetails