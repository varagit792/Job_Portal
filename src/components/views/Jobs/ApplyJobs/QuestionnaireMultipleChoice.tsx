import React, { useState } from 'react';

const QuestionnaireMultipleChoice = ({ index, questionSet, watch, register, errors, checkboxRequired, isCheckboxRequired }: any) => {
  const handleCheckBox = (e: any) => {
    console.log(e.currentTarget.checked);

    isCheckboxRequired(!e.currentTarget.checked);
  }

  return (
    <>
      <div className="mb-4" key={`QuestionnaireMultipleChoice${index}`}>
        <div className="block text-sm font-medium leading-6 text-gray-900 ">{index + 1}. {questionSet?.question}</div>
        <div className="mt-1 grid-cols-3 flex">
          {
            questionSet?.multipleSelection?.map((option: any, key: any) => (
              <div key={key} className='mr-8'>
                {questionSet?.requiredCheck && <input
                  defaultValue={option.id}
                  className="mr-2 w-4 h-4"
                  type="checkbox"
                  required={checkboxRequired}
                  maxLength={questionSet?.characterLimit}
                  onClick={handleCheckBox}
                  {...register(`questionnaire.${index}.multipleChoice`, {
                  })}
                />}
                {!questionSet?.requiredCheck && <input
                  defaultValue={option.id}
                  className="mr-2 w-4 h-4"
                  type="checkbox"
                  maxLength={questionSet?.characterLimit}
                  {...register(`questionnaire.${index}.multipleChoice`)}
                />}{option.option}{questionSet?.requiredCheck}
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default QuestionnaireMultipleChoice