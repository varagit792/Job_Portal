import React from 'react';

function QuestionnaireSingleChoice({ index, questionSet, watch, register }: any) {

  return (
    <>
      <div className="mb-4" key={`QuestionnaireSingleChoice${index}`}>
        <div className="block text-sm font-medium leading-6 text-gray-900 ">{index + 1}. {questionSet?.question}</div>
        <div className="mt-1 grid-cols-3 flex ">
          {
            questionSet?.singleSelection?.map((option: any, key: any) => (
              <div key={key} className='mr-8'>
                {questionSet?.requiredCheck && <input
                  value={option.id}
                  className="mr-2 w-4 h-4"
                  type="radio"
                  maxLength={questionSet?.characterLimit}
                  required={key === 1 && true}
                  {...register(`questionnaire.${index}.singleChoice`)}
                />}
                {!questionSet?.requiredCheck && <input
                  value={option.id}
                  className="mr-2 w-4 h-4"
                  type="radio"
                  maxLength={questionSet?.characterLimit}
                  {...register(`questionnaire.${index}.singleChoice`)}
                />}
                <label>{option.option}</label>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default QuestionnaireSingleChoice