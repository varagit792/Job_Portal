import React, { useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import QuestionnaireDescriptiveField from './QuestionnaireDescriptiveField'
import QuestionnaireMultipleChoice from './QuestionnaireMultipleChoice'
import QuestionnaireSingleChoice from './QuestionnaireSingleChoice'
import QuestionnaireNumberChoice from './QuestionnaireNumberChoice'
import { yupResolver } from '@hookform/resolvers/yup'
import { applyJobsSchema } from '../../../../schema/applyJobs';
import { IFormApplyJobs } from '../../../../interface/jobSeeker/applyJobs';
import { applyJobs } from '../../../../store/reducers/applyJobs/applyJobs';
import { useAppDispatch, useAppSelector } from '../../../..';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';


const ApplyJobs = ({ questionnaire, closeDialog }: any) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [checkboxRequired, isCheckboxRequired] = useState(true);

  //const { applyJobs } = useAppSelector((state) => state.applyJobs);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<IFormApplyJobs>({
    resolver: yupResolver(applyJobsSchema) as any,
    shouldUseNativeValidation: true
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: "questionnaire",
  });

  const onSubmit = (data: IFormApplyJobs) => {
    console.log("data", data);
    const selectedQuestionnaireAnswer: any = [];
    const selectedMultipleChoiceQuestionnaireAnswer: any = [];
    data?.questionnaire?.filter((item: any) => item?.questionType !== 'multipleChoice' && selectedQuestionnaireAnswer?.push({ questionnaire: item?.question, answer: item?.numberChoice ? item?.numberChoice : item?.descriptive ? item?.descriptive : item?.singleChoice ? item?.singleChoice : undefined }));

    data?.questionnaire?.filter((item: any) => item?.questionType === 'multipleChoice' && item?.multipleChoice && item?.multipleChoice?.map((item1: any) => selectedMultipleChoiceQuestionnaireAnswer?.push({ multipleChoiceQuestionnaire: item1, answer: item1 })));

    dispatch(applyJobs({
      "user": Cookies.get("userId"),
      "jobs": id,
      "questionnaireAnswer": selectedQuestionnaireAnswer,
      "multipleChoiceQuestionnaireAnswer": selectedMultipleChoiceQuestionnaireAnswer
    })).then((data: any) => {
      if (data?.payload?.count > 0) {
        toast.info("job already applied !!")
      } else {
        toast.success("job Applied successfully !!")
      }
      closeDialog(true);
    });
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
          <input type='hidden' {...register(`questionnaire.${index}.question`)} value={questionSet?.id} />
          <input type='hidden' {...register(`questionnaire.${index}.questionType`)} value={questionSet?.questionType} />
          {questionSet?.questionType === 'Descriptive' && <QuestionnaireDescriptiveField
            index={index}
            questionSet={questionSet}
            register={register}
            watch={watch}
          />}
          {questionSet?.questionType === 'multipleChoice' && <QuestionnaireMultipleChoice
            index={index}
            watch={watch}
            register={register}
            questionSet={questionSet}
            errors={errors}
            checkboxRequired={checkboxRequired}
            isCheckboxRequired={isCheckboxRequired}
          />}
          {questionSet?.questionType === 'singleChoice' && <QuestionnaireSingleChoice
            index={index}
            watch={watch}
            register={register}
            questionSet={questionSet}
          />}
          {questionSet?.questionType === 'NumberChoice' && <QuestionnaireNumberChoice
            index={index}
            questionSet={questionSet}
            register={register}
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
              type="submit"
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