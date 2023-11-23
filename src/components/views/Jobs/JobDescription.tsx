import { Fragment, useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import ShortJobCard from '../../commonComponents/ShortJobCard';
import { useAppDispatch, useAppSelector } from '../../..';
import { getJobDetail } from '../../../store/reducers/jobs/GetJobDetails';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { Link, useParams } from 'react-router-dom';
import companyLogo from '../../../assets/png/company_logo.png';
import experienceIcon from '../../../assets/svg/ExperienceIcon.svg';
import moneyIcon from '../../../assets/svg/MoneyIcon.svg';
import locationIcon from '../../../assets/svg/LocationIcon.svg';
import bookMarkIcon from '../../../assets/svg/bookMark.svg';
import peopleIcon from '../../../assets/svg/peopleIcon.svg';
import rightArrow from '../../../assets/svg/ArrowRight.svg';
import Modal from '../../commonComponents/Modal';
import ApplyJobs from './ApplyJobs/ApplyJobs';
import { ToastContainer, toast } from 'react-toastify';
import { IFormApplyJobs, IFormApplyJobsWithoutQuestionnaire } from '../../../interface/jobSeeker/applyJobs';
import { applyJobsSchema } from '../../../schema/applyJobs';
import { applyJobs } from '../../../store/reducers/applyJobs/applyJobs';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Cookies from 'js-cookie';
import TickRecruiter from '../../commonComponents/TickRecruiter';

import TickIcons from '../../../assets/svg/tick_icons.svg';
import PDFIcon from '../../../assets/svg/PDFIcon.svg';
import DeleteIcon from '../../../assets/svg/Delete.svg';
import { scrollToTop } from '../../utils/utils';

const JobDescription = () => {
  const [checkEmpty, isCheckEmpty] = useState(true);
  const [lastUpdatedTimestamp, setLastUpdatedTimestamp] = useState<Date | null>(null);
  const { id } = useParams();
  const [toggleJobApply, setToggleJobApply] = useState(false);
  const [toggleResumeUpload, setToggleResumeUpload] = useState(false);
  const [toggleQuestionnaire, setToggleQuestionnaire] = useState(false);
  const [toggleReview, setToggleReview] = useState(false);

  const dispatch = useAppDispatch();
  const { success, jobDetail } = useAppSelector((state) => state.getJobDetail);
  const [checkboxRequired, isCheckboxRequired] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<IFormApplyJobsWithoutQuestionnaire>({
    resolver: yupResolver(applyJobsSchema) as any,
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: "questionnaire",
  });
  console.log("watch------------------------>", watch());
  const onSubmit = (data: IFormApplyJobsWithoutQuestionnaire) => {
    console.log("data--------------------->", data);

    const userId = Cookies.get("userId");
    const selectedQuestionnaireAnswer: any = [];
    const selectedMultipleChoiceQuestionnaireAnswer: any = [];

    data?.questionnaire && data?.questionnaire?.filter((item: any) => item?.questionType !== 'MultipleChoice' && selectedQuestionnaireAnswer?.push({ questionnaire: item?.question, answer: item?.numberChoice ? item?.numberChoice : item?.descriptive ? item?.descriptive : item?.singleChoice ? item?.singleChoice : undefined }));
    data?.questionnaire && data?.questionnaire?.filter((item: any) => item?.questionType === 'MultipleChoice' && Array.isArray(item?.multipleChoice) ? item?.multipleChoice?.map((item1: any) => selectedMultipleChoiceQuestionnaireAnswer?.push({ multipleChoiceQuestionnaire: item1, answer: item1 })) : selectedMultipleChoiceQuestionnaireAnswer?.push({ multipleChoiceQuestionnaire: item?.multipleChoice, answer: item?.multipleChoice }));

    dispatch(applyJobs({
      "user": userId && parseInt(userId),
      "jobs": id && parseInt(id),
      "questionnaireAnswer": selectedQuestionnaireAnswer,
      "multipleChoiceQuestionnaireAnswer": selectedMultipleChoiceQuestionnaireAnswer
    })).then((data: any) => {
      if (data?.payload?.count > 0) {
        toast.info("job already applied !!")
      } else {
        toast.success("job Applied successfully !!")
      }
    });
  }

  useEffect(() => {
    dispatch(getJobDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (success) {
    }
  }, [success, dispatch]);


  useEffect(() => {
    const parsedDate = parseISO(jobDetail?.createdAt);
    if (!isNaN(parsedDate.getDate())) {
      setLastUpdatedTimestamp(parsedDate);
    }

    jobDetail?.questionnaire?.map(item => {
      if (item.question === '') {
        isCheckEmpty(false)
      }
    });
  }, [jobDetail]);

  const locationCount = jobDetail?.company?.location?.length;

  const handleDiscard = () => {
    scrollToTop();
    if (toggleJobApply && !toggleResumeUpload && !toggleQuestionnaire) {
      setToggleJobApply(false);
    }
    if (toggleResumeUpload && !toggleQuestionnaire) {
      setToggleResumeUpload(false);
    }
    if (toggleQuestionnaire) {
      setToggleQuestionnaire(false);
    }
  }

  const handleNext = () => {
    scrollToTop();
    if (toggleJobApply) {
      setToggleResumeUpload(true);
    }
    if (toggleResumeUpload) {
      setToggleQuestionnaire(true);
    }
  }

  const handleCheckBox = (e: any) => {
    isCheckboxRequired(!e.currentTarget.checked);
  }

  return (
    <Fragment>
      <div className="h-[10%] w-full"></div>
      <div className="grid grid-cols-12 gap-10 py-6 px-32 bg-[#F8FAFC] ">

        {!toggleJobApply ?
          <div className="col-start-1 col-end-8  p-5">
            <div className="border border-[#E0E7FF] rounded-xl p-5 bg-white">
              <div className="self-stretch h-44 flex-col justify-start items-start gap-5 flex">
                <div className="self-stretch justify-start items-center gap-3 inline-flex">
                  <img className="w-14 h-14 rounded-lg" src={companyLogo} alt="companyLogo" />
                  <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                    <div className="self-stretch text-slate-900 text-2xl font-bold  leading-7 tracking-tight">{jobDetail?.title}</div>
                    <div className="self-stretch justify-start items-start gap-1 inline-flex">
                      <div className="grow shrink basis-0 text-slate-500 text-base font-medium leading-snug tracking-tight">{jobDetail?.company?.title}</div>
                      <span className="text-slate-400 text-sm font-normal  leading-none tracking-tight">
                        {lastUpdatedTimestamp !== null && formatDistanceToNow(lastUpdatedTimestamp, { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="self-stretch h-px border border-indigo-100"></div>
                <div className="self-stretch h-16 flex-col justify-start items-start gap-5 flex">
                  <div className="self-stretch justify-start items-start gap-5 inline-flex">
                    <div className="justify-start items-center gap-2 flex">
                      <img src={experienceIcon} alt="experience" />
                      <span className="text-slate-500 text-base font-medium leading-snug tracking-tight">
                        {jobDetail?.totalExpYearStart?.title[0]} -
                      </span>
                      <span className="text-slate-500 text-base font-medium leading-snug tracking-tight">
                        {jobDetail?.totalExpYearEnd?.title[0]} Years
                      </span>
                    </div>
                    {!jobDetail?.hideSalaryDetails && <div className="justify-start items-center gap-2 flex">
                      <img src={moneyIcon} alt="moneyIcon" />
                      <span className="text-slate-500 text-base font-medium leading-snug tracking-tight">
                        {jobDetail?.payScaleLowerRange?.title} -
                      </span>
                      {jobDetail?.payScaleUpperRange &&
                        <span className=" text-slate-500 text-base font-medium leading-snug tracking-tight"> {jobDetail?.payScaleUpperRange?.title}  {jobDetail?.numberSystem?.title} {jobDetail?.recurrence?.title}
                        </span>}
                    </div>}
                    <div className="justify-start items-center gap-2 flex">
                      <img src={locationIcon} alt="location" />
                      {jobDetail?.jobsLocation?.map((loc: any) =>
                        <span className="text-slate-500 text-base font-medium leading-snug tracking-tight">
                          {loc?.location?.title},
                        </span>)}
                    </div>
                  </div>
                  <div className="justify-start items-center gap-5 inline-flex">
                    {jobDetail?.workMode?.title && <div className=" px-3 py-2 bg-orange-50 rounded justify-center items-center gap-2.5 flex">
                      <div className="text-orange-600 text-sm font-normal leading-none tracking-tight">{jobDetail?.workMode?.title}</div>
                    </div>}
                    {jobDetail?.employmentType?.title && <div className=" px-3 py-2 bg-green-50 rounded justify-center items-center gap-2.5 flex">
                      <div className="text-green-600 text-sm font-normal leading-none tracking-tight">{jobDetail?.employmentType?.title}</div>
                    </div>}
                  </div>
                </div>
              </div>
              <div className="justify-start items-center gap-5 inline-flex mt-4">
                {!checkEmpty ?
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <button type='submit' className="w-48  px-6 py-1.5 bg-indigo-600 rounded-lg shadow justify-center items-center gap-3 flex" >
                      <span className="text-white text-xl font-medium  leading-normal tracking-tight">Apply</span>
                    </button>
                  </form>
                  :
                  <button className="w-48  px-6 py-1.5 bg-indigo-600 rounded-lg shadow justify-center items-center gap-3 flex" onClick={() => setToggleJobApply(true)}>
                    <span className="text-white text-xl font-medium  leading-normal tracking-tight">Apply</span>
                  </button>
                }
                <button className="w-28 pl-6 pr-3 py-1.5 bg-indigo-50 rounded-lg justify-center items-center  gap-3 flex">
                  <span className="text-indigo-900 text-xl font-medium  leading-normal tracking-tight ">Save</span>
                  <span>
                    <img src={bookMarkIcon} alt="bookMark" />
                  </span>
                </button>
              </div>
            </div>
            <div className="border border-[#E0E7FF] rounded-xl p-5 mt-4 bg-white " >
              <div className="  flex-col justify-start items-start gap-5 flex-wrap">
                <div className=" text-slate-900 text-base font-bold leading-snug tracking-tight">Job Description
                </div>
                <div className=" w-full  text-slate-500 text-base font-medium  leading-snug tracking-tight flex flex-wrap mb-2">
                  <p className="w-full break-words"> {jobDetail?.jobDescription}</p>
                </div>
              </div>
              <div className="self-stretch h-px border border-indigo-100 my-5"></div>
              <div className="self-stretch flex-col justify-start items-start gap-5 flex">
                <div className="self-stretch text-slate-900 text-base font-bold  leading-snug tracking-tight">
                  Key Responsibilities</div>
                <span className="w-full break-words text-slate-500 text-base font-medium leading-snug tracking-tight">
                  {jobDetail?.keyResponsibility}
                </span>
              </div>
              <div className="self-stretch h-px border border-indigo-100 my-5"></div>
              <div className="self-stretch  flex-col justify-start items-start gap-5 flex ">
                <div className="self-stretch text-slate-900 text-base font-bold  leading-snug tracking-tight">Skills</div>
                <div className=" justify-start items-start gap-3 flex-row flex flex-wrap">
                  {jobDetail?.jobsKeySkills?.map((keySkill) =>
                    <div className=" px-3 py-2 bg-slate-50 rounded-lg justify-center items-center gap-2.5 flex">
                      <span className="text-black text-base font-normal  leading-snug tracking-tight">{keySkill?.keySkills?.title}</span>
                    </div>)}
                </div>
              </div>
            </div>
            <div className="border border-[#E0E7FF] rounded-xl p-5 mt-4 bg-white">
              <span className="self-stretch text-slate-900 text-base font-bold leading-snug tracking-tight">About the company
              </span>
              <div className="self-stretch justify-start items-center gap-3 flex mt-2">
                <img className="w-14 h-14 rounded-lg" src={companyLogo} alt="companyLogo" />
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                  <div className="self-stretch text-slate-900 text-2xl font-bold leading-7 tracking-tight overflow-hidden whitespace-nowrap text-ellipsis w-96">{jobDetail?.company?.title}</div>
                  <div className="w-40 justify-start items-center gap-2 inline-flex">
                    <div className="justify-start items-center gap-1 flex">
                      <AiFillStar color="yellow" />
                      {jobDetail?.company?.rating ? <div className="text-black text-sm font-normal leading-none tracking-tight">{jobDetail?.company?.rating}</div> : <div >N.A</div>}
                    </div>
                    {jobDetail?.company?.reviews && <Fragment>
                      <div className=" border-l border-indigo-100 h-4"></div>
                      <div className="text-slate-500 text-sm font-normal leading-none tracking-tight">{jobDetail?.company?.reviews}
                      </div>
                    </Fragment>}
                  </div>
                </div>
              </div>
              <div className="justify-start items-start gap-5 inline-flex mt-2">
                <div className="justify-start items-center gap-2 flex">
                  <img src={locationIcon} alt="location" />
                  {jobDetail?.company?.location?.length > 0 ? jobDetail?.company?.location?.map((loc, index) =>
                    (index < locationCount) ? <span className="ml-1 text-slate-500 text-base font-medium">{loc?.title}, </span>
                      : <span className="ml-1 text-base font-medium text-slate-500">{loc?.title}. </span>
                  ) : <span className="ml-1 text-slate-500 text-base font-medium">N.A</span>}
                </div>
                <div className=" border-l border-indigo-100 h-4"></div>
                {jobDetail?.company?.employeeCount && <div className="justify-start items-center gap-2 flex">
                  <img src={peopleIcon} alt="people" />
                  <div className="text-slate-500 text-base font-medium leading-snug tracking-tight">{jobDetail?.company?.employeeCount}
                  </div>
                </div>
                }
              </div>
              <div className="px-2 py-1.5  w-44 bg-indigo-50 rounded-lg justify-center items-center text-center mt-2">
                <button className="text-indigo-900 text-base font-medium  leading-snug tracking-tight ">More open positions</button>
              </div>
            </div>
          </div>
          :
          <div className="col-start-1 col-end-8">
            <div className="flex justify-center items-center">
              <div className="flex flex-col justify-start items-center relative">
                {!toggleJobApply ?
                  <span className="w-10 h-10 bg-[#F8FAFC] text-[#4F46E5] border-4 border-[#EEF2FF] rounded-full flex justify-center items-center">1</span>
                  :
                  <span className="w-10 h-10 rounded-full bg-[#4F46E5] flex items-center justify-center">
                    <img src={TickIcons} alt="TickIcons" className='w-3 h-3' />
                  </span>
                }
                <span className="absolute top-10 text-[#64748B] text-sm">Resume</span>
              </div>
              <hr className="w-32 bg-[#E0E7FF]" />
              <div className="flex flex-col justify-start items-center relative">
                {!toggleResumeUpload ?
                  <span className="w-10 h-10 bg-[#F8FAFC] text-[#4F46E5] border-4 border-[#EEF2FF] rounded-full flex justify-center items-center">2</span>
                  :
                  <span className="w-10 h-10 rounded-full bg-[#4F46E5] flex items-center justify-center">
                    <img src={TickIcons} alt="TickIcons" className='w-3 h-3' />
                  </span>
                }
                <span className="absolute top-10 text-[#64748B] text-sm">Questionnaire</span>
              </div>
              <hr className="w-32 bg-[#E0E7FF]" />
              <div className="flex flex-col justify-start items-center relative">
                {!toggleQuestionnaire ?
                  <span className="w-10 h-10 bg-[#F8FAFC] text-[#4F46E5] border-4 border-[#EEF2FF] rounded-full flex justify-center items-center">3</span>
                  :
                  <span className="w-10 h-10 rounded-full bg-[#4F46E5] flex items-center justify-center">
                    <img src={TickIcons} alt="TickIcons" className='w-3 h-3' />
                  </span>
                }
                <span className="absolute top-10 text-[#64748B] text-sm">Review</span>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} >
              {!toggleResumeUpload &&
                <div className="p-5 bg-white rounded-xl mt-14 mb-10 w-full">
                  <h1 className="font-bold leading-none">Resume</h1>
                  <div className="flex flex-row justify-between items-center my-8">
                    <div className="border-2 border-[#E0E7FF] rounded-lg shadow-sm py-3 px-3 basis-3/5 flex justify-between items-center">
                      <div className="flex justify-start items-center">
                        <img src={PDFIcon} alt="PDFIcon" />
                        <h1 className="ml-2">Resume_2023_DibyalochanParida</h1>
                      </div>
                      <div className="flex justify-start items-center">
                        <div className="h-8 border-l border-[#E0E7FF]"></div>
                        <button className="ml-2">
                          <img src={DeleteIcon} alt="DeleteIcon" />
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-end items-center basis-2/5">
                      <input type="checkbox" className="m-0 p-0 leading-none" />
                      <label className="text-[#94A3B8] leading-none ml-2">Save resume to my profile</label>
                    </div>
                  </div>
                  <button className="bg-[#EEF2FF] text-[#312E81] rounded-lg py-2.5 px-10">Upload</button>
                </div>}

              {toggleResumeUpload && !toggleQuestionnaire &&
                <div className="p-5 bg-white rounded-xl mt-14 mb-10 w-full">
                  {jobDetail && jobDetail?.questionnaire?.map((questionSet: any, index: any) => (
                    <>
                      <input type='hidden' {...register(`questionnaire.${index}.question`)} value={questionSet?.id} />
                      <input type='hidden' {...register(`questionnaire.${index}.questionType`)} value={questionSet?.questionType} />

                      {questionSet?.questionType === 'Descriptive' &&
                        <div className="flex flex-col">
                          <label><span className="mr-2">{index + 1}/10</span><span className="font-bold">{questionSet?.question}</span></label>
                          <textarea
                            rows={4}
                            className="w-full mt-3 border border-[#E2E8F0] p-3 outline-none rounded-lg"
                            placeholder="Type your answer here"
                            defaultValue={watch(`questionnaire.${index}.descriptive`)}
                            autoComplete='off'
                            maxLength={questionSet?.characterLimit}
                            required={questionSet?.requiredCheck}
                            {...register(`questionnaire.${index}.descriptive`)}
                          >
                          </textarea>
                          <div className="flex justify-end items-center">
                            <div className="flex justify-center items-center text-sm">
                              <span className="text-[#475569]">Characters left</span>
                              <div className="border-l border-[#E2E8F0] h-4 mx-2"></div>
                              <span className="text-[#E2E8F0]">150/150</span>
                            </div>
                          </div>
                        </div>
                      }

                      {questionSet?.questionType === 'MultipleChoice' &&
                        <>
                          <hr className="w-full my-10" />
                          <div className="flex flex-col">
                            <p><span className="mr-2">{index + 1}/10</span><span className="font-bold">{questionSet?.question}</span></p>
                            <div className="mt-3 flex flex-col gap-2">
                              {questionSet?.multipleSelection?.map((option: any, key: any) => (
                                <>
                                  {questionSet?.requiredCheck &&
                                    <div>
                                      <input
                                        defaultValue={option.id}
                                        type="checkbox"
                                        required={checkboxRequired}
                                        maxLength={questionSet?.characterLimit}
                                        onClick={handleCheckBox}
                                        {...register(`questionnaire.${index}.multipleChoice`, {
                                        })}
                                      />
                                      <label className="ml-2"> {option.option}</label>
                                    </div>
                                  }
                                  {!questionSet?.requiredCheck &&
                                    <div>
                                      <input
                                        defaultValue={option.id}
                                        type="checkbox"
                                        maxLength={questionSet?.characterLimit}
                                        {...register(`questionnaire.${index}.multipleChoice`)}
                                      />
                                      <label className="ml-2"> {option.option}</label>
                                    </div>
                                  }
                                </>
                              ))}


                            </div>
                          </div>
                        </>
                      }

                      {questionSet?.questionType === 'SingleChoice' &&
                        <>
                          <hr className="w-full my-10" />
                          <div className="flex flex-col">
                            <p><span className="mr-2">{index + 1}/10</span><span className="font-bold mr-2">{questionSet?.question}</span></p>
                            <div className="mt-3 flex flex-col gap-2">
                              {questionSet?.singleSelection?.map((option: any, key: any) => (
                                <>
                                  {questionSet?.requiredCheck &&
                                    <div>
                                      <input
                                        value={option.id}
                                        type="radio"
                                        maxLength={questionSet?.characterLimit}
                                        required={key === 1 && true}
                                        {...register(`questionnaire.${index}.singleChoice`)}
                                      />
                                      <label className="ml-2">{option.option}</label>
                                    </div>
                                  }
                                  {!questionSet?.requiredCheck &&
                                    <div>
                                      <input
                                        value={option.id}
                                        type="radio"
                                        maxLength={questionSet?.characterLimit}
                                        {...register(`questionnaire.${index}.singleChoice`)}
                                      />
                                      <label className="ml-2">{option.option}</label>
                                    </div>
                                  }
                                </>
                              ))}
                            </div>
                          </div>
                        </>
                      }

                      {questionSet?.questionType === 'NumberChoice' &&
                        <>
                          <hr className="w-full my-10" />
                          <div className="flex flex-col">
                            <label><span className="mr-2">{index + 1}/10</span><span className="font-bold">{questionSet?.question}</span></label>
                            <input
                              defaultValue={watch(`questionnaire.${index}.numberChoice`)}
                              className="outline-none rounded-lg p-3 border border-[#E2E8F0] mt-3"
                              placeholder="Your answer here"
                              type='number'
                              maxLength={questionSet?.characterLimit}
                              required={questionSet?.requiredCheck}
                              {...register(`questionnaire.${index}.numberChoice`)}
                            />
                          </div>
                        </>
                      }
                    </>
                  ))}
                </div >
              }
              {toggleQuestionnaire &&
                <>
                  <div className="p-5 bg-white rounded-xl border border-[#E0E7FF] mt-14 mb-10 w-full">
                    <div className="mb-8 flex justify-between items-center">
                      <h1 className="font-bold leading-none">Resume</h1>
                      <button className="border-b border-[#475569] text-[#475569] leading-none">Edit</button>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                      <div className="border-2 border-[#E0E7FF] rounded-lg shadow-sm py-3 px-3 flex justify-start items-center w-full">
                        <img src={PDFIcon} alt="PDFIcon" />
                        <h1 className="ml-2">Resume_2023_DibyalochanParida</h1>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 bg-white rounded-xl mb-10 w-full  border border-[#E0E7FF] relative">
                    <button className="border-b border-[#475569] text-[#475569] leading-none absolute right-0 mr-5">Edit</button>
                    <div className="flex flex-col mb-10">
                      <label><span className="mr-2">1/10</span><span className="font-bold">Define your working process</span></label>
                      <h1 className="mt-3">Lorem ipsum dolor sit amet consectetur. Pellentesque ultrices viverra ac nulla nam in. Vel ac egestas diam praesent nec lacus dui. Vel viverra commodo quis cras volutpat magna sed etiam semper. Pellentesque lacus mi integer egestas mattis.</h1>
                    </div>
                    <div className="flex flex-col mb-10">
                      <label><span className="mr-2">2/10</span><span className="font-bold">What is your salary expectation?</span></label>
                      <h1 className="mt-3">12,00,000 LPA</h1>
                    </div>
                    <div className="flex flex-col mb-10">
                      <p><span className="mr-2">3/10</span><span className="font-bold mr-2">Do you have a passport?</span><span className="text-[#94A3B8] text-sm">(Optional)</span></p>
                      <h1 className="mt-3">Yes</h1>
                    </div>
                    <div className="flex flex-col">
                      <p><span className="mr-2">2/10</span><span className="font-bold">Select the locations you will be willing to relocate to</span></p>
                      <div className="mt-3 flex flex-col gap-2">
                        <h1>
                          Bangalore
                        </h1>
                        <h1>
                          Noida
                        </h1>
                        <h1>
                          Pune
                        </h1>
                      </div>
                    </div>
                  </div>
                </>
              }
              <div className="grid grid-cols-2 gap-5">
                <button type="button" className="w-full bg-[#EEF2FF] text-[#312E81] rounded-lg py-2.5" onClick={handleDiscard}>Discard</button>
                {!toggleQuestionnaire ?
                  <div className="w-full bg-[#4F46E5] text-white rounded-lg py-2.5 cursor-pointer text-center" onClick={handleNext}>Next</div>
                  :
                  <button type="submit" className="w-full bg-[#4F46E5] text-white rounded-lg py-2.5">Apply</button>
                }
              </div>
            </form>
          </div>
        }

        <div className="col-start-8 col-end-13">
          {toggleJobApply &&
            <div className=" p-5 bg-white rounded-xl flex-col justify-start items-start inline-flex w-full border border-[#E0E7FF] mb-5">
              <div className="self-stretch justify-start items-center gap-3 inline-flex">
                <img className="w-14 h-14 rounded-lg" src={companyLogo} alt="companyLogo" />
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                  <div className="self-stretch text-slate-900 text-lg font-bold  leading-7 tracking-tight">{jobDetail?.title}</div>
                  <div className="self-stretch justify-start items-start gap-1 inline-flex">
                    <div className="grow shrink basis-0 text-[#64748B] text-sm font-medium leading-snug tracking-tight">{jobDetail?.company?.title}</div>
                  </div>
                </div>
              </div>
              <hr className="my-6 bg-[#E0E7FF] w-full" />
              <div className="grid grid-cols-1 gap-4">
                <div className="justify-start items-center gap-2 flex">
                  <img src={experienceIcon} alt="experience" />
                  <span className="text-[#64748B] text-sm  font-medium leading-snug tracking-tight">
                    {jobDetail?.totalExpYearStart?.title[0]} -
                  </span>
                  <span className="text-[#64748B] text-sm  font-medium leading-snug tracking-tight">
                    {jobDetail?.totalExpYearEnd?.title[0]} Years
                  </span>
                </div>
                {!jobDetail?.hideSalaryDetails && <div className="justify-start items-center gap-2 flex">
                  <img src={moneyIcon} alt="moneyIcon" />
                  <span className="text-[#64748B] text-sm font-medium leading-snug tracking-tight">
                    {jobDetail?.payScaleLowerRange?.title} -
                  </span>
                  {jobDetail?.payScaleUpperRange &&
                    <span className="text-[#64748B] text-sm font-medium leading-snug tracking-tight"> {jobDetail?.payScaleUpperRange?.title}  {jobDetail?.numberSystem?.title} {jobDetail?.recurrence?.title}
                    </span>}
                </div>}
                <div className="justify-start items-center gap-2 flex">
                  <img src={locationIcon} alt="location" />
                  {jobDetail?.jobsLocation?.map((loc: any) =>
                    <span className="text-[#64748B] text-sm font-medium leading-snug tracking-tight">
                      {loc?.location?.title},
                    </span>)}
                </div>
                <div className="justify-start items-center gap-5 inline-flex">
                  {jobDetail?.workMode?.title && <div className=" px-3 py-2 bg-orange-50 rounded justify-center items-center gap-2.5 flex">
                    <div className="text-orange-600 text-sm font-normal leading-none tracking-tight">{jobDetail?.workMode?.title}</div>
                  </div>}
                  {jobDetail?.employmentType?.title && <div className=" px-3 py-2 bg-green-50 rounded justify-center items-center gap-2.5 flex">
                    <div className="text-green-600 text-sm font-normal leading-none tracking-tight">{jobDetail?.employmentType?.title}</div>
                  </div>}
                  <span className="text-slate-400 text-sm font-normal  leading-none tracking-tight">
                    {lastUpdatedTimestamp !== null && formatDistanceToNow(lastUpdatedTimestamp, { addSuffix: true })}
                  </span>
                </div>
              </div>
              <hr className="my-6 bg-[#E0E7FF] w-full" />
              <div className="self-stretch  flex-col justify-start items-start gap-3 flex ">
                <div className="self-stretch text-slate-900 text-sm font-bold  leading-snug tracking-tight">Skills</div>
                <div className=" justify-start items-start gap-3 flex-row flex flex-wrap">
                  {jobDetail?.jobsKeySkills?.map((keySkill) =>
                    <div className=" px-3 py-2 bg-slate-50 rounded-lg justify-center items-center gap-2.5 flex">
                      <span className="text-black text-sm font-normal  leading-snug tracking-tight">{keySkill?.keySkills?.title}</span>
                    </div>)}
                </div>
              </div>
            </div>
          }
          <div className="flex flex-row justify-between items-center mb-5">
            <span className="font-bold text-xl">Similar Jobs</span>
            <Link to="/allJobs" className="flex justify-center items-center">
              <div className="flex flex-row items-center">
                <span className="flex justify-center items-center text-lg font text-indigo-900 text-center mr-1">
                  All Jobs
                </span>
                <img src={rightArrow} alt="rightArrow" width="w-full" className="text-indigo-900" />
              </div>
            </Link>
          </div>
          <div className="mb-4"><ShortJobCard /></div>
          <div className=" mb-3"><ShortJobCard /></div>
          <div className=" mb-3"><ShortJobCard /></div>
        </div>
      </div >
      <ToastContainer />
    </Fragment>
  )
}

export default JobDescription;