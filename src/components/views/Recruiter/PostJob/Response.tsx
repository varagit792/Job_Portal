import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { IFormInputsPostAJob, IFormInputsResponse, PostJobUpdate } from '../../../../interface/employer';
import user from '../../../../assets/png/user.png';
import envelop from '../../../../assets/svg/envelop.svg';
import close from '../../../../assets/svg/close.svg';
import user_icon from '../../../../assets/svg/user_icon.svg';
import JobLeftPanel from './JobLeftPanel';
import { useAppDispatch, useAppSelector } from '../../../..';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { formData, postJobUpdate } from '../../../../store/reducers/jobs/postJobs';
import { PostJobSchema, ResponseSchema } from '../../../../schema/postJob';

const Response = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { formData: jobDetailData } = useAppSelector((state) => state.updatePostJobUpdate);
  const { success: jobDetailSuccess, jobDetail } = useAppSelector((state) => state.getJobDetail);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useForm<IFormInputsPostAJob>({
    resolver: yupResolver(PostJobSchema),
  });

  const selectedJobsKeySkills: any = [];
  const selectedJobsLocation: any = [];
  const selectedJobLocality: any = [];
  const selectedCandidateIndustry: any = [];

  jobDetailData?.jobsKeySkills?.filter((item: any) => item && selectedJobsKeySkills.push({ value: item?.keySkills?.id, label: item?.keySkills?.title }));
  jobDetailData?.jobsLocation?.filter((item: any) => item && selectedJobsLocation.push({ value: item?.location?.value, label: item?.location?.title }));
  jobDetailData?.jobLocality?.filter((item: any) => item && selectedJobLocality.push({ value: item?.locality?.id, label: item?.locality?.title }));
  const selectedJobEducation: any = [];
  jobDetailData?.jobEducation?.filter((item: any) => item && selectedJobEducation.push({ value: item?.education?.id, label: item?.education?.title }));
  jobDetailData?.jobCandidateIndustry?.filter((item: any) => item && selectedCandidateIndustry.push({ value: item?.candidateIndustry?.id, label: item?.candidateIndustry?.title }));

  useEffect(() => {
    if (jobDetailData) {
      jobDetailData?.title && setValue('title', jobDetailData?.title);
      jobDetailData?.jobsType && setValue('jobsType', jobDetailData?.jobsType);
      jobDetailData?.jobsKeySkills && setValue('keySkills', selectedJobsKeySkills);
      jobDetailData?.department && setValue('department', jobDetailData?.department);
      jobDetailData?.roleCategory && setValue('roleCategory', jobDetailData?.roleCategory);
      jobDetailData?.videoProfile && setValue('videoProfile', jobDetailData?.videoProfile);
      jobDetailData?.includeWalkInDetails && setValue('includeWalkInDetails', jobDetailData?.includeWalkInDetails);
      jobDetailData?.notifyMeAbout && setValue('notifyMeAbout', jobDetailData?.notifyMeAbout);
      jobDetailData?.notificationEmailAddress1 && setValue('notificationEmailAddress1', jobDetailData?.notificationEmailAddress1);
      jobDetailData?.notificationEmailAddress2 && setValue('notificationEmailAddress2', jobDetailData?.notificationEmailAddress2);
      jobDetailData?.jobsRole && setValue('jobsRole', jobDetailData?.jobsRole);
      jobDetailData?.workMode && setValue('workMode', jobDetailData?.workMode);
      jobDetailData?.jobsLocation && setValue('jobLocation', selectedJobsLocation);
      jobDetailData?.candidateRelocate && setValue('candidateRelocate', jobDetailData?.candidateRelocate);
      jobDetailData?.hideSalaryDetails && setValue('hideSalaryDetails', jobDetailData?.hideSalaryDetails);
      jobDetailData?.jobLocality && setValue('jobLocality', selectedJobLocality);
      jobDetailData?.totalExpYearStart && setValue('fromWorkExperience', jobDetailData?.totalExpYearStart);
      jobDetailData?.totalExpYearEnd && setValue('toWorkExperience', jobDetailData?.totalExpYearEnd);
      jobDetailData?.employmentType && setValue('employmentType', jobDetailData?.employmentType);
      jobDetailData?.currency && setValue('currency', jobDetailData?.currency);
      jobDetailData?.payScaleLowerRange && setValue('fromSalaryRange', jobDetailData?.payScaleLowerRange);
      jobDetailData?.payScaleUpperRange && setValue('toSalaryRange', jobDetailData?.payScaleUpperRange);
      jobDetailData?.numberSystem && setValue('numberSystem', jobDetailData?.numberSystem);
      jobDetailData?.recurrence && setValue('recurrence', jobDetailData?.recurrence);
      jobDetailData?.companyType && setValue('companyType', jobDetailData?.companyType);
      jobDetailData?.jobEducation && setValue('highestQualification', selectedJobEducation);
      jobDetailData?.premiumBTech && setValue('premiumBTech', jobDetailData?.premiumBTech);
      jobDetailData?.premiumMBAAll && setValue('premiumMBAAll', jobDetailData?.premiumMBAAll);
      jobDetailData?.jobCandidateIndustry && setValue('candidateIndustry', selectedCandidateIndustry);
      jobDetailData?.diversityHiring && setValue('diversityHiring', jobDetailData?.diversityHiring);
      jobDetailData?.jobDescription && setValue('jobDescription', jobDetailData?.jobDescription);
      jobDetailData?.jobsOpening && setValue('jobsOpening', jobDetailData?.jobsOpening);
      jobDetailData?.videoProfile && setValue('videoProfile', jobDetailData?.videoProfile);
      jobDetailData?.includeWalkInDetails && setValue('includeWalkInDetails', jobDetailData?.includeWalkInDetails);
      jobDetailData?.notifyMeAbout && setValue('notifyMeAbout', jobDetailData?.notifyMeAbout);
      jobDetailData?.notificationEmailAddress1 && setValue('notificationEmailAddress1', jobDetailData?.notificationEmailAddress1);
      jobDetailData?.notificationEmailAddress2 && setValue('notificationEmailAddress2', jobDetailData?.notificationEmailAddress2);
      jobDetailData?.company && setValue('company', jobDetailData?.company);
      jobDetailData?.companyWebsite && setValue('companyWebsite', jobDetailData?.companyWebsite);
      jobDetailData?.aboutCompany && setValue('aboutCompany', jobDetailData?.aboutCompany);
      jobDetailData?.keyResponsibility && setValue('keyResponsibility', jobDetailData?.keyResponsibility);
      jobDetailData?.companyAddress && setValue('companyAddress', jobDetailData?.companyAddress);
      jobDetailData?.hideCompanyRating && setValue('hideCompanyRating', jobDetailData?.hideCompanyRating);
    }
  }, [setValue, jobDetailData]);

  const onSubmit = (data: IFormInputsPostAJob) => {
    const keySkills = jobDetailData?.jobsKeySkills?.map((skills: any) => ({ preferred: true, keySkills: { id: skills?.keySkills?.value } }));
    const jobLocation = jobDetailData?.jobsLocation?.map((location: any) => ({ location: { id: location?.value } }));
    const jobEducation = jobDetailData?.jobEducation?.map((education: any) => ({ education: education?.value }));
    const jobLocality = jobDetailData?.jobLocality?.map((local: any) => ({ locality: { id: local?.value } }));
    const jobCandidateIndustry = jobDetailData?.jobCandidateIndustry?.map((industry: any) => ({ candidateIndustry: { id: industry?.candidateIndustry?.value } }));
    const updatePostId = jobDetailData.id ? Number(jobDetailData.id) : null;

    dispatch(postJobUpdate({
      id: updatePostId,
      title: jobDetailData?.title,
      payScaleLowerRange: jobDetailData?.payScaleLowerRange?.value,
      jobsOpening: Number(jobDetailData?.jobsOpening),
      userType: "employer",
      payScaleUpperRange: jobDetailData?.payScaleUpperRange?.value,
      jobDescription: jobDetailData?.jobDescription,
      company: jobDetailData?.company?.value,
      totalExpYearStart: jobDetailData?.totalExpYearStart?.value,
      totalExpYearEnd: jobDetailData?.totalExpYearEnd?.value,
      numberSystem: jobDetailData?.numberSystem?.value,
      recurrence: jobDetailData?.recurrence?.value,
      jobsLocation: jobLocation,
      jobsRole: jobDetailData?.jobsRole?.value,
      department: jobDetailData?.department?.value,
      jobsType: jobDetailData?.jobsType?.value,
      roleCategory: jobDetailData?.roleCategory?.value,
      jobEducation: jobEducation,
      user: "1",
      jobsKeySkills: keySkills,
      employmentType: jobDetailData?.employmentType?.value,
      status: true,
      workMode: jobDetailData?.workMode?.value,
      candidateRelocate: data?.candidateRelocate,
      jobLocality: jobLocality,
      currency: jobDetailData?.currency?.value,
      companyType: jobDetailData?.companyType?.value,
      premiumBTech: jobDetailData?.premiumBTech,
      keyResponsibility: jobDetailData?.keyResponsibility,
      hideCompanyRating: jobDetailData?.hideCompanyRating,
      premiumMBAAll: jobDetailData?.premiumMBAAll,
      jobCandidateIndustry: jobCandidateIndustry,
      diversityHiring: jobDetailData?.diversityHiring,
      companyWebsite: jobDetailData?.companyWebsite,
      aboutCompany: jobDetailData?.aboutCompany,
      companyAddress: jobDetailData?.companyAddress,
      hideSalaryDetails: data?.hideSalaryDetails,
      videoProfile: data?.videoProfile,
      includeWalkInDetails: data?.includeWalkInDetails,
      notifyMeAbout: data?.notifyMeAbout,
      notificationEmailAddress1: data?.notificationEmailAddress1,
      notificationEmailAddress2: data?.notificationEmailAddress2,
    }));
  }

  const returnBack = (returnURL: string) => {
    navigate(returnURL);
  }

  return (
    <>
      <div className="h-[10%] w-full"></div>
      <div className="bg-[#F8FAFC] font-sans px-32 py-10">
        <div className="grid grid-cols-9 gap-4">
          <div className="col-start-1 col-end-4">
            <JobLeftPanel />
          </div>
          <div className="col-start-4 col-end-11">
            <div id="jobDetails" className="scroll-mt-24 scroll-smooth">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full h-auto flex-col justify-start items-start gap-10 inline-flex">
                  <div className="self-stretch  flex-col justify-start items-start gap-10 flex">
                    <div className="justify-start items-end gap-2 inline-flex">
                      <div className="text-black text-xl font-medium  leading-normal tracking-tight">Response</div>
                    </div>
                    <div className="self-stretch flex-col justify-start items-start gap-7 flex">
                      <div className="self-stretch h-[129px] flex-col justify-start items-start gap-2 flex">
                        <div className="self-stretch h-[73px] flex-col justify-start items-start gap-2 flex">
                          <div className="text-slate-700 text-sm font-normal  leading-[16.80px] tracking-tight">Who can manage the responses?</div>
                          <div className="self-stretch h-12 p-3 bg-white rounded-lg border border-slate-200 justify-start items-center gap-2 inline-flex">
                            <div className="grow shrink basis-0 self-stretch pr-6 justify-start items-center gap-2 flex">
                              <div className="grow shrink basis-0 h-6 justify-start items-center gap-2 flex">
                                <img className="w-6 h-6 rounded-[40px]" src={user} />
                                <div className="grow shrink basis-0 text-black text-base font-normal  leading-snug tracking-tight">Swapnil Bansal</div>
                              </div>
                              <div className="w-[0px] self-stretch justify-start items-center gap-3 flex">
                                <div className="w-7 h-[0px] origin-top-left rotate-90 border border-slate-200"></div>
                              </div>
                              <div className="grow shrink basis-0 h-6 justify-start items-center gap-2 flex">
                                <div className="w-6 h-6 justify-center items-center flex"><img src={envelop} alt='envalop' /></div>
                                <div className="grow shrink basis-0 text-black text-base font-normal  leading-snug tracking-tight">swapnil.bansal@ratnaglobaltech.com</div>
                              </div>
                            </div>
                            <div className="w-6 h-6 bg-slate-100 rounded justify-center items-center flex">
                              <img src={close} alt='close' />
                            </div>
                          </div>
                        </div>
                        <div className="self-stretch h-12 flex-col justify-start items-start gap-2 flex">
                          <div className="self-stretch h-12 p-3 bg-white rounded-lg border border-slate-200 justify-start items-center gap-2 inline-flex">
                            <div className="grow shrink basis-0 self-stretch pr-12 justify-start items-center gap-2 flex">
                              <div className="grow shrink basis-0 h-6 justify-start items-center gap-2 flex">
                                <div className="w-6 h-6 flex-col justify-center items-center inline-flex">
                                  <img src={user_icon} alt='user_icon' />
                                </div>
                                <div className="grow shrink basis-0 text-slate-400 text-base font-normal  leading-snug tracking-tight">Employee name</div>
                              </div>
                              <div className="grow shrink basis-0 h-6 justify-start items-center gap-2 flex">
                                <div className="w-6 h-6 justify-center items-center flex"><img src={envelop} alt='envalop' /></div>
                                <div className="grow shrink basis-0 text-slate-400 text-base font-normal  leading-snug tracking-tight">example@gmail.com</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full flex-col justify-start  gap-2 flex">
                        <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">On which email ids do you want to receive notifications of matching applies?</div>
                        <div className="grid grid-cols-4 gap-4 mt-1">
                          <div className="col-span-2">
                            <div className="text-slate-700 text-sm">
                              <input defaultValue={''}
                                className='w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5'
                                placeholder={"Please enter email address"}
                                {...register("notificationEmailAddress1")} />
                            </div>
                            {errors?.notificationEmailAddress1 && <p className="font-normal text-xs text-red-500 absolute">{errors?.notificationEmailAddress1?.message}</p>}
                          </div>
                          <div className="col-span-2">
                            <div className="text-slate-700 text-sm">
                              <input defaultValue={''}
                                className='w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5'
                                placeholder={"Please enter email address"}
                                {...register("notificationEmailAddress2")} />
                            </div>
                            {errors?.notificationEmailAddress2 && <p className="font-normal text-xs text-red-500 absolute">{errors?.notificationEmailAddress2?.message}</p>}
                          </div>
                        </div>
                      </div>
                      <div className="w-full flex-col justify-start items-start gap-2 flex">
                        <div className="self-stretch justify-start items-start gap-5 inline-flex">
                          <div className="grow shrink basis-0 h-12 p-3 bg-white rounded-lg border border-slate-200 justify-start items-center gap-3 flex">
                            <div className="w-6 h-6 justify-center items-center flex">
                              <input
                                type='checkbox'
                                checked={watch("hideSalaryDetails")}
                                {...register("hideSalaryDetails")}
                                className='mx-3 w-4 h-4'
                              />
                              {errors?.hideSalaryDetails && <p className="font-normal text-xs text-red-500 absolute">{errors?.hideSalaryDetails?.message}</p>}</div>
                            <div className="flex-col justify-start items-start gap-1 inline-flex">
                              <div className="text-black text-base font-normal  leading-snug tracking-tight"> Hide salary details from candidates</div>
                            </div>
                          </div>
                          <div className="grow shrink basis-0 h-12 p-3 bg-white rounded-lg border border-slate-200 justify-start items-center gap-3 flex">
                            <div className="w-6 h-6 justify-center items-center flex">
                              <input
                                type='checkbox'
                                checked={watch("videoProfile")}
                                {...register("videoProfile")}
                                className='mx-3 w-4 h-4'
                              />
                              {errors?.videoProfile && <p className="font-normal text-xs text-red-500 absolute">{errors?.videoProfile?.message}</p>}
                            </div>
                            <div className="flex-col justify-start items-start gap-1 inline-flex">
                              <div className="text-black text-base font-normal  leading-snug tracking-tight">Request candidate for video profile</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full flex-col justify-start items-start gap-2 flex">
                        <div className="self-stretch justify-start items-start gap-5 inline-flex">
                          <div className="grow shrink basis-0 h-12 p-3 bg-white rounded-lg border border-slate-200 justify-start items-center gap-3 flex">
                            <div className="w-6 h-6 justify-center items-center flex">
                              <input
                                type='checkbox'
                                checked={watch("includeWalkInDetails")}
                                {...register("includeWalkInDetails")}
                                className='mx-3 w-4 h-4'
                              />
                              {errors?.includeWalkInDetails && <p className="font-normal text-xs text-red-500 absolute">{errors?.includeWalkInDetails?.message}</p>}</div>
                            <div className="flex-col justify-start items-start gap-1 inline-flex">
                              <div className="text-black text-base font-normal  leading-snug tracking-tight">  Include walk-in details</div>
                            </div>
                          </div>
                          <div className="grow shrink basis-0 h-12 p-3 bg-white rounded-lg border border-slate-200 justify-start items-center gap-3 flex">
                            <div className="w-6 h-6 justify-center items-center flex">
                              <input
                                type='checkbox'
                                checked={watch("notifyMeAbout")}
                                {...register("notifyMeAbout")}
                                className='mx-3 w-4 h-4'
                              />
                              {errors?.notifyMeAbout && <p className="font-normal text-xs text-red-500 absolute">{errors?.notifyMeAbout?.message}</p>}
                            </div>
                            <div className="flex-col justify-start items-start gap-1 inline-flex">
                              <div className="text-black text-base font-normal  leading-snug tracking-tight"> Notify me about</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch justify-start items-start gap-5 inline-flex">
                    <div className="grow shrink basis-0 h-14 pl-3 pr-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex cursor-pointer" onClick={() => returnBack('/postJob/recruiter')}>
                      <div className="w-6 h-6 justify-center items-center flex"></div>
                      <div className="text-indigo-900 text-xl font-medium  leading-normal tracking-tight">Back</div>
                    </div>
                    <div className="grow shrink basis-0 h-14 px-6 py-3 bg-indigo-600 rounded-lg shadow justify-center items-center gap-3 flex">
                      <button className="text-white text-xl font-medium leading-normal tracking-tight cursor-pointer" type="submit" >Finish</button>
                    </div>
                  </div>
                </div>
              </form>
            </div >
          </div >
        </div >
      </div >
    </>
  )
}

export default Response