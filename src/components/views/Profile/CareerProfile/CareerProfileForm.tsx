import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
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
  industry: { value: string; label: string; }
  roleCategory: { value: string; label: string; }
  department: { value: string; label: string; }
  jobType: string[]
  jobRole: { value: string; label: string; }
  employeeType: string[]
  preferredShift: string[]
  preferredWorkLocation: { value: string; label: string; }
  currency: { value: string; label: string; }
  expectedSalary: string
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
  jobType: yup.array().min(1).of(yup.string().required()).required("Please check Job type"),
  jobRole: yup.object().shape({
    value: yup.string().required("Please select job role"),
    label: yup.string().required("Please select job role"),
  }),
  employeeType: yup.array().min(1).of(yup.string().required()).required("Please check employee type"),
  preferredShift: yup.array().min(1).of(yup.string().required()).required("Please check preferred shift"),
  preferredWorkLocation: yup.object().shape({
    value: yup.string().required("Please select role category"),
    label: yup.string().required("Please select role category"),
  }),
  currency: yup.object().shape({
    value: yup.string().required("Select currency"),
    label: yup.string().required("Select currency"),
  }),
  expectedSalary: yup.string().label("Please enter expected salary").required(),
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
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useForm<IFormInputs>({
    resolver: yupResolver(CareerProfileSchema),
    defaultValues: {
      industry: { value: '', label: '' },
      department: { value: '', label: '' },
      roleCategory: { value: '', label: '' },
      jobRole: { value: '', label: '' },
      preferredWorkLocation: { value: '', label: '' },
      currency: { value: '', label: '' },
      expectedSalary: '',
      jobType: [],
      employeeType: [],
      preferredShift: []
    }
  });

  useEffect(() => {
    if (profileDashboard) {
      setValue('industry', { label: profileDashboard[0]?.industry?.title, value: profileDashboard[0]?.industry?.id });
      setValue('department', { label: profileDashboard[0]?.department?.title, value: profileDashboard[0]?.department?.id });
      setValue('roleCategory', { label: profileDashboard[0]?.roleCategory?.title, value: profileDashboard[0]?.roleCategory?.id });
      setValue('jobRole', { label: profileDashboard[0]?.jobRole?.title, value: profileDashboard[0]?.jobRole?.id });
      setValue('expectedSalary', profileDashboard[0]?.expectedSalary);
      setValue('currency', { label: profileDashboard[0]?.currency?.title, value: profileDashboard[0]?.currency?.id });
      setValue('employeeType', profileDashboard[0]?.careerProfileEmployeeType);
      setValue('preferredWorkLocation', { label: profileDashboard[0]?.careerProfilePreferredLocations[0]?.location?.title, value: profileDashboard[0]?.careerProfilePreferredLocations[0]?.location?.id });
      setValue('jobType', profileDashboard[0]?.careerProfileJobType);
      setValue('preferredShift', profileDashboard[0]?.careerProfilePreferredShift);
    }
  }, [setValue, profileDashboard]);

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

  const onSubmit = (data: IFormInputs) => {
    const jobType = data.jobType.map(jobType => ({ jobType }));
    const employeeType = data.employeeType.map(employeeType => ({ employeeType }));
    const preferredLocations = [data.preferredWorkLocation].map(location => ({ location: location.value }));
    const preferredShift = data.preferredShift.map(preferredShift => ({ preferredShift }));

    dispatch(careerProfileUpdate({ industry: data.industry.value, department: data.department.value, roleCategory: data.roleCategory.value, jobRole: data.jobRole.value, careerProfileJobType: jobType, careerProfileEmployeeType: employeeType, careerProfilePreferredLocations: preferredLocations, careerProfilePreferredShift: preferredShift, currency: data.currency.value, expectedSalary: data.expectedSalary, jobSeekerProfile: id }));
  }
  console.log(errors);

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
          <AutocompleteBox
            control={control}
            fieldName={"industry"}
            dropdownData={industry.map(({ id, title }: any) => ({ value: id, label: title }))}
            default={watch("industry")}
            placeholder={"Select industry"}
          />
          {errors?.industry && <p className="font-normal text-xs text-red-500 absolute">{errors?.industry?.label?.message}</p>}
        </div>
        <div className="block text-sm font-medium leading-6 text-gray-900 pt-7">Department</div>
        <div>
          <AutocompleteBox
            control={control}
            fieldName={"department"}
            dropdownData={department.map(({ id, title }: any) => ({ value: id, label: title }))}
            default={watch("department")}
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
            default={watch("roleCategory")}
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
            default={watch("jobRole")}
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
        <div className="block text-sm font-medium leading-6 text-gray-900 pt-7">Preferred work location</div>
        <div>

          <AutocompleteBox
            control={control}
            fieldName={"preferredWorkLocation"}
            dropdownData={location.map(({ id, title }: any) => ({ value: id, label: title }))}
            placeholder={"Select location"}
          />
          {errors?.preferredWorkLocation && <p className="font-normal text-xs text-red-500 absolute">{errors?.preferredWorkLocation?.label?.message}</p>}
        </div>
        <div className="block text-sm font-medium leading-6 text-gray-900 pt-7">Expected salary</div>
        <div className='w-full'>
          <div className='float-left mr-3'>
            <AutocompleteBox
              control={control}
              fieldName={"currency"}
              dropdownData={currency.map(({ id, title }: any) => ({ value: id, label: title }))}
              default={watch("currency")}
              placeholder={"Select currency"}
            />

            {errors?.currency && <p className="font-normal text-xs text-red-500 absolute">{errors?.currency?.label?.message}</p>}
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