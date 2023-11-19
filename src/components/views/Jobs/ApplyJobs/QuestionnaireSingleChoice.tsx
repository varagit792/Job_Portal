import React from 'react';

function QuestionnaireSingleChoice({ index, questionSet, watch, register }: any) {

  return (
    <>
      <div className="mb-4" key={`QuestionnaireSingleChoice${index}`}>
        <div className="block text-sm font-medium leading-6 text-gray-900 ">{index + 1}. {questionSet?.question}</div>
        <div className="mt-1  flex justify-between ">
          {
            questionSet?.singleSelection?.map((option: any, key: any) => (
              <div key={key}>
                <label className="mr-3">
                  {option.option}{questionSet?.requiredCheck}
                  {questionSet?.requiredCheck && <input
                    value={option.id}
                    className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5 mt-1"
                    type="radio"
                    maxLength={questionSet?.characterLimit}
                    required={key === 1 && true}
                    {...register(`questionnaire.${index}.singleChoice`)}
                  />}
                  {!questionSet?.requiredCheck && <input
                    value={option.id}
                    className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5 mt-1"
                    type="radio"
                    maxLength={questionSet?.characterLimit}
                    {...register(`questionnaire.${index}.singleChoice`)}
                  />}
                </label>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default QuestionnaireSingleChoice