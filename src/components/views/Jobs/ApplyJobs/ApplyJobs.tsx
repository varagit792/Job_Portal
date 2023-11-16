import React, { useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import QuestionnaireDescriptiveField from './QuestionnaireDescriptiveField'
import QuestionnaireMultipleChoice from './QuestionnaireMultipleChoice'
import QuestionnaireSingleChoice from './QuestionnaireSingleChoice'
import QuestionnaireNumberChoice from './QuestionnaireNumberChoice'
import { yupResolver } from '@hookform/resolvers/yup'
import { applyJobsSchema } from '../../../../schema/applyJobs';
import { IFormApplyJobs } from '../../../../interface/jobSeeker/applyJobs';

const ApplyJobs = ({ questionnaire, closeDialog }: any) => {

  const [formValues, setFormValues] = useState([{ question: "", questionType: { label: "", value: "" }, characterLimit: "", requiredCheck: "", rangeMax: "", multipleSelection: [{ option: "" }], singleSelection: [{ option: "" }] }]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
    getValues
  } = useForm<IFormApplyJobs>({
    resolver: yupResolver(applyJobsSchema) as any,
  });

  // const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
  //   control,
  //   name: "questionnaire",
  // });

  const onSubmit = (data: IFormApplyJobs) => {
    console.log(data);

  }

  let handlesChange = (i: any, e: any, val: any, fieldName: any = '') => {
    let newFormValues = [...formValues];

    if (fieldName === 'characterLimit') {
      newFormValues[i].characterLimit = val;
    }
    if (fieldName === 'requiredCheck') {
      newFormValues[i].requiredCheck = val;
    }
    if (fieldName === 'rangeMax') {
      newFormValues[i].rangeMax = val;
    }
    if (fieldName === 'question') {
      newFormValues[i].question = val;
    }
    if (fieldName === 'questionType') {
      newFormValues[i].questionType = val;
    }
    if (fieldName === 'requiredCheck') {
      newFormValues[i].requiredCheck = val;
    }

    setFormValues(newFormValues);

  }

  return (
    <div className="w-full rounded-2xl bg-white p-4 mt-4 border border-[#E0E7FF]" >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center font-bold">
          <h1>Apply Jobs</h1>
        </div>

      </div>
      <span className="text-sm text-gray-500">
      </span>
      <form onSubmit={handleSubmit(onSubmit)}>
        {questionnaire && questionnaire?.map((questionSet: any, index: any) => <div key={index}>
          {questionSet?.questionType === 'Descriptive' && <QuestionnaireDescriptiveField
            index={index}
            questionSet={questionSet}
            register={register}
            handlesChange={handlesChange}
            watch={watch}
          />}
          {questionSet?.questionType === 'multipleChoice' && <QuestionnaireMultipleChoice
            index={index}
            control={control}
            Controller={Controller}
            questionSet={questionSet}
            getValues={getValues}
            setValue={setValue}
          />}
          {questionSet?.questionType === 'singleChoice' && <QuestionnaireSingleChoice
            index={index}
            control={control}
            Controller={Controller}
            questionSet={questionSet}
            getValues={getValues}
            setValue={setValue}
          />}
          {questionSet?.questionType === 'NumberChoice' && <QuestionnaireNumberChoice
            index={index}
            questionSet={questionSet}
            register={register}
            handlesChange={handlesChange}
            watch={watch}
          />}
        </div>)}
        <div className="mt-5 flex justify-end items-center">
          <div>
            <button
              type="button"
              className="mr-3"
              onClick={closeDialog}
            >
              Cancel
            </button>
            <button
              form='my-form' type="submit"
              className={"rounded-3xl bg-blue-500 text-white px-5 py-1.5"}
            >
              Apply now
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ApplyJobs