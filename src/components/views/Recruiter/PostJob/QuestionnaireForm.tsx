import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import ShortAnswer from './ShortAnswer';
import MultipleChoice from './MultipleChoice';
import SingleChoice from './SingleChoice';
import rawBin from '../../../../assets/svg/rawBin.svg';
import plus from "../../../../assets/svg/plus.svg";
import editIcon from "../../../../assets/svg/Edit_icon.svg";
import upIcon from "../../../../assets/svg/upIcon.svg";
import downIcon from "../../../../assets/svg/downIcon.svg";
import NumberChoice from './NumberChoice';

const QuestionnaireForm = () => {

  const [question, setQuestion] = useState<Array<string>>([]);
  const [doneStatus, setDoneStatus] = useState<Array<boolean>>([])
  const [formValues, setFormValues] = useState([{ question: "", questionType: "", characterLimit: "", requiredCheck: "", rangeMax: "", rangeMin: "", multipleSelection: '', singleSelection: "" }])

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<any>({
    // resolver: yupResolver(CompanySchema || CompanyDraftSchema || CompanySaveSchema),
  });
  const onSubmit = (data: any) => {
  }

  const options = [
    { value: 'Descriptive', label: 'Descriptive' },
    { value: 'NumberChoice', label: 'Number' },
    { value: 'singleChoice', label: 'Single Choice' },
    { value: 'multipleChoice', label: 'Multiple Choice' }
  ];

  const handleDoneStatusChange = (i: any, val: boolean) => {
    let newDoneStatus = [...doneStatus];
    newDoneStatus[i] = val;
    setDoneStatus(newDoneStatus);
  }

  const handleQuestionTypeChange = (i: any, e: any, val: any) => {
    let newQuestion = [...question];
    newQuestion[i] = val;
    setQuestion(newQuestion);
    let newDoneStatus = [...doneStatus];
    newDoneStatus[i] = true;
    setDoneStatus(newDoneStatus);
    handlesChange(i, e, val);
  }

  let handlesChange = (i: any, e: any, val: any) => {
    let newFormValues = [...formValues];
    newFormValues[i] = val;
    setFormValues(newFormValues);

  }

  let addFormFields = () => {
    setFormValues([...formValues, { question: "", questionType: "", characterLimit: "", requiredCheck: "", rangeMax: "", rangeMin: "", multipleSelection: "", singleSelection: "" }])
  }

  let removeFormFields = (i: string) => {
    let newFormValues = [...formValues];
    newFormValues.splice(parseInt(i), 1);
    setFormValues(newFormValues)
  }
  console.log(question);

  return (
    <div className="w-full flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)}>
        {formValues.map((element: any, index: any) => (
          <div className="h-auto p-7 bg-white rounded-xl shadow border border-indigo-600 flex-col justify-start  items-end gap-7 mt-5 mb-5" key={index}>
            <div className="w-full self-stretch justify-end items-center inline-flex">
              <div className="grow shrink basis-0 text-slate-900 text-base font-bold leading-snug tracking-tight">Question {index + 1}/10</div>
              <div className="justify-end items-center gap-2 flex">
                <div className="w-6 h-6 flex-col justify-center items-center inline-flex cursor-pointer"><img src={rawBin} onClick={() => removeFormFields(index)} /></div>
                {question[index] && <div className="w-6 h-6 flex-col justify-center items-center inline-flex cursor-pointer" onClick={e => handleDoneStatusChange(index, !doneStatus[index] || false)}> <img src={editIcon} /></div>}
                {question[index] && <div className="w-6 h-6 justify-center items-center flex cursor-pointer" onClick={e => handleDoneStatusChange(index, !doneStatus[index] || false)}>{doneStatus[index] ? <img src={upIcon} /> : <img src={downIcon} />}</div>}
              </div>
            </div>
            <div className="self-stretch h-[73px] flex-col justify-start items-start mt-5 gap-2 flex">
              <div className="text-slate-700 text-sm  leading-[16.80px] tracking-tight">Question</div>
              <div className="w-full grid grid-cols-2 items-start gap-5 ">
                <div className=" flex-col justify-start items-start gap-2 ">
                  <div className='w-full'>
                    <input defaultValue={watch("question")}
                      className='w-full border text-sm border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5'
                      placeholder={"Please enter question"}
                      {...register("question")}
                      onChange={e => handlesChange(index, e, e.target.value)} />

                  </div>
                </div>
                <div className=" flex-col justify-start  gap-2 ">
                  <div className='w-full'>
                    <Select
                      {...register}
                      isClearable={true} // enable isClearable to demonstrate extra error handling
                      isSearchable={true}
                      className="text-sm"
                      options={options}
                      onChange={(e: any) => handleQuestionTypeChange(index, e, e.value)}
                      defaultValue={watch("questionType")}
                      placeholder={"Select question Type"}
                    />
                  </div>
                </div>
              </div>
            </div>

            {question[index] === "Descriptive" && doneStatus[index] &&
              <ShortAnswer
                index={index}
                register={register}
                handleDoneStatusChange={handleDoneStatusChange}
                doneStatus={doneStatus}
                handlesChange={handlesChange}
                watch={watch}
              />
            }
            {question[index] === "multipleChoice" && doneStatus[index] &&
              <MultipleChoice
                index={index}
                register={register}
                handleDoneStatusChange={handleDoneStatusChange}
                doneStatus={doneStatus}
                handlesChange={handlesChange}
                watch={watch}
              />
            }
            {question[index] === "singleChoice" && doneStatus[index] &&
              <SingleChoice
                index={index}
                register={register}
                handleDoneStatusChange={handleDoneStatusChange}
                doneStatus={doneStatus}
                handlesChange={handlesChange}
                watch={watch}
              />
            }
            {question[index] === "NumberChoice" && doneStatus[index] &&
              <NumberChoice
                index={index}
                register={register}
                handleDoneStatusChange={handleDoneStatusChange}
                doneStatus={doneStatus}
                handlesChange={handlesChange}
                watch={watch}
              />
            }

          </div>
        ))}
      </form>
      <div className="self-stretch h-auto flex-col justify-start items-start gap-5 flex">
        {formValues.length < 2 && <div className="w-full  border-dashed h-12 pl-6 pr-3 py-3 bg-white rounded-lg border border-indigo-300 justify-center items-center gap-3 inline-flex cursor-pointer" onClick={() => addFormFields()} >
          <div className="text-indigo-600 text-base font-medium  leading-snug tracking-tight">Add question</div>
          <div className="w-10 h-10 flex-col justify-center items-center inline-flex indigo-600 text-base font-medium"><img src={plus} /></div>
        </div>}
        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
          <span className="absolute px-3 font-medium text-gray-900  bg-[#f8fafc]  dark:text-white dark:bg-gray-900">OR</span>
        </div>
        <div className="self-stretch h-12 p-3 bg-white rounded-lg border border-slate-200 justify-start items-center gap-2 inline-flex">
          <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-2 flex">
            <div className="grow shrink basis-0 text-slate-400 text-sm font-normal  leading-snug tracking-tight">Use a previously posted question</div>
          </div>
          <div className="w-6 h-6 justify-center items-center flex"></div>
        </div>
      </div>
    </div>
  )
}

export default QuestionnaireForm