import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Select from 'react-select';
import { Controller } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../../';
import { clearGetIndustrySlice, industryGet } from '../../../../store/reducers/dropdown/industry';
import { careerProfileUpdate } from '../../../../store/reducers/jobSeekerProfile/careerProfileUpdate';
import { clearGetDepartmentSlice, departmentGet } from '../../../../store/reducers/dropdown/department';
import { clearGetRoleCategorySlice, roleCategoryGet } from '../../../../store/reducers/dropdown/roleCategory';
import { clearGetJobRoleSlice, jobRoleGet } from '../../../../store/reducers/dropdown/jobRole';
import { clearGetCurrencySlice, currencyGet } from '../../../../store/reducers/dropdown/currency';
import { clearGetLocationSlice, locationGet } from '../../../../store/reducers/dropdown/location';
import { clearGetEmployeeTypeSlice, employeeTypeGet } from '../../../../store/reducers/dropdown/employeeType';
import { clearGetJobTypeSlice, jobTypeGet } from '../../../../store/reducers/dropdown/jobType';
import { clearGetPreferredShiftSlice, preferredShiftGet } from '../../../../store/reducers/dropdown/preferredShift';
import AutocompleteBox from '../../../commonComponents/AutocompleteBox';

interface IFormInputs {
  //profileSummary: string | undefined
  industry: { value: string; label: string; }
  roleCategory: { value: string; label: string; }
  department: { value: string; label: string; }
  jobType: string[]
  jobRole: { value: string; label: string; }
  employeeType: string[]
  preferredShift: string[]
  preferredWorkLocation: { value: string; label: string; }
  currency: string
  expectedSalary: string
  // jobSeekerProfile: number
}

interface OptionField {
  value: string; label: string;
}


const CareerProfileSchema = yup.object().shape({
  industry: yup.object().shape({
    value: yup.string().required("Please select industry"),
    label: yup.string().required("Please select industry"),
  }).nullable().required("Please select industry"),
  roleCategory: yup.object().shape({
    value: yup.string().required("Please select role category"),
    label: yup.string().required("Please select role category"),
  }),
  department: yup.object().shape({
    value: yup.string().required("Please select department"),
    label: yup.string().required("Please select department"),
  }),
  jobType: yup.array().min(1).required("Job type"),
  jobRole: yup.object().shape({
    value: yup.string().required("Please select job role"),
    label: yup.string().required("Please select job role"),
  }),
  employeeType: yup.array().min(1).required("employee type"),
  preferredShift: yup.array().min(1).required("preferred shift"),
  preferredWorkLocation: yup.object().shape({
    value: yup.string().required("Please select role category"),
    label: yup.string().required("Please select role category"),
  }),
  currency: yup.string().label("currency").required(),
  expectedSalary: yup.string().label("Please enter expected salary").required(),
  // jobSeekerProfile: yup.number().label("currency").required(),
}).required();

const CareerProfileForm = ({ formSummary, id, profileDashboard, closeDialog }: any) => {

  const dispatch = useAppDispatch();
  const { success: industrySuccess, industry } = useAppSelector((state) => state.getIndustry);
  const { success: departmentSuccess, department } = useAppSelector((state) => state.getDepartment);
  const { success: roleCategorySuccess, roleCategory } = useAppSelector((state) => state.getRoleCategory);
  const { success: jobRoleSuccess, jobRole } = useAppSelector((state) => state.getJobRole);
  const { success: currencySuccess, currency } = useAppSelector((state) => state.getCurrency);
  const { success: locationSuccess, location } = useAppSelector((state) => state.getLocation);
  const { success: employeeTypeSuccess, employeeType } = useAppSelector((state) => state.getEmployeeType);
  const { success: jobTypeSuccess, jobType } = useAppSelector((state) => state.getJobType);
  const { success: preferredShiftSuccess, preferredShift } = useAppSelector((state) => state.getPreferredShift);

  //const [selectedIndustry, setSelectedIndustry] = useState({ label: profileDashboard[0]?.industry?.title, value: profileDashboard[0]?.industry?.id });
  //const [selectedDepartment, setSelectedDepartment] = useState({ label: profileDashboard[0]?.department?.title, value: profileDashboard[0]?.department?.id });
  //const [selectedRoleCategory, setSelectedRoleCategory] = useState({ label: profileDashboard[0]?.roleCategory?.title, value: profileDashboard[0]?.roleCategory?.id });
  //const [selectedJobRole, setSelectedJobRole] = useState({ label: profileDashboard[0]?.jobRole?.title, value: profileDashboard[0]?.jobRole?.id });
  // const [selectExpectedSalary, setSelectExpectedSalary] = useState(profileDashboard[0]?.expectedSalary);
  //const [selectCurrency, setSelectCurrency] = useState(profileDashboard[0]?.currency?.id);
  // const [selectEmployeeType, setSelectEmployeeType] = useState<any>(profileDashboard[0]?.careerProfileEmployeeType);
  // const [selectedLocation, setSelectedLocation] = useState({ label: profileDashboard[0]?.careerProfilePreferredLocations[0]?.location?.title, value: profileDashboard[0]?.careerProfilePreferredLocations[0]?.location?.id });
  //const [selectJobType, setSelectJobType] = useState(profileDashboard[0]?.careerProfileJobType);
  //const [selectPreferredShift, setSelectPreferredShift] = useState(profileDashboard[0]?.careerProfilePreferredShift);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useForm<IFormInputs>({
    resolver: yupResolver(CareerProfileSchema)
  });

  useEffect(() => {
    if (profileDashboard) {
      setValue('industry', profileDashboard[0]?.industry);
      setValue('department', profileDashboard[0]?.department);
      setValue('roleCategory', profileDashboard[0]?.roleCategory);
      setValue('roleCategory', profileDashboard[0]?.roleCategory);
      setValue('jobRole', profileDashboard[0]?.jobRole);
      setValue('expectedSalary', profileDashboard[0]?.expectedSalary);
      setValue('currency', profileDashboard[0]?.currency);
      setValue('employeeType', profileDashboard[0]?.careerProfileEmployeeType);
      setValue('preferredWorkLocation', profileDashboard[0]?.careerProfilePreferredLocations[0]?.location);
      setValue('jobType', profileDashboard[0]?.careerProfileJobType);
      setValue('preferredShift', profileDashboard[0]?.careerProfilePreferredShift);
    }
  }, [setValue, profileDashboard]);

  const onSubmit = (data: IFormInputs) => {
    console.log("data==========", data);

    const jobType = Array.isArray(data?.jobType) ? data?.jobType?.map(jobType => ({ jobType: jobType })) : [{ jobType: data?.jobType }];
    const employeeType = Array.isArray(data?.employeeType) ? data?.employeeType?.map(employeeType => ({ employeeType })) : [{ employeeType: data?.employeeType }];
    const preferredLocations = Array.isArray(data?.preferredWorkLocation) ? [data?.preferredWorkLocation]?.map(location => ({ location: data?.preferredWorkLocation.value })) : [{ location: data?.preferredWorkLocation.value }];
    const preferredShift = Array.isArray(data?.preferredShift) ? data?.preferredShift?.map(preferredShift => ({ preferredShift })) : [{ preferredShift: data?.preferredShift }];

    dispatch(careerProfileUpdate({ industry: data.industry.value, department: data.department.value, roleCategory: data.roleCategory.value, jobRole: data.jobRole.value, careerProfileJobType: jobType, careerProfileEmployeeType: employeeType, careerProfilePreferredLocations: preferredLocations, careerProfilePreferredShift: preferredShift, currency: data.currency, expectedSalary: data.expectedSalary, jobSeekerProfile: id })).then((res) => {
      closeDialog();
    })

    // dispatch(careerProfileUpdate({ industry: selectedIndustry, department: selectedDepartment, roleCategory: selectedRoleCategory, jobRole: selectedJobRole, careerProfileJobType: jobType, careerProfileEmployeeType: employeeType, careerProfilePreferredLocations: preferredLocations, careerProfilePreferredShift: preferredShift, currency: selectCurrency, expectedSalary: data.expectedSalary, jobSeekerProfile: id })).then((res) => {
    //   closeDialog()
    // })
  }

  useEffect(() => {
    dispatch(industryGet());
    dispatch(departmentGet());
    dispatch(roleCategoryGet());
    dispatch(jobRoleGet());
    dispatch(currencyGet());
    dispatch(locationGet());
    dispatch(employeeTypeGet());
    dispatch(jobTypeGet());
    dispatch(preferredShiftGet());

  }, [dispatch]);

  useEffect(() => {
    if (industrySuccess)
      dispatch(clearGetIndustrySlice());
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
    if (jobTypeSuccess)
      dispatch(clearGetJobTypeSlice());
    if (preferredShiftSuccess)
      dispatch(clearGetPreferredShiftSlice());

  }, [dispatch, roleCategorySuccess, industrySuccess, departmentSuccess, jobRoleSuccess, currencySuccess, locationSuccess, employeeTypeSuccess, jobTypeSuccess, preferredShiftSuccess]);


  console.log("profileDashboard===", profileDashboard);
  console.log(watch("industry"));


  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-lg font-medium text-gray-900">Career profile</h1>
      </div>
      <span className="text-sm text-gray-500 mb-3">
        {formSummary}
      </span>
      <form id="my-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="block text-sm font-medium leading-6 text-gray-900 pt-7">Current industry</div>
        <div>
          {/* <AutocompleteBox
            control={control}
            fieldName={"industry"}
            dropdownData={industry.map(({ id, title }: any) => ({ value: id, label: title }))}
            handleChange={(data: any) => setSelectedIndustry(data?.value)}
            defaultValue={selectedIndustry}
            placeholder={"Select industry"}
          /> */}
          <Controller
            name="industry"
            control={control}
            render={({ field }) => (
              <Select
                // defaultValue={options[0]}
                {...field}
                value={{ label: profileDashboard[0]?.industry?.title, value: profileDashboard[0]?.industry?.id }}
                className="react-dropdown"
                classNamePrefix="dropdown"
                options={industry.map(({ id, title }: any) => ({ value: id, label: title }))}
              />
            )}
          />

          {errors?.industry && <p className="font-normal text-xs text-red-500 absolute">{errors?.industry?.label?.message}</p>}
        </div>
        <div className="block text-sm font-medium leading-6 text-gray-900 pt-7">Department</div>
        <div>
          <AutocompleteBox
            control={control}
            fieldName={"department"}
            dropdownData={department.map(({ id, title }: any) => ({ value: id, label: title }))}
            value={{ label: profileDashboard[0]?.department?.title, value: profileDashboard[0]?.department?.id }}
            placeholder={"Select department"}
          />
          {errors?.department && <p className="font-normal text-xs text-red-500 absolute">{errors?.department?.label?.message}</p>}
        </div>
        <div className="block text-sm font-medium leading-6 text-gray-900 pt-7">Role category</div>
        <div>
          <AutocompleteBox
            control={control}
            fieldName={"roleCategory"}
            dropdownData={roleCategory.map(({ id, title }: any) => ({ value: id, label: title }))}
            defaultValue={{ label: profileDashboard[0]?.roleCategory?.title, value: profileDashboard[0]?.roleCategory?.id }}
            placeholder={"Select role category"}
          />
          {errors?.roleCategory && <p className="font-normal text-xs text-red-500 absolute">{errors?.roleCategory?.label?.message}</p>}
        </div>
        <div className="block text-sm font-medium leading-6 text-gray-900 pt-7">Job role</div>
        <div>
          <AutocompleteBox
            control={control}
            fieldName={"jobRole"}
            dropdownData={jobRole.map(({ id, title }: any) => ({ value: id, label: title }))}
            defaultValue={{ label: profileDashboard[0]?.jobRole?.title, value: profileDashboard[0]?.jobRole?.id }}
            placeholder={"Select job role"}
          />
          {errors?.jobRole && <p className="font-normal text-xs text-red-500 absolute">{errors?.jobRole?.label?.message}</p>}
        </div>
        <div className="block text-sm font-medium leading-6 text-gray-900 pt-7">Desired job type</div>
        <div className='grid grid-cols-3 gap-4'>
          {jobType.map((item, key) => <div key={item.id}>
            <input
              type='checkbox'
              defaultChecked={profileDashboard[0]?.careerProfileJobType?.map((item1: any) => item1?.jobType?.id === item?.id)[key] === true ? true : false}
              value={item.id}
              {...register("jobType")}
              className='mx-3 w-4 h-4'
            />{item?.title}
          </div>)}
          <div className='grid grid-cols-3 gap-4'></div>

        </div>
        {errors?.jobType && <div className="font-normal text-xs text-red-500 ">{errors?.jobType?.message}</div>}
        <div className="block text-sm font-medium leading-6 text-gray-900 pt-7">Desired employment type</div>
        <div className='grid grid-cols-3 gap-4'>
          {employeeType.map((item, key) => <div key={item.id}>
            <input
              type='checkbox'
              value={item.id}
              defaultChecked={profileDashboard[0]?.careerProfileEmployeeType?.map((item1: any) => item1?.employeeType?.id === item?.id)[key] === true ? true : false}
              {...register("employeeType")}
              className='mx-3 w-4 h-4'
            />{item.title}
          </div>)}
        </div>
        {errors?.employeeType && <div className="font-normal text-xs text-red-500 ">{errors?.employeeType?.message}</div>}
        <div className="block text-sm font-medium leading-6 text-gray-900 pt-7">Preferred shift</div>
        <div className='grid grid-cols-3 gap-4'>
          {preferredShift.map((item, key) => <div key={item.id}>
            <input
              type='checkbox'
              value={item.id}
              defaultChecked={profileDashboard[0]?.careerProfilePreferredShift?.map((item1: any) => item1?.preferredShift?.id === item?.id)[key] === true ? true : false}
              {...register("preferredShift")}
              className='mx-3 w-4 h-4'
            />{item.title}
          </div>
          )}
        </div>
        {errors?.preferredShift && <div className="font-normal text-xs text-red-500 ">{errors?.preferredShift?.message}</div>}
        <div className="block text-sm font-medium leading-6 text-gray-900 pt-7">Preferred work location (Max 10)</div>
        <div>

          <AutocompleteBox
            control={control}
            fieldName={"preferredWorkLocation"}
            dropdownData={location.map(({ id, title }: any) => ({ value: id, label: title }))}
            placeholder={"Select location"}
          />
          {errors?.preferredWorkLocation && <p className="font-normal text-xs text-red-500 absolute">{errors?.preferredWorkLocation?.message}</p>}
        </div>
        <div className="block text-sm font-medium leading-6 text-gray-900 pt-7">Expected salary</div>
        <div className='w-full'>
          <div className='float-left mr-3'>
            <select
              {...register("currency")} className='W-96 block p-2.5  text-sm text-black bg-gray-50 rounded-lg border border-gray-300 focus:border-blue-500 outline-none' value={profileDashboard[0]?.currency?.id}>
              <option value={''}>select</option>
              {currency.map(item => <option key={item?.id} value={item?.id}>{item.title}</option>)}
            </select>
            {errors?.currency && <p className="font-normal text-xs text-red-500 absolute">{errors?.currency?.message}</p>}
          </div>
          <div className='float-left '>
            <input defaultValue={profileDashboard[0]?.expectedSalary} className=' block p-2.5 w-full text-sm text-black bg-gray-50 rounded-lg border border-gray-300 focus:border-blue-500 outline-none'  {...register("expectedSalary")} />
            {errors?.expectedSalary && <p className="font-normal text-xs text-red-500 absolute">{errors?.expectedSalary?.message}</p>}
          </div>
        </div>
        {/* <div>
          {errors.profileSummary && <p className="font-normal text-xs text-red-500 absolute">{errors.profileSummary.message}</p>}
        </div> */}
        <div className="mt-5 flex justify-end items-center">
          <div>
            <button
              type="button"
              className="mr-3"
              onClick={closeDialog}
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
  )
}

export default CareerProfileForm;