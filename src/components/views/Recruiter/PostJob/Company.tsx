import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import JobLeftPanel from './JobLeftPanel'
import { IFormInputsPostAJob } from '../../../../interface/employer';
import AutocompleteBox from '../../../commonComponents/AutocompleteBox';
import star from '../../../../assets/svg/star.svg';
import { getCompanyList, getCurrencyList, getDepartmentList, getEmployeeTypeList, getHighestQualificationList, getIndustryList, getJobRoleList, getKeySkillsList, getLocalityList, getLocationList, getNumberSystemList, getRecurrenceList, getRoleCategoryList, getSalaryRangeList, getTotalYearsExpList, getWorkModeList } from '../../../utils/utils';

const Company = () => {

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
      <div className="w-full h-auto flex-col justify-start  gap-10 inline-flex">
        <div className="flex-col justify-start  gap-10 flex">
          <div className="text-black text-xl font-medium  leading-normal tracking-tight">Company</div>
          <div className="justify-start items-center gap-2 inline-flex">
            <div className="w-6 h-6 relative">
              <input type="checkbox"
                {...register("fillCompanyInformation")}
                defaultChecked={true}
                className=" w-4 h-4" />

            </div>
            <div className="text-black text-base font-normal  leading-snug tracking-tight">Fill saved company information</div>
          </div>
          <div className="flex-col justify-start  gap-7 flex">

            <div className="flex-col justify-start  gap-2 flex">
              <div className="text-slate-700 text-sm font-normal  leading-[16.80px] tracking-tight">Company logo</div>
              <div className="justify-start  inline-flex">
                <div className="w-[120px] h-[120px] p-3 rounded-lg border border-indigo-300 flex-col justify-center items-center gap-2 inline-flex">
                  <div className="w-6 h-6 flex-col justify-center items-center flex"></div>
                  <div className="self-stretch justify-start  gap-5 inline-flex">
                    <div className="grow shrink basis-0 self-stretch justify-center items-center gap-1 flex">
                      <div className="grow shrink basis-0 text-center text-slate-400 text-xs font-normal  leading-[14.40px] tracking-tight">Formats: .png and .jpg</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch justify-start  gap-5 inline-flex">
              <div className="w-full grow shrink basis-0 flex-col justify-start  gap-2 inline-flex">
                <div className="text-slate-700 text-sm font-normal  leading-[16.80px] tracking-tight">Company name</div>
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
              <div className="w-full grow shrink basis-0  flex-col justify-start  gap-2 inline-flex">
                <div className="text-slate-700 text-sm font-normal  leading-[16.80px] tracking-tight">Website</div>
                <input defaultValue={''}
                  className='w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5'
                  placeholder={"Please enter company website"}
                  {...register("companyWebsite")} />
                {errors?.companyWebsite && <p className="font-normal text-xs text-red-500 absolute">{errors?.companyWebsite?.message}</p>}
              </div>
            </div>
            <div className="w-full h-auto flex-col justify-start  gap-2 flex">
              <div className="text-slate-700 text-sm font-normal  leading-[16.80px] tracking-tight">About Company</div>
              <textarea defaultValue={''}
                className='w-full h-[154px] border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5'
                placeholder={"Please enter about company"}
                {...register("aboutCompany")} ></textarea>

              {errors?.aboutCompany && <p className="font-normal text-xs text-red-500 absolute">{errors?.aboutCompany?.message}</p>}
              <div className="justify-start items-center gap-2 inline-flex">
                <div className="text-slate-700 text-sm font-normal  leading-[16.80px] tracking-tight">Characters available: 120/120</div>
              </div>
            </div>

            <div className="w-full h-auto flex-col justify-start  gap-2 flex">
              <div className="text-slate-700 text-sm font-normal  leading-[16.80px] tracking-tight">Company Address</div>
              <textarea defaultValue={''}
                className='w-full border h-[130px] border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5'
                placeholder={"Please enter company address"}
                {...register("companyAddress")} ></textarea>

              {errors?.companyAddress && <p className="font-normal text-xs text-red-500 absolute">{errors?.companyAddress?.message}</p>}
              <div className="justify-start items-center gap-2 inline-flex">
                <div className="text-slate-700 text-sm font-normal  leading-[16.80px] tracking-tight">Characters available: 120/120</div>
              </div>
            </div>

            <div className="flex-col justify-start  gap-2 flex">
              <div className="text-slate-700 text-sm font-normal  leading-[16.80px] tracking-tight">Rating</div>
              <div className="justify-start items-center gap-5 inline-flex">
                <div className="w-[177px] p-3 bg-white rounded-lg justify-start items-center gap-2 flex">
                  <div className="justify-start items-center gap-1 flex">
                    <div className="w-6 h-6 justify-center items-center flex"><img src={star} alt='star' /></div>
                    <div className="text-black text-sm font-normal  leading-[16.80px] tracking-tight">3.5</div>
                  </div>
                  <div className="w-0.5 self-stretch origin-top-left  border border-indigo-100"></div>
                  <div className="text-slate-500 text-sm font-normal  leading-[16.80px] tracking-tight">5k+ Reviews</div>
                </div>
                <div className="justify-start items-center gap-2 flex">
                  <div className="w-6 h-6 relative">
                    <input type="checkbox"
                      {...register("hideCompanyRating")}
                      defaultChecked={true}
                      className=" w-4 h-4" />
                    {errors?.hideCompanyRating && <p className="font-normal text-xs text-red-500 absolute">{errors?.hideCompanyRating?.message}</p>}
                  </div>
                  <div className="text-slate-400 text-sm font-normal  leading-[16.80px] tracking-tight">Hide company rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch justify-start  gap-5 inline-flex">
          <div className="grow shrink basis-0 h-14 pl-3 pr-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex">
            <div className="w-6 h-6 justify-center items-center flex"></div>
            <div className="text-indigo-900 text-xl font-medium  leading-normal tracking-tight">Back</div>
          </div>
          <div className="grow shrink basis-0 h-14 px-6 py-3 bg-indigo-600 rounded-lg shadow justify-center items-center gap-3 flex">
            <div className="text-white text-xl font-medium  leading-normal tracking-tight">Continue</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Company