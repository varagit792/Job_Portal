import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch } from '../../../..';
import { getLocationList, getNoticePeriodList, getTotalMonthsExpList, getTotalYearsExpList } from '../../../utils/utils';
import { LiaRupeeSignSolid } from 'react-icons/lia';
import { Controller, useForm } from 'react-hook-form';
import { filterArray } from '../../../utils/filterArray';
import { updateProfileBasicDetails } from '../../../../store/reducers/jobSeekerProfile/profileBasicDetailsUpdate';
import Select from 'react-select';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type Parameters = {
  closeDialog: () => void;
  profileDashboard: any;
  userData: any;
}

interface IFormInputs {
  totalExpMonth: { value: string; label: string; },
  totalExpYear: { value: string; label: string; },
  name: string,
  jobSeekerType: string,
  currentLocation: { value: string; label: string; },
  currentSalary: string | undefined,
  mobileNumber: string,
  noticePeriod: string,
  email: string,
}

const basicDetailsSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email().required('Email is required'),
  mobileNumber: yup.string()
    .required('Mobile number is required')
    .matches(/^[0-9]{10}$/, 'Mobile number must be a valid 10-digit number'),
  currentSalary: yup.string().when(
    'jobSeekerType', {
    is: 'Experienced',
    then: (schema) => schema.required("Current salary is required").label('Current salary').matches(
      /^[1-9][0-9]*$/,
      'Current salary should be valid'
    ),
    otherwise: (schema) => schema.notRequired(),
  }
  ),
  jobSeekerType: yup.string()
    .required('Job seeker type is required.'),
  noticePeriod: yup.string().required('Please select a notice period'),
  currentLocation: yup.object().shape({
    value: yup.string().required("Please select current location"),
    label: yup.string().required("Please select current location"),
    // })
  }).required("Please select current location"),


  // totalExpYear: yup.object().shape({
  //   value: yup.string().required('Please select total experience years'),
  //   label: yup.string().required('Please select total experience years'),
  // }).when(
  //   'jobSeekerType', {
  //   is: 'Experienced',
  //   then: (schema) => schema.required("Please select total experience years"),
  //   otherwise: (schema) => schema.notRequired(),
  // }
  // ),
  totalExpYear: yup.object().when(["jobSeekerType"], (jobSeekerType, schema) => {
    if (jobSeekerType as any === 'Experienced') {
      return schema.required("select option");
    }
    return schema
  }),
  totalExpMonth: yup.object().when(["jobSeekerType"], (jobSeekerType, schema) => {
    if (jobSeekerType as any === 'Experienced') {
      return schema.required("select option");
    }
    return schema
  }),

}).required();


// interface IFormInputs {
//   totalExpMonth: any
//   totalExpYear: any
//   name: string
//   jobSeekerType: string;
//   currentLocation: any
//   currentCurrency: any
//   currentSalary: string
//   mobileNumber: string
//   noticePeriod: any
//   email: string
// }


const ProfileBasicDetailsForm: FC<Parameters> = ({ closeDialog, profileDashboard, userData }) => {
  const dispatch = useAppDispatch();
  // dropdown constants
  const [totalExpMonthList, setTotalExpMonthList] = useState<any>([]);
  const [totalExpYearList, setTotalExpYearList] = useState<any>([]);
  const [locationList, setLocationList] = useState<any>([]);
  const [noticePeriodList, setNoticePeriodList] = useState<any>([]);

  //react hook form controls
  const {
    control,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
    getValues
  } = useForm<IFormInputs | any>({
    defaultValues: {
      jobSeekerType: '',
      totalExpYear: { value: '', label: '' },
      totalExpMonth: { value: '', label: '' },
      currentLocation: { value: '', label: '' },
      currentSalary: '',
      noticePeriod: '',
      name: '',
      email: '',
      mobileNumber: ''
    },
    resolver: yupResolver(basicDetailsSchema)
  });

  useEffect(() => {
    setValue('currentLocation', { value: profileDashboard?.currentLocation?.id, label: profileDashboard?.currentLocation?.title });
    setValue('currentSalary', profileDashboard?.currentSalary);
    setValue('jobSeekerType', profileDashboard?.jobSeekerType);
    setValue('email', userData?.email);
    setValue('mobileNumber', userData?.mobileNumber);
    setValue('name', userData?.name);
    setValue('totalExpMonth', { value: profileDashboard?.totalExpMonth?.id, label: profileDashboard?.totalExpMonth?.title });
    setValue('totalExpYear', { value: profileDashboard?.totalExpYear?.id, label: profileDashboard?.totalExpYear?.title });
    setValue('noticePeriod', profileDashboard?.noticePeriod?.title);
  }, [profileDashboard, setValue, userData])

  useEffect(() => {
    (async () => {
      const totalExpMonth = await getTotalMonthsExpList();
      setTotalExpMonthList(totalExpMonth);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const totalExpYear = await getTotalYearsExpList();
      setTotalExpYearList(totalExpYear);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const noticePeriod = await getNoticePeriodList();
      setNoticePeriodList(noticePeriod);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const location = await getLocationList();
      setLocationList(location);
    })();
  }, []);

  const options = ['Fresher', 'Experienced'];

  const handleButtonClick = (noticePeriodOption: any) => {
    setValue("noticePeriod", noticePeriodOption);
  };

  console.log('errors', errors);
  const onSubmit = (data: IFormInputs) => {

    const monthArray = filterArray(totalExpMonthList, parseInt(data?.totalExpMonth?.value));
    const yearArray = filterArray(totalExpYearList, parseInt(data?.totalExpYear?.value));
    const locationArray = filterArray(locationList, parseInt(data?.currentLocation.value));
    const noticeArray = noticePeriodList.filter((notice: any) => notice?.title === data.noticePeriod)
    data.totalExpMonth = monthArray[0];
    data.totalExpYear = yearArray[0];
    data.currentLocation = locationArray[0];
    data.noticePeriod = noticeArray[0];
    console.log('data in submit  ', data);
    dispatch(updateProfileBasicDetails(data as any));

  };

  console.log('notice period ', watch('noticePeriod'));

  const noticePeriodClass = "border border-gray-400 py-1 mx-3 px-3 my-2 rounded-2xl";
  const noticePeriodClassHighLighted = "border border-gray-400 py-1 mx-3 px-3 my-2 rounded-2xl bg-slate-200"

  return (
    <div>
      <h1 className="text-xl font-semibold mr-6 ml-6">Basic details</h1>
      <form action="" className="m-6" id="my-form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          {/* <label htmlFor="name" className="font-medium">Name</label> */}
          <h1 className="font-medium mb-2 mt-4">Name</h1>
          <Controller
            name="name"
            control={control}
            defaultValue={userData?.name}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5 mt-1"
                readOnly={false}
              />
            )}
          />
          {errors.name && <p className="font-normal text-xs text-red-500">{errors.name.message as string}</p>}
        </div>

        <div className="mt-3 mb-6 flex flex-row gap-24">
          {
            options.map((option) => (
              <div key={option}>
                <label className="mr-3">
                  {option}
                  <Controller
                    name="jobSeekerType"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        type="radio"
                        className="ml-5"
                        {...field}
                        checked={getValues("jobSeekerType") === option}
                        onChange={() => {
                          setValue("jobSeekerType", option);
                        }}
                      />
                    )}
                  />
                </label>
                {errors.jobSeekerType && <p className="font-normal text-xs text-red-500">{errors.jobSeekerType.message as string}</p>}
              </div>
            ))
          }
        </div>
        {watch('jobSeekerType') === 'Experienced' &&
          (<div>
            <h1 className="font-medium mb-2 mt-4">Total experience</h1>
            <div className="flex flex-row gap-5">
              <div className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-lg">
                <Controller
                  control={control}
                  name="totalExpYear"
                  render={({ field }) => (
                    <Select
                      {...field}
                      isClearable
                      placeholder=""
                      options={totalExpYearList?.map(({ id, title }: any) => ({ value: id, label: title }))}
                      defaultValue={watch('totalExpYear')}

                    />
                  )}
                />
                {watch('jobSeekerType') === 'Experienced' && errors.totalExpYear && <p className="font-normal text-xs text-red-500 ">Please select total exp years</p>}
              </div>
              <div className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-lg ">
                <Controller
                  control={control}
                  name="totalExpMonth"
                  render={({ field }) => (
                    <Select
                      {...field}
                      isClearable
                      placeholder=""
                      options={totalExpMonthList?.map(({ id, title }: any) => ({ value: id, label: title }))}
                      defaultValue={getValues("totalExpMonth")}
                    />
                  )}
                />
                {watch('jobSeekerType') === 'Experienced' && errors.totalExpMonth && <p className="font-normal text-xs text-red-500 ">Please select total exp months</p>}
              </div>
            </div>
            <div>
              <h1 className="font-medium mb-2 mt-4">Current salary</h1>
              <div className="flex flex-row">
                <span className="border border-gray-300 rounded-xl py-2 px-4 text-gray-300">
                  <LiaRupeeSignSolid />
                </span>
                <Controller
                  control={control}
                  name="currentSalary"
                  render={({ field }) => (
                    <input
                      {...field}
                      value={watch("currentSalary")}
                      type="text"
                      readOnly={false}
                      className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5 ml-6"
                    />
                  )}
                />

              </div>
              {errors.currentSalary && <p className="font-normal text-xs text-red-500 ">{errors.currentSalary.message as string}</p>}
            </div>
          </div>
          )}
        <div>
          <h1 className="font-medium mb-2 mt-4">Current location</h1>
          <div className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-lg  mb-4">
            <Controller
              control={control}
              name="currentLocation"
              render={({ field }) => (
                <Select
                  {...field}
                  isClearable
                  placeholder="Tell us about your current location"
                  options={locationList?.map(({ id, title }: any) => ({ value: id, label: title }))}
                  defaultValue={watch("currentLocation")}
                />
              )}
            />
            {errors.currentLocation && ((errors.currentLocation as any)?.label?.message ? (<p className="font-normal text-xs text-red-500 ">{(errors.currentLocation as any)?.label?.message} </p>) : <p className="font-normal text-xs text-red-500 ">{(errors.currentLocation as any)?.message} </p>)}
          </div>

        </div>
        <h1 className="font-medium mb-2 mt-4">Mobile number</h1>
        <div>
          <Controller
            name="mobileNumber"
            control={control}
            defaultValue={watch("mobileNumber")}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5 mt-1"
                readOnly={false}
              />
            )}
          />
          {errors.mobileNumber && <p className="font-normal text-xs text-red-500 ">{errors.mobileNumber.message as string}</p>}
        </div>
        <h1 className="font-medium mb-2 mt-4">Email address</h1>
        <Controller
          name="email"
          control={control}
          defaultValue={watch("email")}
          render={({ field }) => (
            <input
              type="text"
              {...field}
              className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5 mt-1"
              readOnly={false}
            />
          )}
        />

        <h1 className="font-medium mt-4 mb-2">Notice Period</h1>
        <div className="flex flex-wrap flex-row mt-3">
          {
            noticePeriodList?.map((noticePeriod: any) =>
              <div key={noticePeriod?.id}>
                <Controller
                  name="noticePeriod"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (

                    <div>
                      <button
                        type="button"
                        {...field}
                        className={watch("noticePeriod") === noticePeriod?.title ? noticePeriodClassHighLighted : noticePeriodClass}
                        onClick={() => handleButtonClick(noticePeriod?.title)
                        }
                      >
                        {noticePeriod?.title}
                      </button>
                    </div>
                  )}
                />

              </div>
            )
          }

        </div>
        {errors.noticePeriod && <p className="font-normal text-xs text-red-500">{errors.noticePeriod.message as string}</p>}
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

export default ProfileBasicDetailsForm