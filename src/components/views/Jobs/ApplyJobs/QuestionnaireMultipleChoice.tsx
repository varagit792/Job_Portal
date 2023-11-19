import React, { useState } from 'react';

const QuestionnaireMultipleChoice = ({ index, questionSet, watch, register, errors, checkboxRequired, isCheckboxRequired }: any) => {
  const handleCheckBox = (e: any) => {
    console.log(e.currentTarget.checked);

    isCheckboxRequired(!e.currentTarget.checked);
  }

  console.log(checkboxRequired);

  return (
    <>
      <div className="mb-4" key={`QuestionnaireMultipleChoice${index}`}>
        <div className="block text-sm font-medium leading-6 text-gray-900 ">{index + 1}. {questionSet?.question}</div>
        <div className="mt-1  flex justify-between items-center">
          {
            questionSet?.multipleSelection?.map((option: any, key: any) => (
              <div key={key}>
                <label className="mr-3">
                  {option.option}{questionSet?.requiredCheck}
                  {questionSet?.requiredCheck && <input
                    defaultValue={option.id}
                    className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5 mt-1"
                    type="checkbox"
                    required={checkboxRequired}
                    maxLength={questionSet?.characterLimit}
                    onClick={handleCheckBox}
                    {...register(`questionnaire.${index}.multipleChoice`, {
                    })}
                  />}
                  {!questionSet?.requiredCheck && <input
                    defaultValue={option.id}
                    className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5 mt-1"
                    type="checkbox"
                    maxLength={questionSet?.characterLimit}
                    {...register(`questionnaire.${index}.multipleChoice`)}
                  />}
                </label>
                {errors?.workMode && <p className="font-normal text-xs text-red-500 absolute">{errors?.workMode?.label?.message}</p>}
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default QuestionnaireMultipleChoice