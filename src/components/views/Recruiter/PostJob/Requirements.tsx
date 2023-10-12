import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import JobLeftPanel from './JobLeftPanel'
import { IFormInputsRequirement } from '../../../../interface/employer';
import AutocompleteBox from '../../../commonComponents/AutocompleteBox';
import { getHighestQualificationList, getIndustryList, getKeySkillsList, getLocalityList, getTotalYearsExpList } from '../../../utils/utils';
import { useAppDispatch, useAppSelector } from '../../../..';
import { useNavigate, useParams } from 'react-router-dom';
import { formData } from '../../../../store/reducers/jobs/postJobs';
import { RequirementSchema } from '../../../../schema/postJob';
import { yupResolver } from '@hookform/resolvers/yup';

const Requirements = () => {
  const { postId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [keySkills, setKeySkills] = useState<any>([]);
  const [locality, setLocality] = useState<any>([]);
  const [totalExpYear, setTotalExpYear] = useState<any>([]);
  const [industry, setIndustry] = useState<any>([]);
  const [highestQualification, setHighestQualification] = useState<any>([]);

  const { formData: jobDetailData } = useAppSelector((state) => state.updatePostJobUpdate);
  const { success: jobDetailSuccess, jobDetail } = useAppSelector((state) => state.getJobDetail);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useForm<IFormInputsRequirement>({
    resolver: yupResolver(RequirementSchema),
  });

  const selectedJobsKeySkills: any = [];
  const selectedJobLocality: any = [];
  const selectedCandidateIndustry: any = [];
  const selectedJobEducation: any = []

  if (Object.keys(jobDetail).length !== 0 && jobDetail.constructor !== Object) {
    jobDetail?.jobsKeySkills?.filter((item: any) => item && selectedJobsKeySkills.push({ value: item?.keySkills?.id, label: item?.keySkills?.title }));
    jobDetail?.jobEducation?.filter((item: any) => item && selectedJobEducation.push(item?.jobEducation));
    jobDetail?.jobLocality?.filter((item: any) => item && selectedJobLocality.push({ value: item?.locality?.id, label: item?.locality?.title }));
    jobDetail?.jobCandidateIndustry?.filter((item: any) => item && selectedCandidateIndustry.push({ value: item?.candidateIndustry?.id, label: item?.candidateIndustry?.title }));
  } else {
    jobDetailData?.jobsKeySkills?.filter((item: any) => item && selectedJobsKeySkills.push(item?.keySkills));
    jobDetailData?.jobEducation?.filter((item: any) => item && selectedJobEducation.push(item));
    jobDetailData?.jobLocality && jobDetailData?.jobLocality?.filter((item: any) => item && selectedJobLocality.push(item));
    jobDetailData?.jobCandidateIndustry?.filter((item: any) => item && selectedCandidateIndustry.push({ label: item?.candidateIndustry?.label, value: item?.candidateIndustry?.value }));
  }

  useEffect(() => {
    if (Object.keys(jobDetail).length !== 0 && jobDetail.constructor !== Object) {
      jobDetail?.jobsKeySkills && setValue('keySkills', selectedJobsKeySkills);
      jobDetail?.jobEducation && setValue('education', selectedJobEducation);
      jobDetail?.jobLocality && setValue('jobLocality', selectedJobLocality);
      jobDetail?.totalExpYearStart && setValue('fromWorkExperience', { label: jobDetail?.totalExpYearStart?.title, value: jobDetail?.totalExpYearStart?.id?.toString() });
      jobDetail?.totalExpYearEnd && setValue('toWorkExperience', { label: jobDetail?.totalExpYearEnd?.title, value: jobDetail?.totalExpYearEnd?.id?.toString() });

      jobDetail?.companyType && setValue('companyType', { label: jobDetail?.companyType?.title, value: jobDetail?.companyType?.id?.toString() });
      jobDetail?.premiumBTech && setValue('premiumBTech', jobDetail?.premiumBTech);
      jobDetail?.premiumMBAAll && setValue('premiumMBAAll', jobDetail?.premiumMBAAll);
      jobDetail?.jobCandidateIndustry && setValue('candidateIndustry', selectedCandidateIndustry);
      jobDetail?.diversityHiring && setValue('diversityHiring', jobDetail?.diversityHiring);
    } else {
      jobDetailData?.jobsKeySkills && setValue('keySkills', selectedJobsKeySkills);

      jobDetailData?.jobEducation && setValue('education', selectedJobEducation);
      jobDetailData?.jobLocality && setValue('jobLocality', selectedJobLocality);
      jobDetailData?.totalExpYearStart && setValue('fromWorkExperience', jobDetailData?.totalExpYearStart);
      jobDetailData?.totalExpYearEnd && setValue('toWorkExperience', jobDetailData?.totalExpYearEnd);

      jobDetailData?.companyType && setValue('companyType', jobDetailData?.companyType);
      jobDetailData?.premiumBTech && setValue('premiumBTech', jobDetailData?.premiumBTech);
      jobDetailData?.premiumMBAAll && setValue('premiumMBAAll', jobDetailData?.premiumMBAAll);
      jobDetailData?.jobCandidateIndustry && setValue('candidateIndustry', selectedCandidateIndustry);
      jobDetailData?.diversityHiring && setValue('diversityHiring', jobDetailData?.diversityHiring);
    }
  }, [setValue, jobDetail, jobDetailData]);
  const onSubmit = (data: IFormInputsRequirement) => {

    const keySkills = data?.keySkills?.map((skills: any) => ({ preferred: true, keySkills: skills }));
    const jobEducation = data?.education?.map((education: any) => education);
    const jobLocality = data?.jobLocality?.map((local: any) => local);
    const jobCandidateIndustry = data?.candidateIndustry?.map((industry: any) => ({ candidateIndustry: industry }));
    const updatePostId = postId ? Number(postId) : null;
    dispatch(formData({
      totalExpYearStart: data?.fromWorkExperience,
      totalExpYearEnd: data?.toWorkExperience,
      jobsKeySkills: keySkills,
      status: true,
      jobLocality: jobLocality,
      jobEducation: jobEducation,
      companyType: data?.companyType,
      premiumBTech: data?.premiumBTech,
      premiumMBAAll: data?.premiumMBAAll,
      jobCandidateIndustry: jobCandidateIndustry,
      diversityHiring: data?.diversityHiring,

    }));

    navigate('/postJob/company');
  }

  useEffect(() => {
    (async () => {

      const keySkillsList = await getKeySkillsList()
      if (Object.keys(keySkillsList)?.length) {
        setKeySkills(keySkillsList as any)
      }


      const localityList = await getLocalityList()
      if (Object.keys(localityList)?.length) {
        setLocality(localityList as any)
      }

      const totalExpYearList = await getTotalYearsExpList()
      if (Object.keys(totalExpYearList)?.length) {
        setTotalExpYear(totalExpYearList as any)
      }

      const industryList = await getIndustryList()
      if (Object.keys(industryList)?.length) {
        setIndustry(industryList as any)
      }

      const highestQualificationList = await getHighestQualificationList()
      if (Object.keys(highestQualificationList)?.length) {
        setHighestQualification(highestQualificationList as any)
      }

    })();
  }, []);



  const returnBack = (returnURL: string) => {
    navigate(returnURL);
  }
  console.log("jobDetailData", jobDetailData);
  console.log("jobDetail", jobDetail);
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
                <div className="w-full h-auto flex-col justify-start  gap-10 inline-flex">
                  <div className="text-black text-xl font-medium leading-normal tracking-tight">Requirements</div>
                  <div className="flex-col justify-start  gap-7 flex">
                    <div className="h-auto flex-col justify-start  gap-2 flex">
                      <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Skills</div>
                      <div className='w-full'>
                        <AutocompleteBox
                          control={control}
                          isClearable={true}
                          isMulti={true}
                          fieldName={"keySkills"}
                          dropdownData={keySkills?.map(({ id, title }: any) => ({ value: id, label: title } as any))}
                          placeholder={"Select key Skills"}
                          defaultValue={watch("keySkills")}
                        />
                        {errors?.keySkills && <p className="font-normal text-xs text-red-500 absolute">{errors?.keySkills?.message}</p>}
                      </div>

                    </div>
                    <div className="w-full flex-col justify-start  gap-2 flex">
                      <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Education</div>
                      <div className='w-full'>
                        <AutocompleteBox
                          control={control}
                          isClearable={true}
                          isMulti={true}
                          fieldName={"education"}
                          dropdownData={highestQualification?.map(({ id, title }: any) => ({ value: id, label: title } as any))}
                          placeholder={"Select highest Qualification"}
                          defaultValue={watch("education")}
                        />
                        {errors?.education && <p className="font-normal text-xs text-red-500 absolute">{errors?.education?.message}</p>}
                      </div>
                    </div>
                    <div className="w-full flex-col justify-start  gap-2 flex">
                      <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Candidate must have all the above specializations in undergraduate, postgraduate and doctorate</div>
                      <div className="grid grid-cols-8 gap-4 mt-1">
                        <div className="col-span-2">
                          <div className="text-slate-700 text-sm">
                            <input
                              type='checkbox'
                              checked={watch("premiumBTech")}
                              {...register("premiumBTech")}
                              className='mx-3 w-4 h-4'
                            /> Premium BTech (All)
                            {errors?.premiumBTech && <p className="font-normal text-xs text-red-500 absolute">{errors?.premiumBTech?.message}</p>}
                          </div>
                        </div>
                        <div className="col-span-2">
                          <div className="text-slate-700 text-sm">
                            <input
                              type='checkbox'
                              checked={watch("premiumMBAAll")}
                              {...register("premiumMBAAll")}
                              className='mx-3 w-4 h-4'
                            />  Premium MBA (All)
                            {errors?.premiumMBAAll && <p className="font-normal text-xs text-red-500 absolute">{errors?.premiumMBAAll?.message}</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full justify-start  gap-5 inline-flex">
                      <div className="w-full flex-col justify-start  gap-2 inline-flex">
                        <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Start Work Experience </div>
                        <AutocompleteBox
                          control={control}
                          isClearable={true}
                          fieldName={"fromWorkExperience"}
                          dropdownData={totalExpYear?.map(({ id, title }: any) => ({ value: id, label: title }))}
                          default={watch("fromWorkExperience")}
                          placeholder={"Select work experience"}
                        />
                        {errors?.fromWorkExperience && <div className="font-normal text-xs text-red-500 ">{errors?.fromWorkExperience?.message}</div>}
                      </div>
                      <div className="w-full flex-col justify-start  gap-2 inline-flex">
                        <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">End Work Experience </div>
                        <AutocompleteBox
                          control={control}
                          isClearable={true}
                          fieldName={"toWorkExperience"}
                          dropdownData={totalExpYear?.map(({ id, title }: any) => ({ value: id, label: title }))}
                          default={watch("toWorkExperience")}
                          placeholder={"Select work experience"}
                        />
                        {errors?.toWorkExperience && <div className="font-normal text-xs text-red-500 ">{errors?.toWorkExperience?.message}</div>}
                      </div>
                    </div>

                    <div className="w-full justify-start  gap-5 inline-flex">
                      <div className="w-full flex-col justify-start  gap-2 inline-flex">
                        <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Candidate Industry</div>
                        <div className='w-full'>
                          <AutocompleteBox
                            control={control}
                            isClearable={true}
                            isMulti={true}
                            fieldName={"candidateIndustry"}
                            dropdownData={industry?.map(({ id, title }: any) => ({ value: id, label: title } as any))}
                            placeholder={"Select candidate industry"}
                            defaultValue={watch("candidateIndustry")}
                          />
                          {errors?.candidateIndustry && <p className="font-normal text-xs text-red-500 absolute">{errors?.candidateIndustry?.message}</p>}
                        </div>
                      </div>
                      <div className="w-full text-slate-700 text-sm font-normal flex-col justify-start  gap-2 inline-flex">
                        <div className=" leading-[16.80px] tracking-tight">Diversity Hiring </div>

                        <input
                          type='checkbox'
                          checked={watch("diversityHiring")}
                          {...register("diversityHiring")}
                          className='mx-3 w-4 h-4'
                        /> Hire women candidates for this role
                        {errors?.diversityHiring && <p className="font-normal text-xs text-red-500 absolute">{errors?.diversityHiring?.message}</p>}
                      </div>
                    </div>

                    <div className="w-full justify-start  gap-5 inline-flex">
                      <div className="w-full flex-col justify-start  gap-2 inline-flex">
                        <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Locality </div>
                        <div className='w-full'>
                          <AutocompleteBox
                            control={control}
                            isClearable={true}
                            isMulti={true}
                            fieldName={"jobLocality"}
                            dropdownData={locality?.map(({ id, title }: any) => ({ value: id, label: title } as any))}
                            placeholder={"Select localities"}
                            defaultValue={watch("jobLocality")}
                          />
                          {errors?.jobLocality && <p className="font-normal text-xs text-red-500 absolute">{errors?.jobLocality?.message}</p>}
                        </div>
                      </div>
                      <div className="w-full flex-col justify-start  gap-2 inline-flex">
                        <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Company Type </div>
                        <div className='w-full'>
                          <AutocompleteBox
                            control={control}
                            isClearable={true}
                            fieldName={"companyType"}
                            dropdownData={industry?.map(({ id, title }: any) => ({ value: id, label: title } as any))}
                            placeholder={"Select company type"}
                            defaultValue={watch("companyType")}
                          />
                          {errors?.companyType && <p className="font-normal text-xs text-red-500 absolute">{errors?.companyType?.label?.message}</p>}
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="self-stretch justify-start  gap-5 inline-flex">
                    <div className="grow shrink basis-0 h-14 px-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex cursor-pointer" onClick={() => returnBack('/postJob/jobDetails')}>
                      <div className="text-indigo-900 text-xl font-medium leading-normal tracking-tight">Back</div>
                    </div>
                    <div className="grow shrink basis-0 h-14 px-6 py-3 bg-indigo-600 rounded-lg shadow justify-center items-center gap-3 flex">
                      <input className="text-white text-xl font-medium leading-normal tracking-tight cursor-pointer" type="submit" value={'Continue'} />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default Requirements