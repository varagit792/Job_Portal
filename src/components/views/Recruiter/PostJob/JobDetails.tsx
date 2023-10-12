import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { IFormInputsJobDetail, IFormInputsPostAJob } from '../../../../interface/employer';
import AutocompleteBox from '../../../commonComponents/AutocompleteBox';
import { formData } from '../../../../store/reducers/jobs/postJobs';
import { getCurrencyList, getDepartmentList, getEmployeeTypeList, getJobRoleList, getJobTypeList, getLocationList, getNumberSystemList, getRecurrenceList, getRoleCategoryList, getSalaryRangeList, getWorkModeList } from '../../../utils/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { PostJobDetailSchema } from '../../../../schema/postJob';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../..';
import JobLeftPanel from './JobLeftPanel';

const JobDetails = () => {
  const { postId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [employeeType, setEmployeeType] = useState<any>([]);
  const [employeeTypeChecked, setEmployeeTypeChecked] = useState([{ id: '', checked: false }]);
  const [department, setDepartment] = useState<any>([]);
  const [roleCategory, setRoleCategory] = useState<any>([]);
  const [jobRole, setJobRole] = useState<any>([]);
  const [workMode, setWorkMode] = useState<any>([]);
  const [location, setLocation] = useState<any>([]);
  const [currency, setCurrency] = useState<any>([]);
  const [salaryRange, setSalaryRange] = useState<any>([]);
  const [numberSystem, setNumberSystem] = useState<any>([]);
  const [recurrence, setRecurrence] = useState<any>([]);
  const [jobType, setJobType] = useState<any>([]);

  const { formData: jobDetailData } = useAppSelector((state) => state.updatePostJobUpdate);
  const { success: jobDetailSuccess, jobDetail } = useAppSelector((state) => state.getJobDetail);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useForm<IFormInputsJobDetail>({
    resolver: yupResolver(PostJobDetailSchema),
  });
  const selectedJobsKeySkills: any = [];
  const selectedJobsLocation: any = [];
  const selectedJobLocality: any = [];
  const selectedCandidateIndustry: any = [];

  if (Object.keys(jobDetail).length !== 0 && jobDetail.constructor !== Object) {
    jobDetail?.jobsKeySkills?.filter((item: any) => item && selectedJobsKeySkills.push({ value: item?.keySkills?.id, label: item?.keySkills?.title }));
    jobDetail?.jobsLocation && jobDetail?.jobsLocation?.filter((item: any) => item && selectedJobsLocation.push({ value: item?.id, label: item?.title }));
    jobDetail?.jobLocality?.filter((item: any) => item && selectedJobLocality.push({ value: item?.locality?.id, label: item?.locality?.title }));
    jobDetail?.jobCandidateIndustry?.filter((item: any) => item && selectedCandidateIndustry.push({ value: item?.candidateIndustry?.id, label: item?.candidateIndustry?.title }));

  } else {
    jobDetailData?.jobsKeySkills?.filter((item: any) => item && selectedJobsKeySkills.push({ value: item?.keySkills?.id, label: item?.keySkills?.title }));
    jobDetailData?.jobsLocation && jobDetailData?.jobsLocation?.filter((item: any) => item && selectedJobsLocation.push({ label: item.label, value: item.value }));
    jobDetailData?.jobLocality?.filter((item: any) => item && selectedJobLocality.push({ value: item?.locality?.id, label: item?.locality?.title }));
    jobDetailData?.jobCandidateIndustry?.filter((item: any) => item && selectedCandidateIndustry.push({ value: item?.candidateIndustry?.id, label: item?.candidateIndustry?.title }));


  }

  useEffect(() => {
    if (Object.keys(jobDetail).length !== 0 && jobDetail.constructor !== Object) {
      jobDetail?.title && setValue('title', jobDetail?.title);
      jobDetail?.department && setValue('department', { label: jobDetail?.department?.title, value: jobDetail?.department?.id?.toString() });
      jobDetail?.roleCategory && setValue('roleCategory', { label: jobDetail?.roleCategory?.title, value: jobDetail?.roleCategory?.id?.toString() });
      jobDetail?.jobsRole && setValue('jobsRole', { label: jobDetail?.jobsRole?.title, value: jobDetail?.jobsRole?.id?.toString() });
      jobDetail?.jobsType && setValue('jobsType', { label: jobDetail?.jobsType?.title, value: jobDetail?.jobsType?.id?.toString() });
      jobDetail?.employmentType && setValue('employmentType', { label: jobDetail?.employmentType?.title, value: jobDetail?.employmentType?.id?.toString() });
      jobDetail?.workMode && setValue('workMode', { label: jobDetail?.workMode?.title, value: jobDetail?.workMode?.id?.toString() });
      jobDetail?.jobsLocation && setValue('jobLocation', selectedJobsLocation);
      jobDetail?.candidateRelocate && setValue('candidateRelocate', jobDetail?.candidateRelocate);

      jobDetail?.currency && setValue('currency', { label: jobDetail?.currency?.title, value: jobDetail?.currency?.id?.toString() });
      jobDetail?.payScaleLowerRange && setValue('fromSalaryRange', { label: jobDetail?.payScaleLowerRange?.title, value: jobDetail?.payScaleLowerRange?.id });
      jobDetail?.payScaleUpperRange && setValue('toSalaryRange', { label: jobDetail?.payScaleUpperRange?.title, value: jobDetail?.payScaleUpperRange?.id?.toString() });
      jobDetail?.numberSystem && setValue('numberSystem', { label: jobDetail?.numberSystem?.title, value: jobDetail?.numberSystem?.id?.toString() });
      jobDetail?.recurrence && setValue('recurrence', { label: jobDetail?.recurrence?.title, value: jobDetail?.recurrence?.id?.toString() });
      jobDetail?.jobDescription && setValue('jobDescription', jobDetail?.jobDescription);
      jobDetail?.jobsOpening && setValue('jobsOpening', jobDetail?.jobsOpening);
      jobDetail?.keyResponsibility && setValue('keyResponsibility', jobDetail?.keyResponsibility);
    } else {
      jobDetailData?.title && setValue('title', jobDetailData?.title);
      jobDetailData?.department && setValue('department', jobDetailData?.department);
      jobDetailData?.roleCategory && setValue('roleCategory', jobDetailData?.roleCategory);
      jobDetailData?.jobsRole && setValue('jobsRole', jobDetailData?.jobsRole);
      jobDetailData?.jobsType && setValue('jobsType', jobDetailData?.jobsType);
      jobDetailData?.employmentType && setValue('employmentType', jobDetailData?.employmentType);
      jobDetailData?.workMode && setValue('workMode', jobDetailData?.workMode);
      jobDetailData?.jobsLocation && setValue('jobLocation', selectedJobsLocation);
      jobDetailData?.candidateRelocate && setValue('candidateRelocate', jobDetailData?.candidateRelocate);

      jobDetailData?.currency && setValue('currency', jobDetailData?.currency);
      jobDetailData?.payScaleLowerRange && setValue('fromSalaryRange', jobDetailData?.payScaleLowerRange);
      jobDetailData?.payScaleUpperRange && setValue('toSalaryRange', jobDetailData?.payScaleUpperRange);
      jobDetailData?.numberSystem && setValue('numberSystem', jobDetailData?.numberSystem);
      jobDetailData?.recurrence && setValue('recurrence', jobDetailData?.recurrence);
      jobDetailData?.jobDescription && setValue('jobDescription', jobDetailData?.jobDescription);
      jobDetailData?.jobsOpening && setValue('jobsOpening', jobDetailData?.jobsOpening);
      jobDetailData?.keyResponsibility && setValue('keyResponsibility', jobDetailData?.keyResponsibility);
    }
  }, [setValue, jobDetail, jobDetailData]);


  const onSubmit = (data: IFormInputsJobDetail) => {
    console.log("data", data);

    const jobLocation = data?.jobLocation?.map((location: any) => location);
    const updatePostId = postId ? Number(postId) : null;

    dispatch(formData({
      id: updatePostId,
      title: data?.title,
      payScaleLowerRange: data?.fromSalaryRange,
      jobsOpening: Number(data?.jobsOpening),
      userType: "employer",
      payScaleUpperRange: data?.toSalaryRange,
      jobDescription: data?.jobDescription,
      numberSystem: data?.numberSystem,
      recurrence: data?.recurrence,
      jobsLocation: jobLocation,
      jobsType: data?.jobsType,
      jobsRole: data?.jobsRole,
      department: data?.department,
      roleCategory: data?.roleCategory,
      user: "1",
      status: true,
      employmentType: data?.employmentType,
      workMode: data?.workMode,
      candidateRelocate: data?.candidateRelocate,
      currency: data?.currency,
      keyResponsibility: data?.keyResponsibility,

    }));

    navigate('/postJob/requirements');
  }

  useEffect(() => {
    (async () => {
      const employeeTypeList = await getEmployeeTypeList()
      if (Object.keys(employeeTypeList)?.length) {
        setEmployeeType(employeeTypeList as any)
      }

      const departmentList = await getDepartmentList()
      if (Object.keys(departmentList)?.length) {
        setDepartment(departmentList as any)
      }

      const roleCategoryList = await getRoleCategoryList()
      if (Object.keys(roleCategoryList)?.length) {
        setRoleCategory(roleCategoryList as any)
      }

      const jobRoleList = await getJobRoleList()
      if (Object.keys(jobRoleList)?.length) {
        setJobRole(jobRoleList as any)
      }

      const workModeList = await getWorkModeList()
      if (Object.keys(workModeList)?.length) {
        setWorkMode(workModeList as any)
      }

      const locationList = await getLocationList()
      if (Object.keys(locationList)?.length) {
        setLocation(locationList as any)
      }

      const currencyList = await getCurrencyList()
      if (Object.keys(currencyList)?.length) {
        setCurrency(currencyList as any)
      }

      const salaryRangeList = await getSalaryRangeList()
      if (Object.keys(salaryRangeList)?.length) {
        setSalaryRange(salaryRangeList as any)
      }

      const numberSystemList = await getNumberSystemList()
      if (Object.keys(numberSystemList)?.length) {
        setNumberSystem(numberSystemList as any)
      }

      const recurrenceList = await getRecurrenceList()
      if (Object.keys(recurrenceList)?.length) {
        setRecurrence(recurrenceList as any)
      }

      const jobTypeList = await getJobTypeList()
      if (Object.keys(jobTypeList)?.length) {
        setJobType(jobTypeList as any)
      }


    })();
  }, [])


  console.log("watch===", watch());
  console.log("formData===", jobDetailData);

  const watchKeyResponsibility = watch('keyResponsibility')?.length;
  const watchJobDescription = watch('jobDescription')?.length;

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
              <div className="w-full h-auto flex-col justify-start items-start gap-10 inline-flex">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex-col justify-start items-start gap-10 flex">

                    <div className="text-black text-xl font-medium leading-normal tracking-tight">Job Details</div>
                    <div className="flex-col justify-start items-start gap-7 flex">
                      <div className="h-[73px] w-full flex-col justify-start items-start gap-2 flex">
                        <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Job Title</div>
                        <div className='w-full'>
                          <input defaultValue={''}
                            className='w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5'
                            placeholder={"Job Title / Designation"}
                            {...register("title")} />
                          {errors?.title && <p className="font-normal text-xs text-red-500 absolute">{errors?.title?.message}</p>}
                        </div>
                      </div>
                      <div className="w-full grid grid-cols-2 justify-start items-start gap-5 ">
                        <div className="flex-col gap-2 inline-flex">
                          <div className="text-slate-700  text-sm font-normal leading-[16.80px] tracking-tight">Department</div>
                          <div className='w-full'>
                            <AutocompleteBox
                              control={control}
                              isClearable={true}
                              fieldName={"department"}
                              dropdownData={department?.map(({ id, title }: any) => ({ value: id, label: title }))}
                              default={watch("department")}
                              placeholder={"Select department"}
                            />
                            {errors?.department && <p className="font-normal text-xs text-red-500 absolute">{errors?.department?.label?.message}</p>}
                          </div>
                        </div>
                        <div className=" flex-col gap-2 inline-flex">
                          <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Role</div>
                          <div className='w-full'>
                            <AutocompleteBox
                              control={control}
                              isClearable={true}
                              fieldName={"jobsRole"}
                              dropdownData={jobRole?.map(({ id, title }: any) => ({ value: id, label: title }))}
                              default={watch("jobsRole")}
                              placeholder={"Select role"}
                            />
                            {errors?.jobsRole && <p className="font-normal text-xs text-red-500 absolute">{errors?.jobsRole?.label?.message}</p>}

                          </div>
                        </div>
                      </div>

                      <div className="w-full grid grid-cols-2 justify-start items-start gap-5 ">
                        <div className="flex-col gap-2 inline-flex">
                          <div className="text-slate-700  text-sm font-normal leading-[16.80px] tracking-tight">Employment Type</div>
                          <div className='w-full'>
                            <AutocompleteBox
                              control={control}
                              isClearable={true}
                              fieldName={"employmentType"}
                              dropdownData={employeeType?.map(({ id, title }: any) => ({ value: id, label: title } as any))}
                              placeholder={"Select employment Type"}
                              defaultValue={watch("employmentType")}
                            />
                            {errors?.employmentType && <p className="font-normal text-xs text-red-500 absolute">{errors?.employmentType?.message}</p>}
                          </div>
                        </div>
                        <div className=" flex-col gap-2 inline-flex">
                          <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Work Mode</div>
                          <div className='w-full'>
                            <AutocompleteBox
                              control={control}
                              isClearable={true}
                              fieldName={"workMode"}
                              dropdownData={workMode?.map(({ id, title }: any) => ({ value: id, label: title }))}
                              default={watch("workMode")}
                              placeholder={"Select Work Mode"}
                            />
                            {errors?.workMode && <p className="font-normal text-xs text-red-500 absolute">{errors?.workMode?.label?.message}</p>}

                          </div>
                        </div>
                      </div>

                      <div className="w-full grid grid-cols-2 items-start gap-5 inline-flex">
                        <div className=" flex-col justify-start  gap-2 inline-flex">
                          <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Job Location (max 3)</div>
                          <div className='w-full'>
                            <AutocompleteBox
                              control={control}
                              isClearable={true}
                              isMulti={true}
                              fieldName={"jobLocation"}
                              dropdownData={location?.map(({ id, title }: any) => ({ value: id, label: title } as any))}
                              placeholder={"Select job location"}
                              defaultValue={watch("jobLocation")}
                            />
                            {errors?.jobLocation && <p className="font-normal text-xs text-red-500 absolute">{errors?.jobLocation?.message}</p>}
                          </div>
                        </div>
                        <div className=" flex-col justify-start items-start gap-2 inline-flex">
                          <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Job Type</div>
                          <div className='w-full'>
                            <AutocompleteBox
                              control={control}
                              isClearable={true}
                              fieldName={"jobsType"}
                              dropdownData={jobType?.map(({ id, title }: any) => ({ value: id, label: title } as any))}
                              placeholder={"Select job type"}
                              defaultValue={watch("jobsType")}
                            />
                            {errors?.jobsType && <p className="font-normal text-xs text-red-500 absolute">{errors?.jobsType?.message}</p>}
                          </div>
                        </div>
                      </div>

                      <div className="w-full grid grid-cols-1  gap-5 inline-flex">
                        <div className=" flex-col justify-start  gap-2 inline-flex">
                          <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">
                            <input
                              type='checkbox'
                              checked={watch("candidateRelocate")}
                              {...register("candidateRelocate")}
                              className='mx-3 w-4 h-4'
                            />Include candidates willing to relocate to Job locations(s)
                          </div>

                        </div>
                      </div>

                      <div className="mb-4">
                        <label htmlFor="expectedSalary" className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Annual Salary Range (Enter the salary for this job)</label>
                        <div className="grid grid-cols-8 gap-4 mt-1">
                          <div className="col-span-1">
                            <AutocompleteBox
                              control={control}
                              fieldName={"currency"}
                              dropdownData={currency?.map(({ id, title }: any) => ({ value: id, label: title }))}
                              default={watch("currency")}
                              placeholder={""}
                            />
                            {errors?.currency && <p className="font-normal text-xs text-red-500 absolute">{errors?.currency?.label?.message}</p>}
                          </div>
                          <div className="col-span-2">
                            <AutocompleteBox
                              control={control}
                              isClearable={true}
                              fieldName={"fromSalaryRange"}
                              dropdownData={salaryRange?.map(({ id, title }: any) => ({ value: id, label: title }))}
                              default={watch("fromSalaryRange")}
                              placeholder={"Select salary range"}
                            />
                            {errors?.fromSalaryRange && <div className="font-normal text-xs text-red-500 ">{errors?.fromSalaryRange?.message}</div>}
                          </div>
                          <div className="col-span-2">
                            <AutocompleteBox
                              control={control}
                              isClearable={true}
                              fieldName={"toSalaryRange"}
                              dropdownData={salaryRange?.map(({ id, title }: any) => ({ value: id, label: title }))}
                              default={watch("toSalaryRange")}
                              placeholder={"Select salary range"}
                            />
                            {errors?.toSalaryRange && <div className="font-normal text-xs text-red-500 ">{errors?.toSalaryRange?.message}</div>}
                          </div>
                          <div className="col-span-2">
                            <AutocompleteBox
                              control={control}
                              isClearable={true}
                              fieldName={"numberSystem"}
                              dropdownData={numberSystem?.map(({ id, title }: any) => ({ value: id, label: title }))}
                              default={watch("numberSystem")}
                              placeholder={"Select number system"}
                            />
                            {errors?.numberSystem && <div className="font-normal text-xs text-red-500 ">{errors?.numberSystem?.message}</div>}
                          </div>
                          <div className="col-span-1">
                            <AutocompleteBox
                              control={control}
                              isClearable={true}
                              fieldName={"recurrence"}
                              dropdownData={recurrence?.map(({ id, title }: any) => ({ value: id, label: title }))}
                              default={watch("recurrence")}
                              placeholder={"Recurrence"}
                            />
                            {errors?.recurrence && <div className="font-normal text-xs text-red-500 ">{errors?.recurrence?.message}</div>}
                          </div>
                        </div>
                      </div>
                      <div className="w-full grid grid-cols-2 items-start gap-5 inline-flex">
                        <div className=" flex-col justify-start  gap-2 inline-flex">
                          <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Roll Category</div>
                          <div className='w-full'>
                            <AutocompleteBox
                              control={control}
                              isClearable={true}
                              fieldName={"roleCategory"}
                              dropdownData={roleCategory?.map(({ id, title }: any) => ({ value: id, label: title }))}
                              default={watch("roleCategory")}
                              placeholder={"Select role category"}
                            />
                            {errors?.roleCategory && <p className="font-normal text-xs text-red-500 absolute">{errors?.roleCategory?.label?.message}</p>}
                          </div>
                        </div>
                        <div className=" flex-col justify-start items-start gap-2 inline-flex">
                          <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">No. of vacancies</div>
                          <div className='w-full'>
                            <input defaultValue={''}
                              className='w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5'
                              placeholder={"Please enter jobs opening"}
                              {...register("jobsOpening")} />

                            {errors?.jobsOpening && <p className="font-normal text-xs text-red-500 absolute">{errors?.jobsOpening?.message}</p>}
                          </div>
                        </div>
                      </div>
                      <div className="w-full h-auto flex-col justify-start items-start gap-2 flex">
                        <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Job description</div>
                        <div className='w-full'>
                          <textarea defaultValue={''}
                            className='w-full border border-gray-200 h-[154px] focus:border-blue-500 outline-none rounded-md px-2 py-1.5'
                            placeholder={"Please enter job description"}
                            {...register("jobDescription")} ></textarea>

                          {errors?.jobDescription && <p className="font-normal text-xs text-red-500 absolute">{errors?.jobDescription?.message}</p>}
                        </div>
                        <div className="w-full text-xs font-light text-gray-600 text-right float-right">
                          {watchJobDescription ? 1000 - watchJobDescription : 1000} character(s) left
                        </div>
                      </div>
                      <div className="w-full h-auto flex-col justify-start items-start gap-2 flex">
                        <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Key Responsibility</div>
                        <div className='w-full'>
                          <textarea defaultValue={''}
                            className='w-full border border-gray-200 h-[154px] focus:border-blue-500 outline-none rounded-md px-2 py-1.5'
                            placeholder={"Please enter job description"}
                            {...register("keyResponsibility")} ></textarea>

                          {errors?.keyResponsibility && <p className="font-normal text-xs text-red-500 absolute">{errors?.keyResponsibility?.message}</p>}
                        </div>
                        <div className="w-full text-xs font-light text-gray-600 text-right float-right">
                          {watchKeyResponsibility ? 1000 - watchKeyResponsibility : 1000} character(s) left
                        </div>
                      </div>
                    </div>

                  </div>

                  <div className="self-stretch justify-start items-start gap-5 inline-flex">
                    <div className="grow shrink basis-0 h-14 px-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex">
                      <div className="text-indigo-900 text-xl font-medium leading-normal tracking-tight">Cancel</div>
                    </div>
                    <div className="grow shrink basis-0 h-14 px-6 py-3 bg-indigo-600 rounded-lg shadow justify-center items-center gap-3 flex">
                      <input className="text-white text-xl font-medium leading-normal tracking-tight" type="submit" value={'Continue'} />
                    </div>
                  </div>
                </form >
              </div >
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default JobDetails