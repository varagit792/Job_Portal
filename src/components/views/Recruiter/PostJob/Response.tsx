import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import JobLeftPanel from './JobLeftPanel'
import { IFormInputsResponse, IFormInputsResponseDraft } from '../../../../interface/employer';
import { clearGetJobDetailSlice, getJobDetail } from '../../../../store/reducers/jobs/GetJobDetails';
import user from '../../../../assets/png/user.png';
import envelop from '../../../../assets/svg/envelop.svg';
import close from '../../../../assets/svg/close.svg';
import user_icon from '../../../../assets/svg/user_icon.svg';
import { getCompanyList } from '../../../utils/utils';
import { useAppDispatch, useAppSelector } from '../../../..';
import { useNavigate, useParams } from 'react-router-dom';
import { ResponseDraftSchema, ResponseSchema } from '../../../../schema/postJob';
import { yupResolver } from '@hookform/resolvers/yup';
import { formData, postResponseDraft } from '../../../../store/reducers/jobs/postJobs';
import Toaster from '../../../commonComponents/Toaster';
import Cookies from 'js-cookie';

const Response = () => {
  const dispatch = useAppDispatch();
  const { postId } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState<any>([]);
  const { formData: jobDetailData } = useAppSelector((state) => state.updatePostJobUpdate);
  const { success: jobDetailSuccess, jobDetail } = useAppSelector((state) => state.getJobDetail);
  const [postBack, setPostBack] = useState({ postURL: '', backURL: '' });
  const [jobTitle, setJobTitle] = useState('');
  const [buttonClick, setButtonClick] = useState('');
  const [userType, setUserType] = useState(Cookies.get('userType'));
  const [userId, setUserId] = useState(Cookies.get('userId'));

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useForm<IFormInputsResponse | IFormInputsResponseDraft>({
    resolver: yupResolver(ResponseSchema || ResponseDraftSchema),
  });

  useEffect(() => {

    if (Object.keys(jobDetail).length !== 0) {
      jobDetail?.notificationEmailAddress1 && setValue('notificationEmailAddress1', jobDetail?.notificationEmailAddress1);
      jobDetail?.notificationEmailAddress2 && setValue('notificationEmailAddress2', jobDetail?.notificationEmailAddress2);
      jobDetail?.hideSalaryDetails && setValue('hideSalaryDetails', jobDetail?.hideSalaryDetails);
      jobDetail?.videoProfile && setValue('videoProfile', jobDetail?.videoProfile);
      jobDetail?.includeWalkInDetails && setValue('includeWalkInDetails', jobDetail?.includeWalkInDetails);
      jobDetail?.notifyMeAbout && setValue('notifyMeAbout', jobDetail?.notifyMeAbout);
    } else {
      jobDetailData?.notificationEmailAddress1 && setValue('notificationEmailAddress1', jobDetailData?.notificationEmailAddress1);
      jobDetailData?.notificationEmailAddress2 && setValue('notificationEmailAddress2', jobDetailData?.notificationEmailAddress2);
      jobDetailData?.hideSalaryDetails && setValue('hideSalaryDetails', jobDetailData?.hideSalaryDetails);
      jobDetailData?.videoProfile && setValue('videoProfile', jobDetailData?.videoProfile);
      jobDetailData?.includeWalkInDetails && setValue('includeWalkInDetails', jobDetailData?.includeWalkInDetails);
      jobDetailData?.notifyMeAbout && setValue('notifyMeAbout', jobDetailData?.notifyMeAbout);
    }
  }, [setValue, jobDetail, jobDetailData]);

  const onSubmit = (data: IFormInputsResponse | IFormInputsResponseDraft) => {
    if (buttonClick === 'Continue') {
      dispatch(formData({
        hideSalaryDetails: data?.hideSalaryDetails,
        videoProfile: data?.videoProfile,
        includeWalkInDetails: data?.includeWalkInDetails,
        notifyMeAbout: data?.notifyMeAbout,
        notificationEmailAddress1: data?.notificationEmailAddress1,
        notificationEmailAddress2: data?.notificationEmailAddress2,

      }));
      navigate(postBack?.postURL);
    }

    if ((buttonClick === 'Draft' || buttonClick === 'Save') && userType && userId) {

      let draft = true;
      let jobStatus = false;
      let successMessage = "Job drafted successfully !!";
      if (buttonClick === 'Save') {
        draft = false;
        jobStatus = true;
        successMessage = "Job saved successfully !!";
      }
      const keySkills = jobDetailData?.jobsKeySkills?.map((skills: any) => ({ preferred: true, keySkills: { id: skills?.keySkills?.value } }));
      const jobLocation = jobDetailData?.jobsLocation?.map((location: any) => ({ location: { id: location?.value } }));
      const jobEducation = jobDetailData?.jobEducation?.map((education: any) => ({ education: education?.value }));
      const jobLocality = jobDetailData?.jobLocality?.map((local: any) => ({ locality: { id: local?.value } }));
      const jobCandidateIndustry = jobDetailData?.jobCandidateIndustry?.map((industry: any) => ({ candidateIndustry: { id: industry?.candidateIndustry?.value } }));
      const updatePostId = postId ? Number(postId) : null;
      dispatch(postResponseDraft({
        totalExpYearStart: jobDetailData?.totalExpYearStart?.value,
        totalExpYearEnd: jobDetailData?.totalExpYearEnd?.value,
        jobsKeySkills: keySkills,
        jobStatus: jobDetailData?.jobStatus?.value,
        jobExpiry: jobDetailData?.jobExpiry?.value,
        isDraft: draft,
        jobLocality: jobLocality,
        jobEducation: jobEducation,
        companyType: jobDetailData?.companyType?.value,
        premiumBTech: jobDetailData?.premiumBTech,
        premiumMBAAll: jobDetailData?.premiumMBAAll,
        jobCandidateIndustry: jobCandidateIndustry,
        diversityHiring: jobDetailData?.diversityHiring,
        id: updatePostId,
        title: jobDetailData?.title,
        payScaleLowerRange: jobDetailData?.payScaleLowerRange?.value,
        jobsOpening: Number(jobDetailData?.jobsOpening),
        userType: userType,
        payScaleUpperRange: jobDetailData?.payScaleUpperRange?.value,
        jobDescription: jobDetailData?.jobDescription,
        numberSystem: jobDetailData?.numberSystem?.value,
        recurrence: jobDetailData?.recurrence?.value,
        jobsLocation: jobLocation,
        jobsType: jobDetailData?.jobsType?.value,
        jobsRole: jobDetailData?.jobsRole?.value,
        department: jobDetailData?.department?.value,
        roleCategory: jobDetailData?.roleCategory?.value,
        user: userId,
        employmentType: jobDetailData?.employmentType?.value,
        workMode: jobDetailData?.workMode?.value,
        candidateRelocate: jobDetailData?.candidateRelocate,
        currency: jobDetailData?.currency?.value,
        keyResponsibility: jobDetailData?.keyResponsibility,
        company: jobDetailData.company?.value,
        hideCompanyRating: jobDetailData?.hideCompanyRating,
        companyWebsite: jobDetailData?.companyWebsite,
        aboutCompany: jobDetailData?.aboutCompany,
        companyAddress: jobDetailData?.companyAddress,

        hideSalaryDetails: data?.hideSalaryDetails,
        videoProfile: data?.videoProfile,
        includeWalkInDetails: data?.includeWalkInDetails,
        notifyMeAbout: data?.notifyMeAbout,
        notificationEmailAddress1: data?.notificationEmailAddress1,
        notificationEmailAddress2: data?.notificationEmailAddress2,
      })).then(() => {
        toast.success(successMessage)
      });
    }
  }

  useEffect(() => {
    if (Number(postId)) {
      dispatch(getJobDetail(postId));
    }
  }, [dispatch]);

  useEffect(() => {
    if (jobDetailSuccess)
      dispatch(clearGetJobDetailSlice());
  }, [dispatch, jobDetailSuccess]);

  useEffect(() => {
    (async () => {
      const companyList = await getCompanyList()
      if (Object.keys(companyList)?.length) {
        setCompany(companyList as any)
      }
    })();
    if (Number(postId)) {
      setPostBack({ postURL: `/postJob/preview/${postId}`, backURL: `/postJob/recruiter/${postId}` });
      setJobTitle(jobDetail?.title);
    } else {
      setPostBack({ postURL: '/postJob/preview', backURL: '/postJob/recruiter' })
    }
  }, []);

  useEffect(() => {
    setUserType(Cookies.get('userType'));
    setUserId(Cookies.get('userId'));
  }, [Cookies])

  const returnBack = (returnURL: string) => {
    navigate(returnURL);
  }

  return (
    <>
      <div className="h-[10%] w-full"></div>
      <div className="bg-[#F8FAFC] font-sans px-32 py-10">
        <div className="grid grid-cols-9 gap-4">
          <div className="col-start-1 col-end-4">
            <JobLeftPanel jobTitle={jobTitle} />
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
                                <div className="grow shrink basis-0 text-black text-sm font-normal  leading-snug tracking-tight">Swapnil Bansal</div>
                              </div>
                              <div className="w-[0px] self-stretch justify-start items-center gap-3 flex">
                                <div className="w-7 h-[0px] origin-top-left rotate-90 border border-slate-200"></div>
                              </div>
                              <div className="grow shrink basis-0 h-6 justify-start items-center gap-2 flex">
                                <div className="w-6 h-6 justify-center items-center flex"><img src={envelop} alt='envalop' /></div>
                                <div className="grow shrink basis-0 text-black text-sm font-normal  leading-snug tracking-tight">swapnil.bansal@ratnaglobaltech.com</div>
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
                                <div className="grow shrink basis-0 text-slate-400 text-sm font-normal  leading-snug tracking-tight">Employee name</div>
                              </div>
                              <div className="grow shrink basis-0 h-6 justify-start items-center gap-2 flex">
                                <div className="w-6 h-6 justify-center items-center flex"><img src={envelop} alt='envalop' /></div>
                                <div className="grow shrink basis-0 text-slate-400 text-sm font-normal  leading-snug tracking-tight">example@gmail.com</div>
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
                              <input
                                className='w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5'
                                placeholder={"Please enter email address"}
                                {...register("notificationEmailAddress1")} />
                            </div>
                            {errors?.notificationEmailAddress1 && <p className="font-normal text-xs text-red-500 absolute">{errors?.notificationEmailAddress1?.message}</p>}
                          </div>
                          <div className="col-span-2">
                            <div className="text-slate-700 text-sm">
                              <input
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
                              <div className="text-black text-sm font-normal  leading-snug tracking-tight"> Hide salary details from candidates</div>
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
                              <div className="text-black text-sm font-normal  leading-snug tracking-tight">Request candidate for video profile</div>
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
                              <div className="text-black text-sm font-normal  leading-snug tracking-tight">  Include walk-in details</div>
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
                              <div className="text-black text-sm font-normal  leading-snug tracking-tight"> Notify me about</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch justify-start items-start gap-5 inline-flex">
                    {/* <div className="grow shrink basis-0 h-14 pl-3 pr-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex cursor-pointer" onClick={() => returnBack(postBack?.backURL)}>
                      <div className="w-6 h-6 justify-center items-center flex"></div>
                      <div className="text-indigo-900 font-medium  leading-normal tracking-tight">Back</div>
                    </div>
                    {!isNaN(Number(postId)) && <div className="grow shrink basis-0 h-14 pl-3 pr-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex cursor-pointer">
                      <input className="text-indigo-900 font-medium leading-normal tracking-tight cursor-pointer" type="submit" name='SaveAsDraft' value={'Save'} onClick={() => setButtonClick('Save')} />
                    </div>}
                    {isNaN(Number(postId)) && <div className="grow shrink basis-0 h-14 pl-3 pr-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex cursor-pointer">
                      <input className="text-indigo-900 font-medium leading-normal tracking-tight cursor-pointer" type="submit" name='SaveAsDraft' value={'Save as Draft'} onClick={() => setButtonClick('Draft')} />
                    </div>}
                    <div className="grow shrink basis-0 h-14 px-6 py-3 bg-indigo-600 rounded-lg shadow justify-center items-center gap-3 flex">
                      <button className="text-white font-medium leading-normal tracking-tight cursor-pointer" type="submit" onClick={() => setButtonClick('Continue')} >Continue</button>
                    </div> */}

                    <button name='Back' className="text-indigo-900 font-medium leading-normal tracking-tight grow shrink basis-0 h-14 px-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex cursor-pointer" onClick={() => returnBack(postBack.backURL)}>Back</button>

                  {!isNaN(Number(postId)) &&
                    <button name='Save' className="text-indigo-900 font-medium leading-normal tracking-tight cursor-pointer grow shrink basis-0 h-14 pl-3 pr-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex" onClick={() => setButtonClick('Save')}>Save</button>
                  }

                  {isNaN(Number(postId)) &&
                    <button name='SaveAsDraft' className="text-indigo-900 font-medium leading-normal tracking-tight cursor-pointer grow shrink basis-0 h-14 pl-3 pr-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex " onClick={() => setButtonClick('Draft')}>Save as Draft</button>
                  }

                  <button name='Continue' className="text-white font-medium leading-normal tracking-tight cursor-pointer grow shrink basis-0 h-14 px-6 py-3 bg-indigo-600 rounded-lg shadow justify-center items-center gap-3 flex"
                    onClick={() => setButtonClick('Continue')}>Continue</button>
                    
                  </div>
                </div>
              </form>
            </div >
          </div >
        </div >
      </div >
      <Toaster />
    </>
  )
}

export default Response