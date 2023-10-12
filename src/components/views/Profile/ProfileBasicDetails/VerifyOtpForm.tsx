import React, { FC, Fragment, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';

type Parameters = {
  closeOtpDialog: () => void;
  mobileNumber: any
}
const VerifyOtpForm: FC<Parameters> = ({ closeOtpDialog, mobileNumber }) => {

  const [counter, setCounter] = useState(60);
  //react hook form controls
  const { control, formState: { errors }, handleSubmit, watch, setValue, getValues } = useForm()
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (counter > 0) {
        setCounter(counter - 1)
      } else {
        clearInterval(intervalId)
      }
    }, 1000)
    return () => clearInterval(intervalId);

  }, [counter])
  return (
    <Fragment>
      <h1 className="text-xl font-semibold mx-2">
        Verify mobile number
        <h2 className="mx-2 mt-1 text-xs text-gray-400">{`Enter the OTP sent to mobile number ${mobileNumber}`}</h2>
      </h1>
      <form className="mx-2" >
        <div className=" mt-12 ">
          <Controller
            name="mobileNumber"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                readOnly={false}
                type="text"
                value={watch("mobileNumber")}
                className="w-full border border-gray-300 outline-none rounded-xl focus:border-blue-500 px-2 py-2"
                placeholder="Enter OTP"
              />
            )}
          />    
          {counter > 0 ? <span className="text-xs text-gray-400"> {`Your OTP should arrive in ${counter} Seconds`}</span> :
            <div>
              <span className="text-xs text-gray-400"> Didn't receive an OTP?</span>
              <button className="text-sm text-blue-600 ml-1 font-medium"> Resend code</button>
            </div>
          }
          <div className="flex justify-end items-center mt-3 ">
              <button form="my-form" type="submit" className={watch("mobileNumber")?.length === 0 || watch("mobileNumber") === null ? " rounded-xl bg-blue-100 text-white justify-end" : "rounded-xl bg-blue-500 text-white px-5 py-1.5"} >
              Save</button>
          </div>
        </div>
      </form>

    </Fragment>
  )
}

export default VerifyOtpForm