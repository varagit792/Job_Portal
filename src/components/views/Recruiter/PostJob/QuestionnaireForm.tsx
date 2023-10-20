import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import Select from 'react-select'
import AutocompleteBox from '../../../commonComponents/AutocompleteBox'
import ShortAnswer from './ShortAnswer';
import MultipleChoice from './MultipleChoice';
import SingleChoice from './SingleChoice';

const QuestionnaireForm = ({ closeDialog }: any) => {

  const [question, setQuestion] = useState('')
  const options = [
    { value: 'shortAnswer', label: 'Short Answer' },
    { value: 'multipleChoice', label: 'Multiple Choice' },
    { value: 'singleChoice', label: 'Single Choice' }
  ];

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<any>({
    // resolver: yupResolver(CompanySchema || CompanyDraftSchema || CompanySaveSchema),
  });
  const onSubmit = (data: any) => {

  }





  return (
    <div className="flex flex-col ">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-lg font-medium text-gray-900">Add question</h1>
      </div>
      <span className="text-sm text-gray-500 mb-3">
        These question will be asked at the time of posting the post by jobSeeker.
      </span>
      <form id="my-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <div className="block text-sm font-medium leading-6 text-gray-900 ">Question type</div>
          <div className="mt-1">
            <Select
              // defaultValue={options[0]}
              {...register}
              isClearable={true} // enable isClearable to demonstrate extra error handling
              isSearchable={true}
              className="text-sm"
              options={options}
              onChange={(event) => setQuestion(event.value)}
              defaultValue={watch("questionType")}
              placeholder={"Select question Type"}

            />
          </div>
        </div>
        {question === "shortAnswer" && <ShortAnswer />}

        {question === "multipleChoice" && <MultipleChoice />}

        {question === "singleChoice" && <SingleChoice />}

        <div className="mt-5 flex justify-end items-center">
          <div>
            <button
              type="button"
              className="mr-3"
              onClick={closeDialog}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-3xl bg-blue-500 text-white px-5 py-1.5" >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default QuestionnaireForm