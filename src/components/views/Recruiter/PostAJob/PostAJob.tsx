import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../../../';
import { clearGetIndustrySlice, industryGet } from '../../../../store/reducers/dropdown/industry';
import { clearGetDepartmentSlice, departmentGet } from '../../../../store/reducers/dropdown/department';
import { clearGetRoleCategorySlice, roleCategoryGet } from '../../../../store/reducers/dropdown/roleCategory';
import { clearGetJobRoleSlice, jobRoleGet } from '../../../../store/reducers/dropdown/jobRole';
import { clearGetCurrencySlice, currencyGet } from '../../../../store/reducers/dropdown/currency';
import { clearGetLocationSlice, locationGet } from '../../../../store/reducers/dropdown/location';
import { clearGetEmployeeTypeSlice, employeeTypeGet } from '../../../../store/reducers/dropdown/employeeType';
import { clearGetLocalitySlice, localityGet } from '../../../../store/reducers/dropdown/locality';
import { clearGetNumberSystemSlice, numberSystemGet } from '../../../../store/reducers/dropdown/numberSystem';
import { clearGetRecurrenceSlice, recurrenceGet } from '../../../../store/reducers/dropdown/recurrence';
import { clearGetHighestQualificationSlice, highestQualificationGet } from '../../../../store/reducers/dropdown/highestQualification';
import { clearGetCompanySlice, companyGet } from '../../../../store/reducers/dropdown/company';
import { clearGetSalaryRangeSlice, salaryRangeGet } from '../../../../store/reducers/dropdown/salaryRange';
import { clearGetKeySkillsSlice, keySkillsGet } from '../../../../store/reducers/dropdown/keySkills';
import { clearGetWorkModeSlice, workModeGet } from '../../../../store/reducers/dropdown/workMode';
import { clearGetTotalExpYearSlice, totalExpYearGet } from '../../../../store/reducers/dropdown/totalExpYear';
import AutocompleteBox from '../../../commonComponents/AutocompleteBox';
import { postJobUpdate } from '../../../../store/reducers/jobs/postJobs';
import { IFormInputsPostAJob } from '../../../../interface/employer';
import { useSearchParams } from 'react-router-dom';
import GetJobDetails, { clearGetJobDetailSlice, getJobDetail } from '../../../../store/reducers/jobs/GetJobDetails';

const PostJobSchema = yup.object().shape({
  title: yup.string().label("Please enter job title").required(),
  jobsType: yup.object().shape({
    value: yup.string().required("Please select employment type"),
    label: yup.string().required("Please select employment type"),
  }),
  keySkills: yup.array()
    .min(2, 'Pick at least two keySkills')
    .max(10, 'Pick at most ten keySkills').required("Please select keySkills"),

  department: yup.object().shape({
    value: yup.string().required("Please select role category"),
    label: yup.string().required("Please select role category"),
  }),
  roleCategory: yup.object().shape({
    value: yup.string().required("Please select role category"),
    label: yup.string().required("Please select role category"),
  }),
  jobsRole: yup.object().shape({
    value: yup.string().required("Please select role"),
    label: yup.string().required("Please select role"),
  }),
  workMode: yup.object().shape({
    value: yup.string().required("Please select work mode"),
    label: yup.string().required("Please select work mode"),
  }),
  jobLocation: yup.array()
    .min(3, 'Pick at least three location')
    .max(10, 'Pick at most ten location').required("Please select location"),

  candidateRelocate: yup.boolean().label("Please checked candidate relocation").required(),
  jobLocality: yup.array()
    .min(2, 'Pick at least two locality')
    .max(10, 'Pick at most ten locality').required("Please select locality"),
  fromWorkExperience: yup.object().shape({
    value: yup.string().required("Please select experience"),
    label: yup.string().required("Please select experience"),
  }),
  toWorkExperience: yup.object().shape({
    value: yup.string().required("Please select experience"),
    label: yup.string().required("Please select experience"),
  }),
  currency: yup.object().shape({
    value: yup.string().required("Please select currency"),
    label: yup.string().required("Please select currency"),
  }),
  toSalaryRange: yup.object().shape({
    value: yup.string().required("Please select salary"),
    label: yup.string().required("Please select salary"),
  }),
  fromSalaryRange: yup.object().shape({
    value: yup.string().required("Please select salary"),
    label: yup.string().required("Please select salary"),
  }),
  numberSystem: yup.object().shape({
    value: yup.string().required("Please select number system"),
    label: yup.string().required("Please select number system"),
  }),
  recurrence: yup.object().shape({
    value: yup.string().required("Please select recurrence"),
    label: yup.string().required("Please select recurrence"),
  }),
  hideSalaryDetails: yup.boolean().label("Please checked hide salary details").required(),
  companyIndustry: yup.object().shape({
    value: yup.string().required("Please select industry"),
    label: yup.string().required("Please select industry"),
  }),
  highestQualification: yup.array()
    .min(2, 'Pick at least two education')
    .max(10, 'Pick at most ten education').required("Please select education"),
  premiumBTech: yup.boolean().label("Please enter premium BTech").required(),
  premiumMBAAll: yup.boolean().label("Please enter premium MBA").required(),
  candidateIndustry: yup.array()
    .min(2, 'Pick at least two industry')
    .max(10, 'Pick at most ten industry').required("Please select industry"),
  diversityHiring: yup.boolean().label("Please checked diversity hiring").required(),
  jobDescription: yup.string().label("Please enter job description").required(),
  jobsOpening: yup.number().label("Please enter jobs opening").required(),
  videoProfile: yup.boolean().label("Please checked video profile").required(),
  includeWalkInDetails: yup.boolean().label("Please checked walk-in").required(),
  notifyMeAbout: yup.boolean().label("Please checked notify me").required(),
  notificationEmailAddress1: yup.string().label("Please enter notification email address 1").required(),
  notificationEmailAddress2: yup.string().label("Please enter notification email address 2").required(),
  company: yup.object().shape({
    value: yup.string().required("Please select company"),
    label: yup.string().required("Please select company"),
  }),
  companyWebsite: yup.string().label("Please enter company website").required(),
  aboutCompany: yup.string().label("Please enter about company").required(),
  companyAddress: yup.string().label("Please enter company address").required(),
}).required();

const PostAJob = () => {
  let search = window.location.search;
  const [searchParams] = useSearchParams(search);
  console.log(searchParams.get('postId'));

  const postId = Number(searchParams.get('postId'));
  console.log("postId", postId);

  const dispatch = useAppDispatch();

  const { success: jobDetailSuccess, jobDetail } = useAppSelector((state) => state.getJobDetail);
  const { success: industrySuccess, industry } = useAppSelector((state) => state.getIndustry);
  const { success: departmentSuccess, department } = useAppSelector((state) => state.getDepartment);
  const { success: roleCategorySuccess, roleCategory } = useAppSelector((state) => state.getRoleCategory);
  const { success: jobRoleSuccess, jobRole } = useAppSelector((state) => state.getJobRole);
  const { success: currencySuccess, currency } = useAppSelector((state) => state.getCurrency);
  const { success: locationSuccess, location } = useAppSelector((state) => state.getLocation);
  const { success: employeeTypeSuccess, employeeType } = useAppSelector((state) => state.getEmployeeType);
  const { success: companySuccess, company } = useAppSelector((state) => state.getCompany);
  const { success: keySkillsSuccess, keySkills } = useAppSelector((state) => state.getKeySkills);
  const { success: workModeSuccess, workMode } = useAppSelector((state) => state.getWorkMode);
  const { success: localitySuccess, locality } = useAppSelector((state) => state.getLocality);
  const { success: numberSystemSuccess, numberSystem } = useAppSelector((state) => state.getNumberSystem);
  const { success: recurrenceSuccess, recurrence } = useAppSelector((state) => state.getRecurrence);
  const { success: totalExpYearSuccess, totalExpYear } = useAppSelector((state) => state.getTotalExpYear);
  const { success: salaryRangeSuccess, salaryRange } = useAppSelector((state) => state.getSalaryRange);
  const { success: hightestQualificationSuccess, highestQualification } = useAppSelector((state) => state.getHighestQualification);
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

  jobDetail?.jobsKeySkills?.filter((item: any) => item && selectedJobsKeySkills.push({ value: item?.keySkills?.id, label: item?.keySkills?.title }));

  const selectedJobsLocation: any = [];
  jobDetail?.jobsLocation?.filter((item: any) => item && selectedJobsLocation.push({ value: item?.location?.id, label: item?.location?.title }));

  const selectedJobLocality: any = [];
  jobDetail?.jobLocality?.filter((item: any) => item && selectedJobLocality.push({ value: item?.locality?.id, label: item?.locality?.title }));

  const selectedJobEducation: any = [];
  jobDetail?.jobEducation?.filter((item: any) => item && selectedJobEducation.push({ value: item?.education?.id, label: item?.education?.title }));

  const selectedCandidateIndustry: any = [];
  jobDetail?.jobCandidateIndustry?.filter((item: any) => item && selectedCandidateIndustry.push({ value: item?.candidateIndustry?.id, label: item?.candidateIndustry?.title }));

  useEffect(() => {
    if (jobDetail) {
      jobDetail?.title && setValue('title', jobDetail?.title);
      jobDetail?.jobsType && setValue('jobsType', { label: jobDetail?.jobsType?.title, value: jobDetail?.jobsType?.id.toString() });
      jobDetail?.jobsKeySkills && setValue('keySkills', selectedJobsKeySkills);
      jobDetail?.department && setValue('department', { label: jobDetail?.department?.title, value: jobDetail?.department?.id.toString() });
      jobDetail?.roleCategory && setValue('roleCategory', { label: jobDetail?.roleCategory?.title, value: jobDetail?.roleCategory?.id.toString() });
      jobDetail?.jobsRole && setValue('jobsRole', { label: jobDetail?.jobsRole?.title, value: jobDetail?.jobsRole?.id.toString() });
      jobDetail?.workMode && setValue('workMode', { label: jobDetail?.workMode?.title, value: jobDetail?.workMode?.id.toString() });
      jobDetail?.jobsLocation && setValue('jobLocation', selectedJobsLocation);
      jobDetail?.candidateRelocate && setValue('candidateRelocate', jobDetail?.candidateRelocate);
      jobDetail?.hideSalaryDetails && setValue('hideSalaryDetails', jobDetail?.hideSalaryDetails);
      jobDetail?.jobLocality && setValue('jobLocality', selectedJobLocality);
      jobDetail?.totalExpYearStart && setValue('fromWorkExperience', { label: jobDetail?.totalExpYearStart?.title, value: jobDetail?.totalExpYearStart?.id.toString() });
      jobDetail?.totalExpYearEnd && setValue('toWorkExperience', { label: jobDetail?.totalExpYearEnd?.title, value: jobDetail?.totalExpYearEnd?.id.toString() });

      jobDetail?.currency && setValue('currency', { label: jobDetail?.currency?.title, value: jobDetail?.currency?.id.toString() });
      jobDetail?.payScaleLowerRange && setValue('fromSalaryRange', { label: jobDetail?.payScaleLowerRange?.title, value: jobDetail?.payScaleLowerRange?.id });
      jobDetail?.payScaleUpperRange && setValue('toSalaryRange', { label: jobDetail?.payScaleUpperRange?.title, value: jobDetail?.payScaleUpperRange?.id.toString() });
      jobDetail?.numberSystem && setValue('numberSystem', { label: jobDetail?.numberSystem?.title, value: jobDetail?.numberSystem?.id.toString() });
      jobDetail?.recurrence && setValue('recurrence', { label: jobDetail?.recurrence?.title, value: jobDetail?.recurrence?.id.toString() });
      jobDetail?.companyIndustry && setValue('companyIndustry', { label: jobDetail?.companyIndustry?.title, value: jobDetail?.companyIndustry?.id.toString() });
      jobDetail?.jobEducation && setValue('highestQualification', selectedJobEducation);
      jobDetail?.premiumBTech && setValue('premiumBTech', jobDetail?.premiumBTech);
      jobDetail?.premiumMBAAll && setValue('premiumMBAAll', jobDetail?.premiumMBAAll);
      jobDetail?.jobCandidateIndustry && setValue('candidateIndustry', selectedCandidateIndustry);
      jobDetail?.diversityHiring && setValue('diversityHiring', jobDetail?.diversityHiring);
      jobDetail?.jobDescription && setValue('jobDescription', jobDetail?.jobDescription);
      jobDetail?.jobsOpening && setValue('jobsOpening', jobDetail?.jobsOpening);
      jobDetail?.videoProfile && setValue('videoProfile', jobDetail?.videoProfile);
      jobDetail?.includeWalkInDetails && setValue('includeWalkInDetails', jobDetail?.includeWalkInDetails);
      jobDetail?.notifyMeAbout && setValue('notifyMeAbout', jobDetail?.notifyMeAbout);
      jobDetail?.notificationEmailAddress1 && setValue('notificationEmailAddress1', jobDetail?.notificationEmailAddress1);
      jobDetail?.notificationEmailAddress2 && setValue('notificationEmailAddress2', jobDetail?.notificationEmailAddress2);
      jobDetail?.company && setValue('company', { label: jobDetail?.company?.title, value: jobDetail?.company?.id.toString() });
      jobDetail?.companyWebsite && setValue('companyWebsite', jobDetail?.companyWebsite);
      jobDetail?.aboutCompany && setValue('aboutCompany', jobDetail?.aboutCompany);
      jobDetail?.companyAddress && setValue('companyAddress', jobDetail?.companyAddress);
    }
  }, [setValue, jobDetail]);

  useEffect(() => {
    dispatch(industryGet());
    dispatch(highestQualificationGet());
    dispatch(localityGet());
    dispatch(getJobDetail(1));

    dispatch(numberSystemGet());
    dispatch(recurrenceGet());
    dispatch(salaryRangeGet());
    dispatch(totalExpYearGet());
    dispatch(departmentGet());
    dispatch(roleCategoryGet());
    dispatch(jobRoleGet());
    dispatch(currencyGet());
    dispatch(locationGet());
    dispatch(employeeTypeGet());
    dispatch(companyGet());
    dispatch(keySkillsGet());
    dispatch(workModeGet());
  }, [dispatch]);

  useEffect(() => {
    if (industrySuccess)
      dispatch(clearGetIndustrySlice());
    if (jobDetailSuccess)
      dispatch(clearGetJobDetailSlice());
    if (numberSystemSuccess)
      dispatch(clearGetNumberSystemSlice());
    if (recurrenceSuccess)
      dispatch(clearGetRecurrenceSlice());
    if (companySuccess)
      dispatch(clearGetCompanySlice());
    if (totalExpYearSuccess)
      dispatch(clearGetTotalExpYearSlice());
    if (hightestQualificationSuccess)
      dispatch(clearGetHighestQualificationSlice());
    if (salaryRangeSuccess)
      dispatch(clearGetSalaryRangeSlice());
    if (localitySuccess)
      dispatch(clearGetLocalitySlice());
    if (workModeSuccess)
      dispatch(clearGetWorkModeSlice());
    if (keySkillsSuccess)
      dispatch(clearGetKeySkillsSlice());
    if (departmentSuccess)
      dispatch(clearGetDepartmentSlice());
    if (roleCategorySuccess)
      dispatch(clearGetRoleCategorySlice());
    if (jobRoleSuccess)
      dispatch(clearGetJobRoleSlice());
    if (currencySuccess)
      dispatch(clearGetCurrencySlice());
    if (locationSuccess)
      dispatch(clearGetLocationSlice());
    if (employeeTypeSuccess)
      dispatch(clearGetEmployeeTypeSlice());


  }, [dispatch, roleCategorySuccess, industrySuccess, departmentSuccess, jobRoleSuccess, currencySuccess, locationSuccess, employeeTypeSuccess, localitySuccess, workModeSuccess, keySkillsSuccess, totalExpYearSuccess, salaryRangeSuccess, hightestQualificationSuccess, companySuccess, numberSystemSuccess, recurrenceSuccess, jobDetailSuccess]);


  const onSubmit = (data: IFormInputsPostAJob) => {

    const keySkills = data?.keySkills?.map((skills: any) => ({ preferred: true, keySkills: { id: skills?.value } }));
    const jobLocation = data?.jobLocation?.map((location: any) => ({ location: location?.value }));
    const jobEducation = data?.highestQualification?.map((education: any) => ({ education: { id: education?.value } }));
    const jobLocality = data?.jobLocality?.map((local: any) => ({ locality: { id: local?.value } }));
    const jobCandidateIndustry = data?.candidateIndustry?.map((industry: any) => ({ candidateIndustry: { id: industry?.value } }));

    dispatch(postJobUpdate({
      id: 1,
      title: data?.title,
      payScaleLowerRange: data?.fromSalaryRange?.value,
      jobsOpening: Number(data?.jobsOpening),
      userType: "employer",
      payScaleUpperRange: data?.toSalaryRange?.value,
      jobDescription: data?.jobDescription,
      company: data.company.value,
      totalExpYearStart: data?.fromWorkExperience?.value,
      totalExpYearEnd: data?.toWorkExperience?.value,
      numberSystem: data?.numberSystem?.value,
      recurrence: data?.recurrence?.value,
      jobsLocation: jobLocation,
      jobsRole: data?.jobsRole.value,
      department: data?.department?.value,
      jobsType: data?.jobsType?.value,
      roleCategory: data?.roleCategory?.value,
      jobEducation: jobEducation,
      user: "1",
      jobsKeySkills: keySkills,
      status: true,
      workMode: data?.workMode?.value,
      candidateRelocate: data?.candidateRelocate,
      jobLocality: jobLocality,
      currency: data?.currency?.value,
      hideSalaryDetails: data?.hideSalaryDetails,
      companyIndustry: data?.companyIndustry?.value,
      premiumBTech: data?.premiumBTech,
      premiumMBAAll: data?.premiumMBAAll,
      jobCandidateIndustry: jobCandidateIndustry,
      diversityHiring: data?.diversityHiring,
      videoProfile: data?.videoProfile,
      includeWalkInDetails: data?.includeWalkInDetails,
      notifyMeAbout: data?.notifyMeAbout,
      notificationEmailAddress1: data?.notificationEmailAddress1,
      notificationEmailAddress2: data?.notificationEmailAddress2,
      companyWebsite: data?.companyWebsite,
      aboutCompany: data?.aboutCompany,
      companyAddress: data?.companyAddress,

    }));
  }

  return (
    <>
      <div className="h-[10%] w-full"></div>
      <div className="bg-[#F8FAFC] font-sans px-32 py-10">
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-lg font-medium text-gray-900">Post A Job - Hot Vacancy</h1>
          </div>
          <span className="text-sm text-gray-500 mb-3">
            This information will help the recruiters  know about your current job profile and also your desired job criteria. This will also help us personalize your job recommendations.
          </span>
          <form id="my-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <div className="block text-sm font-medium leading-6 text-gray-900 ">Job Title / Designation</div>
              <div className="mt-1">
                <input defaultValue={''}
                  className='w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5'
                  placeholder={"Job Title / Designation"}
                  {...register("title")} />
                {errors?.title && <p className="font-normal text-xs text-red-500 absolute">{errors?.title?.message}</p>}
              </div>
            </div>
            <div className="mb-4">
              <div className="block text-sm font-medium leading-6 text-gray-900 ">Employment Type</div>
              <div className="mt-1">
                <AutocompleteBox
                  control={control}
                  isClearable={true}
                  fieldName={"jobsType"}
                  dropdownData={employeeType.map(({ id, title }: any) => ({ value: id, label: title }))}
                  default={watch("jobsType")}
                  placeholder={"Select employee Type"}
                />
                {errors?.jobsType && <p className="font-normal text-xs text-red-500 absolute">{errors?.jobsType?.label?.message}</p>}
              </div>
            </div>

            <div className="mb-4">
              <div className="block text-sm font-medium leading-6 text-gray-900 ">Key Skills</div>
              <div className="mt-1">
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

            <div className="mb-4">
              <div className="block text-sm font-medium leading-6 text-gray-900 ">Department</div>
              <div className="mt-1">
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

            <div className="mb-4">
              <div className="block text-sm font-medium leading-6 text-gray-900 ">Role category</div>
              <div className="mt-1">
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

            <div className="mb-4">
              <div className="block text-sm font-medium leading-6 text-gray-900 ">Role</div>
              <div className="mt-1">
                <AutocompleteBox
                  control={control}
                  isClearable={true}
                  fieldName={"jobsRole"}
                  dropdownData={jobRole?.map(({ id, title }: any) => ({ value: id, label: title }))}
                  default={watch("jobsRole")}
                  placeholder={"Select role category"}
                />
                {errors?.jobsRole && <p className="font-normal text-xs text-red-500 absolute">{errors?.jobsRole?.label?.message}</p>}
              </div>
            </div>

            <div className="mb-4">
              <div className="block text-sm font-medium leading-6 text-gray-900 ">Work Mode (Select where the candidate will be working from)</div>
              <div className="mt-1">
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
            <div className="mb-4">
              <div className="block text-sm font-medium leading-6 text-gray-900 ">Job location (Max 3)</div>
              <div className="mt-1">
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
              <div className="mt-4">
                <input
                  type='checkbox'
                  checked={watch("candidateRelocate")}
                  {...register("candidateRelocate")}
                  className='mx-3 w-4 h-4'
                /> Include candidates willing to relocate to above locations(s)
              </div>
            </div>

            <div className="mb-4">
              <div className="block text-sm font-medium leading-6 text-gray-900 ">Locality</div>
              <div className="mt-1">
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
            <div className="mb-4">
              <div className="block text-sm font-medium leading-6 text-gray-900 ">Work Experience (years)</div>
              <div className='grid grid-cols-2 gap-4 mt-1'>
                <div>
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

                <div>
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
            </div>
            <div className="mb-4">
              <label htmlFor="expectedSalary" className="block text-sm font-medium leading-6 text-gray-900">Annual Salary Range (Enter the salary for this job)</label>
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
            <div className="mb-4">
              <div className="block text-sm font-medium leading-6 text-gray-900 ">Locality</div>
              <div className="mt-1">
                <input
                  type='checkbox'
                  checked={watch("hideSalaryDetails")}
                  {...register("hideSalaryDetails")}
                  className='mx-3 w-4 h-4'
                /> Hide salary details from candidates
                {errors?.hideSalaryDetails && <p className="font-normal text-xs text-red-500 absolute">{errors?.hideSalaryDetails?.message}</p>}
              </div>
            </div>
            <div className="mb-4">
              <div className="block text-sm font-medium leading-6 text-gray-900 ">Company Industry</div>
              <div className="mt-1">
                <AutocompleteBox
                  control={control}
                  isClearable={true}
                  fieldName={"companyIndustry"}
                  dropdownData={industry?.map(({ id, title }: any) => ({ value: id, label: title } as any))}
                  placeholder={"Select company industry"}
                  defaultValue={watch("companyIndustry")}
                />
                {errors?.companyIndustry && <p className="font-normal text-xs text-red-500 absolute">{errors?.companyIndustry?.label?.message}</p>}
              </div>
            </div>
            <div className="mb-4">
              <div className="block text-sm font-medium leading-6 text-gray-900 ">Education Qualification</div>
              <div className="mt-1">
                <AutocompleteBox
                  control={control}
                  isClearable={true}
                  isMulti={true}
                  fieldName={"highestQualification"}
                  dropdownData={highestQualification?.map(({ id, title }: any) => ({ value: id, label: title } as any))}
                  placeholder={"Select highest Qualification"}
                  defaultValue={watch("highestQualification")}
                />
                {errors?.highestQualification && <p className="font-normal text-xs text-red-500 absolute">{errors?.highestQualification?.message}</p>}
              </div>
              <div className='mt-3'>Candidate must have all the above specializations in undergraduate, postgraduate and doctorate</div>
              <div className="grid grid-cols-8 gap-4 mt-1">
                <div className="col-span-2">
                  <div className="mt-1">
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
                  <div className="mt-1">
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
            <div className="mb-4">
              <div className="block text-sm font-medium leading-6 text-gray-900 ">Candidate Industry</div>
              <div className="mt-1">
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

            <div className="mb-4">
              <div className="block text-sm font-medium leading-6 text-gray-900 ">Diversity Hiring</div>
              <div className="mt-1">
                <input
                  type='checkbox'
                  checked={watch("diversityHiring")}
                  {...register("diversityHiring")}
                  className='mx-3 w-4 h-4'
                /> Hire women candidates for this role and promote diversity in the workplace
                {errors?.diversityHiring && <p className="font-normal text-xs text-red-500 absolute">{errors?.diversityHiring?.message}</p>}
              </div>
            </div>

            <div className="mb-4">
              <div className="block text-sm font-medium leading-6 text-gray-900 ">Job Description</div>
              <div className="mt-1">
                <textarea defaultValue={''}
                  className='w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5'
                  placeholder={"Please enter job description"}
                  {...register("jobDescription")} ></textarea>

                {errors?.jobDescription && <p className="font-normal text-xs text-red-500 absolute">{errors?.jobDescription?.message}</p>}
              </div>
            </div>
            <div className="mb-4">
              <div className="block text-sm font-medium leading-6 text-gray-900 ">Vacancy for this job</div>
              <div className="mt-1">
                <input defaultValue={''}
                  className='w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5'
                  placeholder={"Please enter jobs opening"}
                  {...register("jobsOpening")} />

                {errors?.jobsOpening && <p className="font-normal text-xs text-red-500 absolute">{errors?.jobsOpening?.message}</p>}
              </div>
            </div>
            <div className="mb-4">
              <div className="mt-1">
                <input
                  type='checkbox'
                  checked={watch("videoProfile")}
                  {...register("videoProfile")}
                  className='mx-3 w-4 h-4'
                /> Request candidate for video profile
                {errors?.videoProfile && <p className="font-normal text-xs text-red-500 absolute">{errors?.videoProfile?.message}</p>}
              </div>
            </div>
            <div className="mb-4">
              <div className="mt-1">
                <input
                  type='checkbox'
                  checked={watch("includeWalkInDetails")}
                  {...register("includeWalkInDetails")}
                  className='mx-3 w-4 h-4'
                /> Include walk-in details
                {errors?.includeWalkInDetails && <p className="font-normal text-xs text-red-500 absolute">{errors?.includeWalkInDetails?.message}</p>}
              </div>
            </div>
            <div className="mb-4">
              <div className="mt-1">
                <hr />
              </div>
            </div>
            <div className="mb-4">
              <div className="mt-1">
                <h1 className="block text-xm font-medium leading-6 text-gray-900 ">Manage Response</h1>
              </div>
            </div>
            <div className="mb-4">
              <div className="mt-1">
                <input
                  type='checkbox'
                  checked={watch("notifyMeAbout")}
                  {...register("notifyMeAbout")}
                  className='mx-3 w-4 h-4'
                /> Notify me about
                {errors?.notifyMeAbout && <p className="font-normal text-xs text-red-500 absolute">{errors?.notifyMeAbout?.message}</p>}
              </div>
            </div>

            <div className="mb-4">
              <div className="block text-sm font-medium leading-6 text-gray-900 ">On which email ids do you want to receive notifications of matching applies?</div>
              <div className="mt-1">
                <div className="grid grid-cols-8 gap-4 mt-1">
                  <div className="col-span-2">
                    <div className="mt-1">
                      <input defaultValue={''}
                        className='w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5'
                        placeholder={"Please enter email address"}
                        {...register("notificationEmailAddress1")} />
                    </div>
                    {errors?.notificationEmailAddress1 && <p className="font-normal text-xs text-red-500 absolute">{errors?.notificationEmailAddress1?.message}</p>}
                  </div>
                  <div className="col-span-2">
                    <div className="mt-1">
                      <input defaultValue={''}
                        className='w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5'
                        placeholder={"Please enter email address"}
                        {...register("notificationEmailAddress2")} />
                    </div>
                    {errors?.notificationEmailAddress2 && <p className="font-normal text-xs text-red-500 absolute">{errors?.notificationEmailAddress2?.message}</p>}
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="block text-sm font-medium leading-6 text-gray-900 ">Company Name</div>
              <div className="mt-1">
                <AutocompleteBox
                  control={control}
                  isClearable={true}
                  fieldName={"company"}
                  dropdownData={company?.map(({ id, title }: any) => ({ value: id, label: title } as any))}
                  placeholder={"Select company"}
                  defaultValue={watch("company")}
                />
                {errors?.company && <p className="font-normal text-xs text-red-500 absolute">{errors?.company?.message}</p>}
              </div>
            </div>
            <div className="mb-4">
              <div className="block text-sm font-medium leading-6 text-gray-900 ">Company Website</div>
              <div className="mt-1">
                <input defaultValue={''}
                  className='w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5'
                  placeholder={"Please enter company website"}
                  {...register("companyWebsite")} />
                {errors?.companyWebsite && <p className="font-normal text-xs text-red-500 absolute">{errors?.companyWebsite?.message}</p>}
              </div>
            </div>
            <div className="mb-4">
              <div className="block text-sm font-medium leading-6 text-gray-900 ">About Company</div>
              <div className="mt-1">
                <textarea defaultValue={''}
                  className='w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5'
                  placeholder={"Please enter about company"}
                  {...register("aboutCompany")} ></textarea>

                {errors?.aboutCompany && <p className="font-normal text-xs text-red-500 absolute">{errors?.aboutCompany?.message}</p>}
              </div>
            </div>
            <div className="mb-4">
              <div className="block text-sm font-medium leading-6 text-gray-900 ">Company Address</div>
              <div className="mt-1">
                <textarea defaultValue={''}
                  className='w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5'
                  placeholder={"Please enter company address"}
                  {...register("companyAddress")} ></textarea>

                {errors?.companyAddress && <p className="font-normal text-xs text-red-500 absolute">{errors?.companyAddress?.message}</p>}
              </div>
            </div>
            <div className="mt-5 flex justify-end items-center">
              <div>
                <button
                  type="button"
                  className="mr-3"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-3xl bg-blue-500 text-white px-5 py-1.5" >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div >
    </>
  )
}

export default PostAJob