import React from 'react'
import { Controller } from 'react-hook-form'

const QuestionnaireNumberChoice = ({ index, questionSet, register, handlesChange, watch }: any) => {

  return (
    <>

      <div className="mb-4" key={index}>
        <div className="block text-sm font-medium leading-6 text-gray-900 ">{questionSet?.question}</div>
        <div className="mt-1">
          <input
            defaultValue={watch(`questionnaire.${index}.descriptive`)}
            className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5 mt-1"
            placeholder={""}
            type='number'
            maxLength={questionSet?.characterLimit}
            required={questionSet?.requiredCheck}
            {...register(`questionnaire.${index}.descriptive`)}
            onChange={e => handlesChange(index, e, e.target.value, "descriptive")}
          />
        </div>
      </div>
    </>
  )
}

export default QuestionnaireNumberChoice