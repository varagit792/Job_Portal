import React from 'react'
import { Controller } from 'react-hook-form'

const QuestionnaireDescriptiveField = ({ index, questionSet, register, watch }: any) => {

  return (
    <>
      <div className="mb-4" key={`QuestionnaireDescriptive${index}`}>
        <div className="block text-sm font-medium leading-6 text-gray-900 ">{index + 1}. {questionSet?.question}</div>
        <div className="mt-1">
          <input
            defaultValue={watch(`questionnaire.${index}.descriptive`)}
            className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5 mt-1"
            placeholder={""}
            autoComplete='off'
            maxLength={questionSet?.characterLimit}
            required={questionSet?.requiredCheck}
            {...register(`questionnaire.${index}.descriptive`)}
          />
        </div>
      </div>
    </>
  )
}

export default QuestionnaireDescriptiveField