import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import JobLeftPanel from './JobLeftPanel'
import { IFormInputsPostAJob } from '../../../../interface/employer';
import AutocompleteBox from '../../../commonComponents/AutocompleteBox';
import close from '../../../../assets/svg/close.svg';
import { getCompanyList, getCurrencyList, getDepartmentList, getEmployeeTypeList, getHighestQualificationList, getIndustryList, getJobRoleList, getKeySkillsList, getLocalityList, getLocationList, getNumberSystemList, getRecurrenceList, getRoleCategoryList, getSalaryRangeList, getTotalYearsExpList, getWorkModeList } from '../../../utils/utils';

const Requirements = () => {

  const [employeeType, setEmployeeType] = useState<any>([]);
  const [employeeTypeChecked, setEmployeeTypeChecked] = useState([{ id: '', checked: false }]);
  const [keySkills, setKeySkills] = useState<any>([]);
  const [department, setDepartment] = useState<any>([]);
  const [roleCategory, setRoleCategory] = useState<any>([]);
  const [jobRole, setJobRole] = useState<any>([]);
  const [workMode, setWorkMode] = useState<any>([]);
  const [location, setLocation] = useState<any>([]);
  const [locality, setLocality] = useState<any>([]);
  const [totalExpYear, setTotalExpYear] = useState<any>([]);
  const [currency, setCurrency] = useState<any>([]);
  const [salaryRange, setSalaryRange] = useState<any>([]);
  const [numberSystem, setNumberSystem] = useState<any>([]);
  const [recurrence, setRecurrence] = useState<any>([]);
  const [industry, setIndustry] = useState<any>([]);
  const [highestQualification, setHighestQualification] = useState<any>([]);
  const [company, setCopmpany] = useState<any>([]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useForm<IFormInputsPostAJob>({
    //  resolver: yupResolver(PostJobSchema),
  });

  useEffect(() => {
    (async () => {
      const employeeTypeList = await getEmployeeTypeList()
      if (Object.keys(employeeTypeList)?.length) {
        setEmployeeType(employeeTypeList as any)
      }
      const keySkillsList = await getKeySkillsList()
      if (Object.keys(keySkillsList)?.length) {
        setKeySkills(keySkillsList as any)
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

      const localityList = await getLocalityList()
      if (Object.keys(localityList)?.length) {
        setLocality(localityList as any)
      }

      const totalExpYearList = await getTotalYearsExpList()
      if (Object.keys(totalExpYearList)?.length) {
        setTotalExpYear(totalExpYearList as any)
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

      const industryList = await getIndustryList()
      if (Object.keys(industryList)?.length) {
        setIndustry(industryList as any)
      }

      const highestQualificationList = await getHighestQualificationList()
      if (Object.keys(highestQualificationList)?.length) {
        setHighestQualification(highestQualificationList as any)
      }

      const companyList = await getCompanyList()
      if (Object.keys(companyList)?.length) {
        setCopmpany(companyList as any)
      }
    })();
  }, [])

  return (
    <>
      <div className="w-full h-auto flex-col justify-start items-start gap-10 inline-flex">
        <div className="text-black text-xl font-medium leading-normal tracking-tight">Requirements</div>
        <div className="flex-col justify-start items-start gap-7 flex">
          <div className="h-[158px] flex-col justify-start items-start gap-2 flex">
            <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Skills</div>
            <div className="self-stretch p-3 bg-white rounded-lg border border-slate-200 justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-auto justify-start items-center gap-2 flex">
                <div className=" grow shrink basis-0 h-auto justify-start items-start gap-1 flex">

                  <div className=" px-3 py-2 bg-slate-50 rounded-lg justify-center items-center gap-2.5 flex">
                    <div className="text-black text-base font-normal leading-snug tracking-tight">Java</div>
                    <div className="w-6 h-6 bg-slate-100 rounded justify-center items-center flex">
                      <img src={close} alt="close" /></div>
                  </div>
                  <div className=" px-3 py-2 bg-slate-50 rounded-lg justify-center items-center gap-2.5 flex">
                    <div className="text-black text-base font-normal leading-snug tracking-tight">Team Management</div>
                    <div className="w-6 h-6 bg-slate-100 rounded justify-center items-center flex">
                      <img src={close} alt="close" />
                    </div>
                  </div>
                  <div className="px-3 py-2 bg-slate-50 rounded-lg justify-center items-center gap-2.5 flex">
                    <div className="text-black text-base font-normal leading-snug tracking-tight">MS Excel</div>
                    <div className="w-6 h-6 bg-slate-100 rounded justify-center items-center flex">
                      <img src={close} alt="close" />
                    </div>
                  </div>
                  <div className=" px-3 py-2 bg-slate-50 rounded-lg justify-center items-center gap-2.5 flex">
                    <div className="text-black text-base font-normal leading-snug tracking-tight">Team Management</div>
                    <div className="w-6 h-6 bg-slate-100 rounded justify-center items-center flex">
                      <img src={close} alt="close" /></div>
                  </div>
                  <div className=" px-3 py-2 bg-slate-50 rounded-lg justify-center items-center gap-2.5 flex">
                    <div className="text-black text-base font-normal leading-snug tracking-tight">Team Management</div>
                    <div className="w-6 h-6 bg-slate-100 rounded justify-center items-center flex"><img src={close} alt="close" /></div>
                  </div>
                  <div className=" px-3 py-2 bg-slate-50 rounded-lg justify-center items-center gap-2.5 flex">
                    <div className="text-black text-base font-normal leading-snug tracking-tight">Team Management</div>
                    <div className="w-6 h-6 bg-slate-100 rounded justify-center items-center flex"><img src={close} alt="close" /></div>
                  </div>
                </div>
              </div>
              <div className="border-b border-slate-600 justify-start items-center gap-2.5 flex">
                <div className="text-slate-600 text-sm font-medium leading-[16.80px] tracking-tight">Add</div>
              </div>
            </div>
            <div className="justify-start items-center gap-2 inline-flex">
              <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Available: 14/20</div>
            </div>
          </div>
          <div className="w-full flex-col justify-start  gap-2 flex">
            <div className="text-slate-700 text-sm font-normal leading-[16.80px] tracking-tight">Education</div>
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
          <div className="w-full justify-start items-start gap-5 inline-flex">
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

        </div>
        <div className="self-stretch justify-start items-start gap-5 inline-flex">
          <div className="grow shrink basis-0 h-14 px-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex">
            <div className="text-indigo-900 text-xl font-medium leading-normal tracking-tight">Cancel</div>
          </div>
          <div className="grow shrink basis-0 h-14 px-6 py-3 bg-indigo-600 rounded-lg shadow justify-center items-center gap-3 flex">
            <div className="text-white text-xl font-medium leading-normal tracking-tight">Continue</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Requirements