import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { IFormInputsPostAJob } from '../../../../interface/employer';

const Recruiter = () => {

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

  return (
    <>
      <div className="w-full h-auto flex-col justify-start  gap-10 inline-flex">
        <div className="flex-col justify-start  gap-10 flex">
          <div className="justify-start items-end gap-2 inline-flex">
            <div className="text-black text-xl font-medium  leading-normal tracking-tight">Recruiter</div>
            <div className="text-slate-500 text-base font-normal  leading-snug tracking-tight">(optional)</div>
          </div>
          <div className="justify-start items-center gap-2 inline-flex">
            <div className="w-6 h-6 relative">
              <input type="checkbox"
                {...register("fillCompanyInformation")}
                defaultChecked={true}
                className=" w-4 h-4" /></div>
            <div className="text-black text-base font-normal  leading-snug tracking-tight">Fill saved information from my profile</div>
          </div>
          <div className="flex-col justify-start  gap-7 flex">
            <div className="flex-col justify-start  gap-2 flex">
              <div className="text-slate-700 text-sm font-normal  leading-[16.80px] tracking-tight">Profile picture</div>
              <div className="justify-start  inline-flex">
                <div className="w-[120px] h-[120px] p-3 rounded-[120px] border border-indigo-300 flex-col justify-center items-center gap-2 inline-flex">
                  <div className="w-6 h-6 flex-col justify-center items-center flex"></div>
                  <div className="self-stretch justify-start  gap-5 inline-flex">
                    <div className="grow shrink basis-0 self-stretch justify-center items-center gap-1 flex">
                      <div className="grow shrink basis-0 text-center text-slate-400 text-xs font-normal  leading-[14.40px] tracking-tight">Formats: .png and .jpg</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[73px] flex-col justify-start  gap-2 flex">
              <div className="text-slate-700 text-sm font-normal  leading-[16.80px] tracking-tight">Full name</div>
              <input defaultValue={''}
                className='w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5'
                placeholder={"Please enter full name"}
                {...register("companyWebsite")} />
              {errors?.companyWebsite && <p className="font-normal text-xs text-red-500 absolute">{errors?.companyWebsite?.message}</p>}
            </div>
            <div className="h-[73px] flex-col justify-start  gap-2 flex">
              <div className="text-slate-700 text-sm font-normal  leading-[16.80px] tracking-tight">Designation</div>
              <input defaultValue={''}
                className='w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5'
                placeholder={"Please enter designation"}
                {...register("companyWebsite")} />
              {errors?.companyWebsite && <p className="font-normal text-xs text-red-500 absolute">{errors?.companyWebsite?.message}</p>}
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

export default Recruiter