import React from 'react'

const QuestionnaireNumberChoice = ({ index, questionSet, register, watch }: any) => {

  return (
    <>

      <div className="mb-4" key={`QuestionnaireNumberChoice${index}`}>
        <div className="block text-sm font-medium leading-6 text-gray-900 ">{index + 1}. {questionSet?.question}</div>
        <div className="mt-1">
          <input
            defaultValue={watch(`questionnaire.${index}.numberChoice`)}
            className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5 mt-1"
            placeholder={""}
            type='number'
            maxLength={questionSet?.characterLimit}
            required={questionSet?.requiredCheck}
            {...register(`questionnaire.${index}.numberChoice`)}
          />
        </div>
      </div>
    </>
  )
}

export default QuestionnaireNumberChoice