import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch } from '../../../..';
import { getLocationList, getNoticePeriodList, getTotalMonthsExpList, getTotalYearsExpList } from '../../../utils/utils';
import { LiaRupeeSignSolid } from 'react-icons/lia';
import { Controller, useForm } from 'react-hook-form';
import { filterArray } from '../../../utils/filterArray';
import { updateProfileBasicDetails } from '../../../../store/reducers/jobSeekerProfile/profileBasicDetailsUpdate';
import Select from 'react-select';
import * as yup from 'yup';

type Parameters = {
  closeDialog: () => void;
  profileDashboard: any;
  userData: any;
}

interface IFormInputs {
  totalExpMonth: any
  totalExpYear: any
  name: string
  jobSeekerType: string;
  currentLocation: any
  currentCurrency: any
  currentSalary: string
  mobileNumber: string
  noticePeriod: any
  email: string
}

const basicDetailsSchema = yup.object({

})

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
  } = useForm<IFormInputs>({
    defaultValues: {
      jobSeekerType: profileDashboard?.jobSeekerType,
      totalExpYear: { value: profileDashboard?.totalExpYear?.id, label: profileDashboard?.totalExpYear?.title },
      totalExpMonth: { value: profileDashboard?.totalExpMonth?.id, label: profileDashboard?.totalExpMonth?.title },
      currentLocation: { value: profileDashboard?.currentLocation?.id, label: profileDashboard?.currentLocation?.title },
      currentCurrency: profileDashboard?.currentCurrency,
      currentSalary: profileDashboard?.currentSalary,
      noticePeriod: profileDashboard?.noticePeriod,
      name: userData?.name,
      email: userData?.email,
      mobileNumber: userData?.mobileNumber
    }
  });

  console.log('watch default', watch('totalExpMonth'))
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

  const onSubmit = (data: IFormInputs) => {

    const monthArray = filterArray(totalExpMonthList, data?.totalExpMonth?.value);
    const yearArray = filterArray(totalExpYearList, data?.totalExpYear?.value);
    const locationArray = filterArray(locationList, data?.currentLocation.value);

    data.totalExpMonth = monthArray[0];
    data.totalExpYear = yearArray[0];
    data.currentLocation = locationArray[0];
    console.log('data in submit  ', data);
    dispatch(updateProfileBasicDetails(data));

  };

  const noticePeriodClass = "border border-gray-400 py-1 mx-3 px-3 my-2 rounded-2xl";
  const noticePeriodClassHighLighted = "border border-gray-400 py-1 mx-3 px-3 my-2 rounded-2xl bg-slate-200"

  return (
    <div>
      <h1 className="text-xl font-semibold mr-6 ml-6">Basic details</h1>
      <br />
      <form action="" className="m-6" id="my-form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name" className="font-medium">Name</label>
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

              </div>
            ))
          }
        </div>
        {watch('jobSeekerType') === 'Experienced' &&
          (<div>
            <h1 className="font-medium mb-6">Total experience</h1>
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
              </div>
            </div>
            <h1 className="font-medium mb-6 mt-6">Current salary</h1>
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
          </div>
          )}
        <h1 className="font-medium mb-6">Current location</h1>
        <div className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-lg  mb-6">
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
        </div>
        <h1 className="font-medium mb-6">Mobile number</h1>
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
        <h1 className="font-medium mb-6 mt-6">Email address</h1>
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
                        className={watch("noticePeriod")?.id === noticePeriod?.id ? noticePeriodClassHighLighted : noticePeriodClass}
                        onClick={() => handleButtonClick(noticePeriod)
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