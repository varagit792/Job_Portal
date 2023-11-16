import React from 'react';

const QuestionnaireMultipleChoice = ({ index, questionSet, control, Controller, getValues, setValue }: any) => {

  return (
    <>
      <div className="mb-4" key={`QuestionnaireMultipleChoice${index}`}>
        <div className="block text-sm font-medium leading-6 text-gray-900 ">{questionSet?.question}</div>
        <div className="mt-1  flex justify-between items-center">
          {
            questionSet?.multipleSelection?.map((option: any, key: any) => (
              <div key={key}>
                <label className="mr-3">
                  {option.option}
                  <Controller
                    name="multipleChoice"
                    control={control}
                    defaultValue=""
                    render={({ field }: any) => (
                      <input
                        type="checkbox"
                        required={option?.requiredCheck}
                        className="ml-5"
                        {...field}
                        onChange={() => {
                          setValue("multipleChoice", option.id);
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
      {/* <div className="self-stretch h-auto flex-col justify-start items-start gap-2 flex">
        <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Response</div>
        <div className="w-full flex-col justify-start items-start gap-3 flex">
          {formValues[index]?.multipleSelection?.map((element: any, innerMultipleIndex: any) => (
            element.option && <div className="w-full h-12 border-b border-slate-200 justify-start items-center inline-flex" key={innerMultipleIndex}>
              <div className="grow shrink basis-0 h-6 justify-start items-center gap-2 flex">
                <div className="w-6 h-6 relative"><img src={checkbox} /></div>
                <div className="text-black text-base font-normal leading-snug tracking-tight">{element.option}</div>
              </div>
              <div className="justify-start items-center flex">
                <div className="w-6 h-6 bg-slate-100 rounded justify-center items-center flex cursor-pointer" onClick={() => removeMultipleFormFields(index, innerMultipleIndex)}><img src={close} /></div>
              </div>
            </div>))}
          <QuestionnaireMultipleChoiceField
            watch={watch}
            register={register}
            addFormMultipleFields={addFormMultipleFields}
            index={index}
          />
        </div>
      </div>
      <div className="self-stretch justify-start items-center  mt-5 gap-5 inline-flex">
        <div className="justify-start items-center gap-2 flex">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              {...register(`questionnaire.${index}.requiredCheck`)}
              defaultValue={watch(`questionnaire.${index}.requiredCheck`)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-1 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-slate-600 text-base font-normal  leading-snug tracking-tight">Required</span>
          </label>
        </div>
        <div className="w-[65px] p-3 bg-indigo-600 rounded-lg justify-center items-center gap-3 flex cursor-pointer" onClick={e => handleDoneStatusChange(index, !doneStatus[index] || false)}>
          <div className="text-white text-base font-medium leading-snug tracking-tight">Done</div>
        </div>
      </div> */}
    </>
  )
}

export default QuestionnaireMultipleChoice