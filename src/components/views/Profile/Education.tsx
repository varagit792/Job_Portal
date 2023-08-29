import { useEffect, useState } from 'react'
import Modal from '../../commonComponents/Modal';
import EducationForm from './EducationForm';
import { useAppDispatch, useAppSelector } from '../../..';
import { profileDashboardGet } from '../../../store/reducers/jobSeekerProfile/ProfileDashboardGet';
import { clearJobSeekerEducationAddSlice } from '../../../store/reducers/jobSeekerProfile/jobSeekerEducation';
import { educationDetailsGet } from '../../../store/reducers/jobSeekerProfile/getEducationDetails';
import { FiEdit2 } from 'react-icons/fi';

export default function Education() {
  const [isOpen, setIsOpen] = useState(false);
  const { success, educationData } = useAppSelector((state) => state.education);
  const { educationDetails } = useAppSelector((state) => state.educationDetails);

  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (success) {
        setIsOpen(false);
        dispatch(clearJobSeekerEducationAddSlice());
        dispatch(profileDashboardGet());
        dispatch(educationDetailsGet())
    }
  }, [success, dispatch]);
  
  useEffect(() => {
    dispatch(educationDetailsGet())
  }, [])
  
  const openModal = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
};
 
  return (
    <div className="w-full rounded-2xl bg-white p-4 mt-5" >
      <div className="flex items-center justify-between mb-4">
        <h1>Education</h1>
        <h1 className="text-blue-600 font-medium cursor-pointer" onClick={openModal}>Add education</h1>
      </div>
      {
        Object.keys(educationDetails).length
          ? educationDetails?.map((item) => (
            <div className="mb-2">
            <div className="flex items-center">
              <h1>
                <span className="text-sm text-gray-600 font-bold">{item?.education}</span>
              </h1>
              <span className="ml-2 text-gray-400 hover:scale-125 cursor-pointer">
                <FiEdit2 onClick={() => setIsOpen(true)} />
              </span>
            </div>
            <span className="text-sm text-gray-500">{item?.specialization}</span><br />
            <span className="text-sm text-gray-500">{item?.passingYear}</span>
          </div>
          ))
          : <span className="text-sm text-gray-500">Mention your education details.</span>
      }
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalTitle={"Add Education"}
        modalBody={
          <EducationForm
            closeDialog={closeDialog}
            educationDetails={educationDetails}
          />
        }
      />
    </div>
  )
}