import React, { useEffect, useState } from 'react'
import { FiEdit2 } from "react-icons/fi";
import Modal from '../../../commonComponents/Modal';
import CareerProfileForm from './CareerProfileForm';
import { useAppDispatch, useAppSelector } from '../../../..';
import { clearUpdateCareerProfileUpdateSlice } from '../../../../store/reducers/jobSeekerProfile/careerProfileUpdate';
import { profileDashboardGet } from '../../../../store/reducers/jobSeekerProfile/ProfileDashboardGet';
import { clearGetCareerProfileDetails, careerProfileDetailsGet } from '../../../../store/reducers/jobSeekerProfile/getCareerProfile';
import { clearGetProfileIndicator, profileIndicatorGet } from '../../../../store/reducers/jobSeekerProfile/profileIndicator';

const CareerProfile = ({ profileDashboard }: any) => {
  const dispatch = useAppDispatch();
  const { success } = useAppSelector((state) => state.updateProfileDashboard);
  const { success: successCareerProfileUpdate } = useAppSelector((state) => state.updateCareerProfile);
  const { success: careerProfileSuccess, careerProfileDetails } = useAppSelector((state) => state.getCareerProfile);
  const [isOpen, setIsOpen] = useState(false);
  const formSummary = "This information will help the recruiters  know about your current job profile and also your desired job criteria. This will also help us personalize your job recommendations.";
  useEffect(() => {
    if (success) {
      setIsOpen(false);
      dispatch(clearUpdateCareerProfileUpdateSlice());
      dispatch(profileDashboardGet());
      dispatch(clearGetProfileIndicator());
      dispatch(profileIndicatorGet());
    }
    if (successCareerProfileUpdate) {
      setIsOpen(false);
      dispatch(clearUpdateCareerProfileUpdateSlice());
      dispatch(careerProfileDetailsGet());
      dispatch(clearGetProfileIndicator());
      dispatch(profileIndicatorGet());
    }
    if (careerProfileSuccess)
      dispatch(clearGetCareerProfileDetails());
  }, [success, dispatch, successCareerProfileUpdate, careerProfileSuccess]);

  useEffect(() => {
    dispatch(careerProfileDetailsGet());
  }, [dispatch])

  const openModal = () => {
    setIsOpen(true);
  };
  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <div className="w-full rounded-2xl bg-white p-4 mt-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center justify-between mb-4 font-bold">
          <h1>Career profile</h1>
          {
            careerProfileDetails?.length > 0 &&
            <span className="ml-2 text-gray-400 hover:scale-125 cursor-pointer">
              <FiEdit2 onClick={openModal} />
            </span>
          }
        </div>
        {
          careerProfileDetails?.length === 0 ?
            <h1 className="text-blue-600 font-medium cursor-pointer"
              onClick={openModal}>
              Add career profile
            </h1> : ''
        }
      </div>
      <div className="grid grid-cols-2 gap-4">

        <div>
          <div className="text-gray-500">Current industry</div>
          {careerProfileDetails[0]?.industry?.title &&
            <div className="text-sm font-bold text-gray-500">{careerProfileDetails[0]?.industry?.title}</div>
          }
          {!careerProfileDetails[0]?.industry?.title &&
            <button className="text-blue-600 text-sm font-semibold" onClick={openModal}>Add expected salary</button>
          }
        </div>


        <div>
          <div className="text-gray-500">Department</div>
          {careerProfileDetails[0]?.department?.title &&
            <div className="text-sm font-bold text-gray-500">{careerProfileDetails[0]?.department?.title}</div>
          }
          {!careerProfileDetails[0]?.department?.title &&
            <button className="text-blue-600 text-sm font-semibold" onClick={openModal}>Add department</button>
          }
        </div>


        <div>
          <div className="text-gray-500">Role category</div>
          {careerProfileDetails[0]?.roleCategory?.title &&
            <div className="font-bold text-gray-500">{careerProfileDetails[0]?.roleCategory?.title}</div>
          }
          {!careerProfileDetails[0]?.roleCategory?.title &&
            <button className="text-blue-600 text-sm font-semibold" onClick={openModal}>Add role category</button>

          }
        </div>


        <div>
          <div className="text-gray-500">Job role</div>
          {careerProfileDetails[0]?.jobRole?.title &&
            <div className="font-bold text-gray-500">{careerProfileDetails[0]?.jobRole?.title}</div>
          }
          {!careerProfileDetails[0]?.jobRole?.title &&
            <button className="text-blue-600 text-sm font-semibold" onClick={openModal}>Add job role</button>

          }
        </div>

        <div>
          <div className="text-gray-500">Desired job type</div>
          <div className="text-sm">
            {careerProfileDetails[0]?.careerProfileJobType.map((item, key) => <div className="float-left font-bold text-gray-500 mr-2" key={key}>{item?.jobType?.title},</div>)}
            {!careerProfileDetails[0]?.careerProfileJobType &&
              <button className="text-blue-600 text-sm font-semibold" onClick={openModal}>Add desired job type</button>
            }
          </div>
        </div>
        <div>
          <div className="text-gray-500">Desired employment type</div>
          <div className="text-sm">
            {careerProfileDetails[0]?.careerProfileEmployeeType.map((item, key) => <div className="float-left font-bold text-gray-500 mr-2" key={key}>{item?.employeeType?.title},</div>)}
            {!careerProfileDetails[0]?.careerProfileEmployeeType &&
              <button className="text-blue-600 text-sm font-semibold" onClick={openModal}>Add employment type</button>
            }
          </div>
        </div>
        <div><div className="text-gray-500">Preferred shift</div>
          <div className="text-sm">
            {careerProfileDetails[0]?.careerProfilePreferredShift.map((item, key) => <div className="float-left font-bold text-gray-500 mr-2" key={key}>{item?.preferredShift?.title},</div>)}
            {!careerProfileDetails[0]?.careerProfilePreferredShift &&
              <button className="text-blue-600 text-sm font-semibold" onClick={openModal}>Add preferred shift</button>
            }
          </div>
        </div>
        <div >
          <div className="text-gray-500">Preferred work location</div>
          <div className="text-sm">
            {careerProfileDetails[0]?.careerProfilePreferredLocations.map((item, key) => <div className="float-left font-bold text-gray-500 mr-2" key={key}>{item?.location?.title},</div>)}
            {!careerProfileDetails[0]?.careerProfilePreferredLocations &&
              <button className="text-blue-600 text-sm font-semibold" onClick={openModal}>Add Preferred work location</button>
            }
          </div>
        </div>
        {careerProfileDetails[0]?.expectedSalary &&
          <div>
            <div className="text-gray-500">Expected salary</div>
            <div className="text-sm font-bold text-gray-500">{careerProfileDetails[0]?.currency?.title}{careerProfileDetails[0]?.expectedSalary}</div>
            {!careerProfileDetails[0]?.expectedSalary &&
              <button className="text-blue-600 text-sm font-semibold" onClick={openModal}>Add expected salary</button>
            }
          </div>
        }
      </div>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalBody={<CareerProfileForm profileDashboard={careerProfileDetails} closeDialog={closeDialog} />}
      />
    </div>



  )
}

export default CareerProfile