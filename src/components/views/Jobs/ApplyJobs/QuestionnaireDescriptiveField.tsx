import React from 'react'
import { Controller } from 'react-hook-form'

const QuestionnaireDescriptiveField = ({ index, questionSet, register, watch }: any) => {

  return (
    <div className="flex flex-col">
      <label><span className="mr-2">{index + 1}/10</span><span className="font-bold">{questionSet?.question}</span></label>
      <textarea
        rows={4}
        className="w-full mt-3 border border-[#E2E8F0] p-3 outline-none rounded-lg"
        placeholder="Type your answer here"
        defaultValue={watch(`questionnaire.${index}.descriptive`)}
        autoComplete='off'
        maxLength={questionSet?.characterLimit}
        required={questionSet?.requiredCheck}
        {...register(`questionnaire.${index}.descriptive`)}
      >
      </textarea>
      <div className="flex justify-end items-center">
        <div className="flex justify-center items-center text-sm">
          <span className="text-[#475569]">Characters left</span>
          <div className="border-l border-[#E2E8F0] h-4 mx-2"></div>
          <span className="text-[#E2E8F0]">150/150</span>
        </div>
      </div>
    </div>
  )
}

export default QuestionnaireDescriptiveField