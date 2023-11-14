import React from 'react';

function QuestionnaireSingleChoice({ index, questionSet, control, Controller, getValues, setValue }: any) {

  return (
    <>
      <div className="mb-4" key={index}>
        <div className="block text-sm font-medium leading-6 text-gray-900 ">{questionSet?.question}</div>
        <div className="mt-1  flex justify-between ">
          {
            questionSet?.singleSelection?.map((option: any) => (
              <div key={option}>
                <label className="mr-3">
                  {option.option}
                  <Controller
                    name="singleChoice"
                    control={control}
                    defaultValue=""
                    render={({ field }: any) => (
                      <input
                        type="radio"
                        className="ml-5"
                        required={option?.requiredCheck}
                        {...field}
                        checked={getValues("singleChoice") === option.id}
                        onChange={() => {
                          setValue("singleChoice", option.id);
                        }}
                      />
                    )}
                  />
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