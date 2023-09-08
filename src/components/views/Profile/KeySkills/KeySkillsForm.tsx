import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useAppDispatch } from '../../../../';
import { useAppSelector } from '../../../../';
import { keySkillsUpdate } from '../../../../store/reducers/jobSeekerProfile/keySkills';
import { GrFormClose } from 'react-icons/gr';
import Select from 'react-select'
import AutocompleteBox from '../../../commonComponents/AutocompleteBox';

interface IFormInputs {
  jobSeekerId: string
  keySkills: {
    value: string;
    label: string
  };

}

const KeySkillsForm = ({ keySkill, profileDashboard, setDatabaseSkillSet, keySkillFetch, setKeySkillFetch, isAddDelete, setIsAddDeleted, closeDialog }: any) => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState("");
  const { success } = useAppSelector((state) => state.keySkills);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInputs>({
  });

  // OnSubmit button
  const onSubmit = async (data: IFormInputs) => {
    if (!isInArray(data?.keySkills?.label, keySkillFetch)) {

      dispatch(keySkillsUpdate({
        jobSeekerId: profileDashboard[0]?.id,
        keySkills: keySkillFetch.toString(),
      })).then(() => {
        setDatabaseSkillSet(keySkillFetch);
        setIsAddDeleted({ state: "2", message: "Key skill added successfully", color: "green" });
        closeDialog(false);
      });
    } else {
      setIsAddDeleted({ state: "1", message: "Already added!!", color: "red" });
    }
  };

  // Check the item in array
  function isInArray(value: string, array: string[]) {
    return array?.indexOf(value) > -1;
  }

  // Delete and Add the item
  const handleAddDelete = (action: string, item: string) => {
    if (action === 'Delete') {
      var filteredData = keySkillFetch?.filter(function (filterItem: any) {
        return filterItem !== item
      })

      setKeySkillFetch(filteredData);
    }
    if (action === 'Add') {
      if (!isInArray(item, keySkillFetch)) {

        filteredData = [...keySkillFetch, item];
        setKeySkillFetch(filteredData);
      } else {
        setIsAddDeleted({ state: "1", message: "Already added!!", color: "red" });
      }
    }
  }

  const handleChange = (data: any) => {

    if (!isInArray(data?.label, keySkillFetch)) {
      if (data?.label !== '')
        setKeySkillFetch([...keySkillFetch, data?.label]);
    } else {
      setIsAddDeleted({ state: "1", message: "Already added!!", color: "red" });
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setIsAddDeleted({ state: '', message: '', color: '' })
    }, 5000);

  }, [])

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-lg font-medium text-gray-900">Key skills
        </h1>
      </div>
      <div className="col-start-2 col-end-4">
        <h1 className="text-sm text-gray-500 mb-3"> Tell recruiters what you know or what you are known for e.g. Direct Marketing, Oracle, Java etc. We will send you job recommendations based on these skills. each skill is separated by a comma.
        </h1>
        <h2 className=" text-lg mb-5 col-start-1 col-end-5"> Skills</h2>
        {isAddDelete.state && <p className={`font-normal text-xs text-${isAddDelete.color}-500`}> {isAddDelete.message}</p>}
        <div className="flex flex-wrap">
          {keySkillFetch && keySkillFetch?.map((item: any, key: number) =>
            <div key={key} className="text-xs border border-gray-300 rounded-3xl py-1 px-2 text-center m-1.5 ">{item}<GrFormClose className='h-4 w-4 float-right ml-2 cursor-pointer' onClick={() => handleAddDelete('Delete', item)} /></div>
          )}
        </div>
        <div className="col-start-1 col-end-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <AutocompleteBox
                control={control}
                fieldName={"keySkills"}
                dropdownData={keySkill.map(({ id, title }: any) => ({ value: id, label: title }))}
                handleChange={handleChange}
                isMulti={false}
                placeholder={"Select key skill"}
              />
              {errors.keySkills && <p className="font-normal text-xs text-red-500">{errors.keySkills.message}</p>}
            </div>
            <div className="mt-10 mb-10 text-sm text-gray-500 mb-3">
              <h2>Or you can select from the suggested set of skills</h2>
              <div className="flex flex-wrap mt-5">
                {keySkill && keySkill.filter((items: any) => items.title?.toLowerCase()
                  .replace(/\s+/g, "")
                  .includes(query.toLowerCase().replace(/\s+/g, ""))
                ).slice(0, 5)?.map((item: any, key: number) =>
                  <div key={key} className="text-xs border border-gray-300 rounded-3xl py-1 px-2 text-center m-1.5 cursor-pointer" onClick={() => handleAddDelete('Add', item.title)} >{item.title}</div>
                )}
              </div>
            </div>
            <div className='float-right'>
              <button type="button" onClick={closeDialog} className="mr-3">Cancel</button>
              <button type="submit" className="rounded-3xl bg-blue-600 text-white px-5 py-1.5">Save</button>
            </div>
          </form>
        </div>
        <div>
        </div>
      </div>
    </div>
  )
}

export default KeySkillsForm