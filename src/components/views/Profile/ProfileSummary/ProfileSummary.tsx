import { useState, useEffect } from 'react';
import Modal from '../../../commonComponents/Modal';
import ProfileSummaryForm from './ProfileSummaryForm';
import { useAppSelector, useAppDispatch } from '../../../../';
import { clearUpdateProfileDashboardSlice } from '../../../../store/reducers/jobSeekerProfile/profileDashboardUpdate';
import { profileDashboardGet } from '../../../../store/reducers/jobSeekerProfile/ProfileDashboardGet';
import { FiEdit2 } from "react-icons/fi";

const ProfileSummary = () => {
    const dispatch = useAppDispatch();
    const { profileDashboard } = useAppSelector((state) => state.getProfileDashboard);
    const { success } = useAppSelector((state) => state.updateProfileDashboard);
    const [isOpen, setIsOpen] = useState(false);
    const testSummary = "Your Profile Summary should mention the highlights of your career and education, what your professional interests are, and what kind of a career you are looking for. Write a meaningful summary of more than 50 characters.";

    useEffect(() => {
        if (success) {
            setIsOpen(false);
            dispatch(clearUpdateProfileDashboardSlice());
            dispatch(profileDashboardGet());
        }
    }, [success, dispatch]);

    const openModal = () => {
        setIsOpen(true);
    };
    const closeDialog = () => {
        setIsOpen(false);
    };

    return (
        <div className="w-full rounded-2xl bg-white p-4 mt-5" >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <h1>Profile summary</h1>
                    {
                        profileDashboard[0]?.profileSummary
                        &&
                        <span className="ml-2 text-gray-400 hover:scale-125 cursor-pointer">
                            <FiEdit2 onClick={openModal} />
                        </span>
                    }
                </div>
                {
                    !profileDashboard[0]?.profileSummary
                    &&
                    <h1 className="text-blue-600 font-medium cursor-pointer"
                        onClick={openModal}>
                        Add profile summary
                    </h1>
                }
            </div>
            <span className="text-sm text-gray-500">
                {
                    !profileDashboard[0]?.profileSummary
                    && testSummary
                }
                {profileDashboard[0]?.profileSummary}
            </span>
            <Modal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                modalBody={
                    <ProfileSummaryForm
                        testSummary={testSummary}
                        id={profileDashboard[0]?.id}
                        defaultProfileSummary={profileDashboard[0]?.profileSummary}
                        closeDialog={closeDialog} />
                }
            />
        </div>
    )
}

export default ProfileSummary;