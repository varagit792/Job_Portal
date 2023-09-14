import { useEffect, useState } from 'react'
import Modal from '../../../commonComponents/Modal';
import { useAppDispatch, useAppSelector } from '../../../..';
import { profileDashboardGet } from '../../../../store/reducers/jobSeekerProfile/ProfileDashboardGet';
import { clearJobSeekerEducationAddSlice } from '../../../../store/reducers/jobSeekerProfile/jobSeekerEducation';
import { educationDetailsGet } from '../../../../store/reducers/jobSeekerProfile/getEducationDetails';
import { FiEdit2 } from 'react-icons/fi';
import EmploymentForm from './EmploymentForm';
import { clearJobSeekerEmploymentAddSlice } from '../../../../store/reducers/jobSeekerProfile/jobSeekerEmploymentAdd';

export default function Employment() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmployment, setSelectedEmployment] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const { success, employmentData } = useAppSelector((state) => state.employment);
  //const { educationDetails } = useAppSelector((state) => state.educationDetails);
  const { profileDashboard } = useAppSelector((state) => state.getProfileDashboard) as any;

  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (success) {
        setIsOpen(false);
        dispatch(clearJobSeekerEmploymentAddSlice());
        dispatch(profileDashboardGet());
        //dispatch(educationDetailsGet())
    }
  }, [success, dispatch]);
  
  // useEffect(() => {
  //   dispatch(educationDetailsGet())
  // }, [])
  
  const openModal = () => {
    setIsOpen(true);
    setSelectedEmployment({} as any)
    setIsEdit(false)
  };

  const closeDialog = () => {
    setIsOpen(false);
};
 
  console.log("employments-->", profileDashboard?.employments,Object.keys(profileDashboard).length );
  
  return (
    <div className="w-full rounded-2xl bg-white p-4 mt-5" >
      <div className="flex items-center justify-between mb-4 font-bold">
        <h1>Employment</h1>
        <h1 className="text-blue-600 font-medium cursor-pointer" onClick={openModal}>Add employment</h1>
      </div>
      {
        Object.keys(profileDashboard).length
          ? profileDashboard?.employments?.map((item:any) => (
            <div className="mb-2">
            <div className="flex items-center">
              <h1>
                <span className="text-sm text-gray-600 font-bold">{item?.designation}</span>
              </h1>
              <span className="ml-2 text-gray-400 hover:scale-125 cursor-pointer">
                  <FiEdit2 onClick={() => {
                    setIsOpen(true)    
                    setIsEdit(true)
                    setSelectedEmployment(item as any) 
                  }} />
              </span>
            </div>
              <span className="text-sm text-gray-500">{item?.companyName}</span><br/>
              <span className="text-sm text-gray-500">{item?.employmentType}</span>|
              <span className="text-sm text-gray-500">{item?.joiningDateYear?.title}</span> to Present <br />
              <span className="text-sm text-gray-500">{item?.noticePeriod?.title}</span>
          </div>
          ))
          : <span className="text-sm text-gray-500">Mention your employment details.</span>
      }
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalTitle={"Add Employment"}
        modalBody={
          <EmploymentForm
            closeDialog={closeDialog}
            //educationDetails={educationDetails}
            selectedEmployment={selectedEmployment}
            isEdit={isEdit}
          />
        }
      />
    </div>
  )
}