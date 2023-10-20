import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { IFormInputsPostAJob, IFormInputsResponse, PostJobUpdate } from '../../../../interface/employer';
import JobLeftPanel from './JobLeftPanel';
import { useAppDispatch, useAppSelector } from '../../../..';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { formData, postJobUpdate, postResponseDraft } from '../../../../store/reducers/jobs/postJobs';
import GetJobDetails, { clearGetJobDetailSlice, getJobDetail } from '../../../../store/reducers/jobs/GetJobDetails';
import { PostJobSchema, ResponseSchema } from '../../../../schema/postJob';
import Toaster from '../../../commonComponents/Toaster';
import Cookies from 'js-cookie';
import wrap from 'word-wrap';

const Preview = () => {

  const dispatch = useAppDispatch();
  const { postId } = useParams();
  const navigate = useNavigate();
  const [postBack, setPostBack] = useState({ postURL: '', backURL: '', DiscardURL: '' })
  const { formData: jobDetailData } = useAppSelector((state) => state.updatePostJobUpdate);
  const { success: jobDetailSuccess, jobDetail } = useAppSelector((state) => state.getJobDetail);
  const [jobTitle, setJobTitle] = useState('');
  const [buttonClick, setButtonClick] = useState('');
  const [userType, setUserType] = useState(Cookies.get('userType'));
  const [userId, setUserId] = useState(Cookies.get('userId'));
  const [sectionURL, setSectionURL] = useState({ jobDetailsURL: "", requirementsURL: "", companyURL: "", recruiterURL: "", responseURL: "", previewURL: "" });

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
    if (Object.keys(jobDetail).length !== 0) {
      jobDetail?.hideSalaryDetails && setValue('hideSalaryDetails', jobDetail?.hideSalaryDetails);
      jobDetail?.videoProfile && setValue('videoProfile', jobDetail?.videoProfile);
      jobDetail?.includeWalkInDetails && setValue('includeWalkInDetails', jobDetail?.includeWalkInDetails);
      jobDetail?.notifyMeAbout && setValue('notifyMeAbout', jobDetail?.notifyMeAbout);
      jobDetail?.notificationEmailAddress1 && setValue('notificationEmailAddress1', jobDetail?.notificationEmailAddress1);
      jobDetail?.notificationEmailAddress2 && setValue('notificationEmailAddress2', jobDetail?.notificationEmailAddress2);
    } else {
      jobDetailData?.hideSalaryDetails && setValue('hideSalaryDetails', jobDetailData?.hideSalaryDetails);
      jobDetailData?.videoProfile && setValue('videoProfile', jobDetailData?.videoProfile);
      jobDetailData?.includeWalkInDetails && setValue('includeWalkInDetails', jobDetailData?.includeWalkInDetails);
      jobDetailData?.notifyMeAbout && setValue('notifyMeAbout', jobDetailData?.notifyMeAbout);
      jobDetailData?.notificationEmailAddress1 && setValue('notificationEmailAddress1', jobDetailData?.notificationEmailAddress1);
      jobDetailData?.notificationEmailAddress2 && setValue('notificationEmailAddress2', jobDetailData?.notificationEmailAddress2);
    }
  }, [setValue, jobDetailData]);

  const onSubmit = (data: IFormInputsPostAJob) => {

    if (buttonClick === 'Continue' && userType && userId) {
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
        userType: userType,
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
        user: userId,
        isDraft: false,
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
        hideSalaryDetails: jobDetailData?.hideSalaryDetails,
        videoProfile: jobDetailData?.videoProfile,
        includeWalkInDetails: jobDetailData?.includeWalkInDetails,
        notifyMeAbout: jobDetailData?.notifyMeAbout,
        notificationEmailAddress1: jobDetailData?.notificationEmailAddress1,
        notificationEmailAddress2: jobDetailData?.notificationEmailAddress2,
      })).then(() => {
        navigate("/recruiterJobList");
      });
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
        status: jobStatus,
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
        hideSalaryDetails: jobDetailData?.hideSalaryDetails,
        videoProfile: jobDetailData?.videoProfile,
        includeWalkInDetails: jobDetailData?.includeWalkInDetails,
        notifyMeAbout: jobDetailData?.notifyMeAbout,
        notificationEmailAddress1: jobDetailData?.notificationEmailAddress1,
        notificationEmailAddress2: jobDetailData?.notificationEmailAddress2,
      })).then(() => {
        toast.success(successMessage)
      });
    }
  }

  useEffect(() => {
    if (Number(postId)) {
      setPostBack({ postURL: `/postJob/preview/${postId}`, backURL: `/postJob/recruiter/${postId}`, DiscardURL: `/postJob/jobDetails` });
      setJobTitle(jobDetail?.title);
      setSectionURL({ jobDetailsURL: `/postJob/jobDetails/${postId}`, requirementsURL: `/postJob/requirements/${postId}`, companyURL: `/postJob/company/${postId}`, recruiterURL: `/postJob/recruiter/${postId}`, responseURL: `/postJob/response/${postId}`, previewURL: `/postJob/preview/${postId}` })
    } else {
      setJobTitle(jobDetailData?.title);
      setPostBack({ postURL: '/postJob/preview', backURL: '/postJob/recruiter', DiscardURL: `/postJob/jobDetails` })
    }
  }, []);

  useEffect(() => {
    if (postId) {
      dispatch(getJobDetail(postId));
    }
  }, [dispatch]);

  useEffect(() => {
    if (jobDetailSuccess)
      dispatch(clearGetJobDetailSlice());
  }, [dispatch, jobDetailSuccess]);

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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full h-auto flex-col justify-start  gap-10 inline-flex">
                <div className="h-auto flex-col justify-start  gap-7 flex">
                  <div className="self-stretch  p-7 bg-white rounded-xl border border-indigo-100 flex-col justify-start  gap-7 flex">
                    <div className="self-stretch justify-start items-center gap-3 inline-flex">
                      <div className="grow shrink basis-0 text-black text-2xl font-bold leading-[28.80px] tracking-tight">{jobDetailData?.title}</div>
                      <div className="border-b border-slate-600 justify-start items-center gap-2.5 flex">
                        {!Number.isNaN(Number(postId)) && <div className="text-right text-slate-600 text-sm font-medium leading-[16.80px] tracking-tight cursor-pointer" onClick={() => returnBack(sectionURL.jobDetailsURL)}>Edit</div>}

                      </div>
                    </div>
                    <div className="self-stretch h-[0px] border border-indigo-100"></div>
                    <div className="self-stretch h-[52px] flex-col justify-start  gap-7 flex">
                      <div className="self-stretch justify-start  gap-7 inline-flex">
                        <div className="grow shrink basis-0 flex-col justify-start  gap-2 inline-flex">
                          <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Department</div>
                          <div className="self-stretch text-black text-base font-normal leading-snug tracking-tight">{jobDetailData?.department?.label}</div>
                        </div>
                        <div className="grow shrink basis-0 flex-col justify-start  gap-2 inline-flex">
                          <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Role</div>
                          <div className="self-stretch text-black text-base font-normal leading-snug tracking-tight">{jobDetailData?.jobsRole?.label}</div>
                        </div>
                      </div>
                    </div>
                    <div className="self-stretch h-[52px] flex-col justify-start  gap-7 flex">
                      <div className="self-stretch justify-start  gap-7 inline-flex">
                        <div className="grow shrink basis-0 flex-col justify-start  gap-2 inline-flex">
                          <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Job Type</div>
                          <div className="self-stretch text-black text-base font-normal leading-snug tracking-tight">{jobDetailData?.jobsType?.label}</div>
                        </div>
                        <div className="grow shrink basis-0 flex-col justify-start  gap-2 inline-flex">
                          <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Roll Category</div>
                          <div className="self-stretch text-black text-base font-normal leading-snug tracking-tight">{jobDetailData?.roleCategory?.label}</div>
                        </div>
                      </div>
                    </div>
                    <div className="self-stretch h-[0px] border border-indigo-100"></div>
                    <div className="self-stretch justify-start items-center gap-5 inline-flex">
                      <div className="justify-start items-center gap-3 flex">
                        <div className="w-full px-3 py-2 bg-green-50 rounded justify-center items-center gap-2.5 flex">
                          <div className="text-green-600 text-sm font-normal leading-[16.80px] tracking-tight">{jobDetailData?.employmentType?.label}</div>
                        </div>
                        <div className="w-full px-3 py-2 bg-orange-50 rounded justify-center items-center gap-2.5 flex">
                          <div className="text-orange-600 text-sm font-normal leading-[16.80px] tracking-tight">{jobDetailData?.workMode?.label}</div>
                        </div>
                      </div>
                      <div className="justify-start items-center gap-1 flex">
                        <div className="w-6 h-6 rounded-[20px] justify-center items-center flex"></div>
                        <div className="text-slate-700 text-base font-normal leading-snug tracking-tight">
                          {jobDetailData?.jobsLocation?.map((item: any) => <div>{item?.label}, India</div>)}
                        </div>
                      </div>
                      <div className="justify-start items-center gap-1 flex">
                        <div className="w-6 h-6 rounded-[20px] justify-center items-center flex"></div>
                        <div className="text-slate-700 text-base font-normal leading-snug tracking-tight">{jobDetailData?.currency?.label}({jobDetailData?.payScaleLowerRange?.label}-{jobDetailData?.payScaleUpperRange?.label}) {jobDetailData?.numberSystem?.label} {jobDetailData?.recurrence?.label}</div>
                      </div>
                      <div className="justify-start items-center gap-1 flex">
                        <div className="w-6 h-6 flex-col justify-center items-center inline-flex"></div>
                        <div className="text-slate-700 text-base font-normal leading-snug tracking-tight">{jobDetailData?.jobsOpening} vacancies</div>
                      </div>
                    </div>
                    <div className="self-stretch h-[0px] border border-indigo-100"></div>
                    <div className="self-stretch h-auto flex-col justify-start  gap-2 flex">
                      <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Job Include candidates willing to relocate to Job locations(s) - <span className='text-black'>{jobDetailData?.candidateRelocate && 'Yes'}
                        {!jobDetailData?.candidateRelocate && 'No'}</span></div>
                    </div>
                    <div className="self-stretch h-[0px] border border-indigo-100"></div>
                    <div className="self-stretch h-auto flex-col justify-start  gap-2 flex">
                      <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Job Description</div>
                      <div className="self-stretch text-black text-base font-normal leading-snug tracking-tight">{wrap(jobDetailData?.jobDescription, { width: 110, cut: true })}</div>
                    </div>
                    <div className="self-stretch h-[0px] border border-indigo-100"></div>
                    <div className="self-stretch h-auto flex-col justify-start  gap-2 flex">
                      <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Key Responsibility</div>
                      <div className="self-stretch text-black text-base font-normal leading-snug tracking-tight">{wrap(jobDetailData?.keyResponsibility, { width: 110, cut: true })}</div>
                    </div>
                  </div>

                  <div className="self-stretch h-auto p-7 bg-white rounded-xl border border-indigo-100 flex-col justify-start  gap-7 flex">
                    <div className="self-stretch justify-start items-center gap-3 inline-flex">
                      <div className="grow shrink basis-0 text-black text-2xl font-bold leading-[28.80px] tracking-tight">Requirements</div>
                      <div className="border-b border-slate-600 justify-start items-center gap-2.5 flex">
                        {!Number.isNaN(Number(postId)) && <div className="text-right text-slate-600 text-sm font-medium leading-[16.80px] tracking-tight cursor-pointer" onClick={() => returnBack(sectionURL.recruiterURL)}>Edit</div>}
                      </div>
                    </div>
                    <div className="self-stretch h-[0px] border border-indigo-100"></div>
                    <div className="self-stretch h-auto flex-col justify-start  gap-2 flex">
                      <div className="grow shrink text-slate-500 text-base font-normal leading-snug tracking-tight">Skills</div>
                      <div className="self-stretch justify-start  gap-3 inline-flex">
                        {jobDetailData?.jobsKeySkills?.map((item: any) => <div className="w-full px-3 py-2 bg-slate-50 rounded-lg justify-center items-center gap-2.5 flex">
                          <div className="text-black text-base font-normal leading-snug tracking-tight">{item?.keySkills?.label}</div>
                        </div>)}
                      </div>
                    </div>
                    <div className="self-stretch h-[0px] border border-indigo-100"></div>
                    <div className="self-stretch h-[70px] flex-col justify-start  gap-2 flex">
                      <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Education</div>
                      <div className="self-stretch justify-start  gap-3 inline-flex">
                        {jobDetailData?.jobEducation?.map((item: any) =>
                          <div className="w-full px-3 py-2 bg-slate-50 rounded-lg justify-center items-center gap-2.5 flex">
                            <div className="text-black text-base font-normal leading-snug tracking-tight">{item?.label}</div>
                          </div>)}
                      </div>
                    </div>
                    <div className="self-stretch h-[0px] border border-indigo-100"></div>
                    <div className="self-stretch h-auto flex-col justify-start  gap-7 flex">
                      <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Candidate must have all the above specializations in undergraduate, postgraduate and doctorate
                      </div>
                      <div className="self-stretch justify-start  gap-7 inline-flex">
                        <div className="grow shrink basis-0 flex-col justify-start  gap-2 inline-flex">
                          <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight"> Premium BTech (All)</div>
                          <div className="self-stretch text-black text-base font-normal leading-snug tracking-tight">
                            {jobDetailData?.premiumBTech && 'Yes'}
                            {!jobDetailData?.premiumBTech && 'No'}</div>
                        </div>
                        <div className="grow shrink basis-0 flex-col justify-start  gap-2 inline-flex">
                          <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight"> Premium MBA (All)</div>
                          <div className="self-stretch text-black text-base font-normal leading-snug tracking-tight">
                            {jobDetailData?.premiumMBAAll && 'Yes'}
                            {!jobDetailData?.premiumMBAAll && 'No'}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="self-stretch h-[0px] border border-indigo-100"></div>
                    <div className="self-stretch h-auto flex-col justify-start  gap-7 flex">
                      <div className="self-stretch justify-start  gap-7 inline-flex">
                        <div className="grow shrink basis-0 flex-col justify-start  gap-2 inline-flex">
                          <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Diversity Hiring(Hire women candidates for this role)</div>
                          <div className="self-stretch text-black text-base font-normal leading-snug tracking-tight">
                            {jobDetailData?.diversityHiring && 'Yes'}
                            {!jobDetailData?.diversityHiring && 'No'}</div>
                        </div>
                        <div className="grow shrink basis-0 flex-col justify-start  gap-2 inline-flex">
                          <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Experience</div>
                          <div className="self-stretch text-black text-base font-normal leading-snug tracking-tight">{jobDetailData?.totalExpYearStart?.label} - {jobDetailData?.totalExpYearEnd?.label}</div>
                        </div>
                        <div className="grow shrink basis-0 flex-col justify-start  gap-2 inline-flex">
                          <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Company Type</div>
                          <div className="self-stretch text-black text-base font-normal leading-snug tracking-tight">{jobDetailData?.companyType?.label}</div>
                        </div>
                      </div>
                    </div>
                    <div className="self-stretch h-[0px] border border-indigo-100"></div>
                    <div className="self-stretch h-auto flex-col justify-start  gap-2 flex">
                      <div className="grow shrink text-slate-500 text-base font-normal leading-snug tracking-tight">Candidate Industry</div>
                      <div className="self-stretch justify-start  gap-3 inline-flex">
                        {jobDetailData?.jobCandidateIndustry?.map((item: any) => <div className="w-full px-3 py-2 bg-slate-50 rounded-lg justify-center items-center gap-2.5 flex">
                          <div className="text-black text-base font-normal leading-snug tracking-tight">{item?.candidateIndustry?.label}</div>
                        </div>)}
                      </div>
                    </div>
                    <div className="self-stretch h-[0px] border border-indigo-100"></div>
                    <div className="self-stretch h-auto flex-col justify-start  gap-2 flex">
                      <div className="grow shrink text-slate-500 text-base font-normal leading-snug tracking-tight">Locality</div>
                      <div className="self-stretch justify-start  gap-3 inline-flex">
                        {jobDetailData?.jobLocality?.map((item: any) => <div className="w-full px-3 py-2 bg-slate-50 rounded-lg justify-center items-center gap-2.5 flex">
                          <div className="text-black text-base font-normal leading-snug tracking-tight">{item?.label}</div>
                        </div>)}
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch h-auto p-7 bg-white rounded-xl border border-indigo-100 flex-col justify-start  gap-7 flex">
                    <div className="self-stretch justify-start items-center gap-3 inline-flex">
                      <img className="w-[60px] h-[60px] rounded-lg" src="https://via.placeholder.com/60x60" />
                      <div className="grow shrink basis-0 flex-col justify-start  gap-1 inline-flex">
                        <div className="self-stretch text-slate-900 text-2xl font-bold leading-[28.80px] tracking-tight">{jobDetailData?.company?.label}</div>
                        <div className="w-[168px] justify-start items-center gap-2 inline-flex">
                          <div className="justify-start items-center gap-1 flex">
                            <div className="w-6 h-6 justify-center items-center flex"></div>
                            <div className="text-black text-sm font-normal leading-[16.80px] tracking-tight">3.5</div>
                          </div>
                          <div className="grow shrink basis-0 self-stretch origin-top-left -rotate-90 border border-indigo-100"></div>
                          <div className="text-slate-500 text-sm font-normal leading-[16.80px] tracking-tight">5k+ Reviews</div>
                        </div>
                      </div>
                      <div className="border-b border-slate-600 justify-start items-center gap-2.5 inline-flex">
                        {!Number.isNaN(Number(postId)) && <div className="text-right text-slate-600 text-sm font-medium leading-[16.80px] tracking-tight cursor-pointer" onClick={() => returnBack(sectionURL.companyURL)}>Edit</div>}
                      </div>
                    </div>
                    <div className="self-stretch h-[0px] border border-indigo-100"></div>
                    <div className="justify-start  gap-5 inline-flex">
                      <div className="justify-start items-center gap-1 flex">
                        <div className="w-6 h-6 rounded-[20px] justify-center items-center flex"></div>
                        <div className="text-slate-500 text-base font-medium leading-snug tracking-tight">500+ employees</div>
                      </div>
                      <div className="justify-start items-center gap-1 flex">
                        <div className="w-6 h-6 rounded-[20px] justify-center items-center flex"></div>
                        <div className="text-indigo-600 text-base font-medium leading-snug tracking-tight">{jobDetailData?.companyWebsite}</div>
                      </div>
                      <div className="justify-start items-center gap-1 flex">
                        <div className="w-6 h-6 rounded-[20px] justify-center items-center flex"></div>
                        <div className="text-slate-600 text-base font-medium leading-snug tracking-tight">Hide company rating
                          - {jobDetailData?.hideCompanyRating && 'Yes'}
                          {!jobDetailData?.hideCompanyRating && 'No'}</div>
                      </div>
                    </div>
                    <div className="self-stretch h-[0px] border border-indigo-100"></div>
                    <div className="self-stretch h-auto flex-col justify-start  gap-2 flex">
                      <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Company Details</div>
                      <div className="self-stretch text-black text-base font-normal leading-snug tracking-tight">{wrap(jobDetailData?.aboutCompany, { width: 110, cut: true })}</div>
                    </div>
                    <div className="self-stretch h-[0px] border border-indigo-100"></div>
                    <div className="self-stretch h-auto flex-col justify-start  gap-2 flex">
                      <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Company Address</div>
                      <div className="self-stretch text-black text-base font-normal leading-snug tracking-tight">{wrap(jobDetailData?.companyAddress, { width: 110, cut: true })}</div>
                    </div>
                  </div>
                  <div className="self-stretch h-auto p-7 bg-white rounded-xl border border-indigo-100 flex-col justify-start  gap-7 flex">
                    <div className="self-stretch justify-start items-center gap-3 inline-flex">
                      <img className="w-[60px] h-[60px] rounded-[56px]" src="https://via.placeholder.com/60x60" />
                      <div className="grow shrink basis-0 flex-col justify-start  gap-1 inline-flex">
                        <div className="self-stretch text-slate-900 text-2xl font-bold leading-[28.80px] tracking-tight">Swapnil Bansal</div>
                        <div className="self-stretch justify-start items-center gap-5 inline-flex">
                          <div className="text-black text-base font-normal leading-snug tracking-tight">HR Recruiter</div>
                          <div className="justify-start items-center gap-1 flex">
                            <div className="w-6 h-6 justify-center items-center flex"></div>
                            <div className="text-slate-500 text-base font-medium leading-snug tracking-tight">swapnil.bansal@ratnaglobaltech.com</div>
                          </div>
                        </div>
                      </div>
                      <div className="border-b border-slate-600 justify-start items-center gap-2.5 inline-flex">
                        {!Number.isNaN(Number(postId)) && <div className="text-right text-slate-600 text-sm font-medium leading-[16.80px] tracking-tight cursor-pointer" onClick={() => returnBack(sectionURL.responseURL)}>Edit</div>}
                      </div>
                    </div>
                    <div className="self-stretch h-[0px] border border-indigo-100"></div>
                    <div className="h-auto flex-col justify-start  gap-2 flex">
                      <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Responders</div>
                      <div className="self-stretch h-auto flex-col justify-start  gap-5 flex">
                        <div className="self-stretch justify-start  gap-5 inline-flex">
                          <div className="grow shrink basis-0 h-10 justify-start items-center gap-5 flex">
                            <div className="grow shrink basis-0 h-10 justify-start items-center gap-2 flex">
                              <div className="w-10 h-10 bg-green-600 rounded-[60px] justify-center items-center flex">
                                <div className="text-white text-xl font-medium leading-normal tracking-tight">VP</div>
                              </div>
                              <div className="grow shrink basis-0 flex-col justify-center  inline-flex">
                                <div className="text-black text-base font-normal leading-snug tracking-tight">Vara Prasad</div>
                                <div className="text-slate-500 text-sm font-normal leading-[16.80px] tracking-tight">{jobDetailData?.notificationEmailAddress1}</div>
                              </div>
                            </div>
                          </div>
                          <div className="grow shrink basis-0 h-10 justify-start items-center gap-5 flex">
                            <div className="grow shrink basis-0 h-10 justify-start items-center gap-2 flex">
                              <div className="w-10 h-10 bg-slate-900 rounded-[60px] justify-center items-center flex">
                                <div className="text-white text-xl font-medium leading-normal tracking-tight">VP</div>
                              </div>
                              <div className="grow shrink basis-0 flex-col justify-center  inline-flex">
                                <div className="text-black text-base font-normal leading-snug tracking-tight">Vara Prasad</div>
                                <div className="text-slate-500 text-sm font-normal leading-[16.80px] tracking-tight">{jobDetailData?.notificationEmailAddress2}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="self-stretch h-[0px] border border-indigo-100"></div>
                    <div className="justify-start  gap-5 inline-flex">
                      <div className="w-full self-stretch h-auto flex-col justify-start  gap-2 flex">
                        <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Hide salary details from candidates</div>
                        <div className="self-stretch text-black text-base font-normal leading-snug tracking-tight">
                          {jobDetailData?.hideSalaryDetails && 'Yes'}
                          {!jobDetailData?.hideSalaryDetails && 'No'}
                        </div>
                      </div>
                      <div className="w-full self-stretch h-auto flex-col justify-start  gap-2 flex">
                        <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Request candidate for video profile</div>
                        <div className="self-stretch text-black text-base font-normal leading-snug tracking-tight">
                          {jobDetailData?.videoProfile && 'Yes'}
                          {!jobDetailData?.videoProfile && 'No'}
                        </div>
                      </div>
                    </div>
                    <div className="w-full justify-start  gap-5 inline-flex">

                      <div className="w-full self-stretch h-auto flex-col justify-start  gap-2 flex">
                        <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Include walk-in details</div>
                        <div className="self-stretch text-black text-base font-normal leading-snug tracking-tight">
                          {jobDetailData?.includeWalkInDetails && 'Yes'}
                          {!jobDetailData?.includeWalkInDetails && 'No'}
                        </div>
                      </div>
                      <div className="w-full self-stretch h-auto flex-col justify-start  gap-2 flex">
                        <div className="self-stretch text-slate-500 text-base font-normal leading-snug tracking-tight">Notify me about</div>
                        <div className="self-stretch text-black text-base font-normal leading-snug tracking-tight">
                          {jobDetailData?.notifyMeAbout && 'Yes'}
                          {!jobDetailData?.notifyMeAbout && 'No'}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                <div className="w-full justify-start  gap-5 inline-flex">
                  <div className=" px-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex">
                    <div className="text-indigo-900 font-medium leading-normal tracking-tight cursor-pointer" onClick={() => returnBack(postBack.DiscardURL)}>Discard</div>
                  </div>
                  {!isNaN(Number(postId)) && <div className="grow shrink basis-0 h-14 pl-3 pr-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex cursor-pointer">
                    <input className="text-indigo-900 font-medium leading-normal tracking-tight cursor-pointer" type="submit" name='SaveAsDraft' value={'Save'} onClick={() => setButtonClick('Save')} />
                  </div>}
                  {isNaN(Number(postId)) && <div className="grow shrink basis-0 h-14 pl-3 pr-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex cursor-pointer">
                    <input className="text-indigo-900 font-medium leading-normal tracking-tight cursor-pointer" type="submit" name='SaveAsDraft' value={'Save as Draft'} onClick={() => setButtonClick('Draft')} />
                  </div>}
                  <div className="grow shrink basis-0 h-14 px-6 py-3 bg-indigo-600 rounded-lg shadow justify-center items-center gap-3 flex">
                    <button className="text-white font-medium leading-normal tracking-tight cursor-pointer" type="submit" onClick={() => setButtonClick('Continue')}>Post a Job</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  )
}

export default Preview