import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import Select from 'react-select'
import AutocompleteBox from '../../../commonComponents/AutocompleteBox'
import ShortAnswer from './ShortAnswer';
import MultipleChoice from './MultipleChoice';
import SingleChoice from './SingleChoice';
import QuestionType from './QuestionType';

const QuestionnaireForm = ({ closeDialog, setIsQuestionnaireOpen }: any) => {

  const [question, setQuestion] = useState('')


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
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-lg font-medium text-gray-900">Add question</h1>
      </div>
      <span className="text-sm text-gray-500 mb-3">
        These question will be asked at the time of posting the post by jobSeeker.
      </span>
      <form id="my-form" onSubmit={handleSubmit(onSubmit)}>

        <QuestionType register={register} setQuestion={setQuestion} watch={watch} />

        {question === "shortAnswer" && <ShortAnswer />}

        {question === "multipleChoice" && <MultipleChoice />}

        {question === "singleChoice" && <SingleChoice />}

        <div className="w-[30%] grow shrink basis-0 border-rounded rounded-full border-2 border-indigo-500 h-14 px-6 py-3 bg-white-600 shadow justify-left justify-center items-center gap-3 flex">
          <button className="text-slate-500 font-medium leading-normal tracking-tight cursor-pointer" onClick={() => setIsQuestionnaireOpen(true)}>+ Add more questions</button>
        </div>

        <div className="mt-5 flex  items-center">
          <div>
            <button
              type="button"
              className="rounded-3xl bg-blue-500 mr-3 text-white px-5 py-1.5"
            >
              Save as template
            </button>
            <button
              type="submit"
              className="rounded-3xl bg-blue-500 text-white px-5 py-1.5" >
              Attach Question
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default QuestionnaireForm