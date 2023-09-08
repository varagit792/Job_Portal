import React, { useEffect, useState } from 'react';
import { FiEdit2 } from "react-icons/fi";
import Modal from '../../../commonComponents/Modal';
import KeySkillsForm from './KeySkillsForm';
import { useAppDispatch, useAppSelector } from '../../../..';
import { clearGetKeySkillsSlice, keySkillsGet } from '../../../../store/reducers/dropdown/keySkills';

const KeySkills = ({ profileDashboard }: any) => {
  const modalTitle = 'Key skills';
  const [isOpen, setIsOpen] = useState(false);
  const [keySkill, setKeySkill] = useState([]);
  const [databaseSkillSet, setDatabaseSkillSet] = useState([]);
  const [keySkillFetch, setKeySkillFetch] = useState([]);
  const [isAddDelete, setIsAddDeleted] = useState({ state: '', message: '', color: '' });

  const dispatch = useAppDispatch();
  const { success: keySkillsSuccess, keySkills } = useAppSelector((state) => state.getKeySkills);

  useEffect(() => {
    dispatch(keySkillsGet());
  }, [dispatch]);

  useEffect(() => {
    if (keySkillsSuccess)
      dispatch(clearGetKeySkillsSlice());
  }, [dispatch, keySkillsSuccess]);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeDialog = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (profileDashboard[0]?.keySkills) {
      setKeySkillFetch(profileDashboard[0]?.keySkills && profileDashboard[0]?.keySkills?.split(","));
      setDatabaseSkillSet(profileDashboard[0]?.keySkills && profileDashboard[0]?.keySkills?.split(","));
    }

  }, [profileDashboard])

  const modalBody = <KeySkillsForm
    keySkill={keySkills}
    profileDashboard={profileDashboard}
    setDatabaseSkillSet={setDatabaseSkillSet}
    keySkillFetch={keySkillFetch}
    setIsAddDeleted={setIsAddDeleted}
    isAddDelete={isAddDelete}
    setKeySkillFetch={setKeySkillFetch}
    closeDialog={closeDialog}
  />;

  return (
    <div className="w-full rounded-2xl bg-white p-4 mt-5">
      {isAddDelete.state && <p className={`font-normal text-xs text-green-500`}>{isAddDelete.message} </p>}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center justify-between mb-4 font-bold">
          <h1>Key skills</h1>
          {
            databaseSkillSet?.length > 0 &&
            <span className="ml-2 text-gray-400 hover:scale-125 cursor-pointer">
              <FiEdit2 onClick={openModal} />
            </span>
          }
        </div>
        {
          databaseSkillSet?.length === 0 ?
            <h1 className="text-blue-600 font-medium cursor-pointer"
              onClick={openModal}>
              Add key skill
            </h1> : ''
        }
      </div>
      <div className="flex flex-wrap">
        {databaseSkillSet && databaseSkillSet?.map((item, key) =>
          <span key={key} className="text-xs border border-gray-300 rounded-3xl py-1 px-2 text-center m-1.5">{item}</span>
        )}
      </div>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalBody={modalBody}
      />
    </div>
  )
}

export default KeySkills