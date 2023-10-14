import React, { FC, Fragment, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../..';
import { clearSendUserOtpSlice, sendUserOtp } from '../../../../store/reducers/user/sendUserOtp';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { verifyMobileOtp, clearVerifyMobileOtpSlice } from '../../../../store/reducers/user/verifyMobileOtp';
import { getUserData } from '../../../../store/reducers/user/getUserDetails';


type Parameters = {
  closeOtpDialog: () => void;
  mobileNumber: any
}

interface IFormInputs {
  mobileOtp: string
}
const digitsOnly = (value: string) => /^\d+$/.test(value);

const verifySchema = yup.object({
  mobileOtp: yup.string().required()
    .test('len', 'Otp should be of 6 digits',
    (data) => {
      if (data.length !== 6 ) {
        return false;
      } else {
        return true;
      }
    }).test('Digits Only',' Otp should be digits only',digitsOnly)
});

const VerifyOtpForm: FC<Parameters> = ({ closeOtpDialog, mobileNumber }) => {

  const [counter, setCounter] = useState(60);
  const dispatch = useAppDispatch();
  const { success: successSendOtp, userData } = useAppSelector((state) => state.jobSeekerSendOtp);
  const { success: successVerifyOtp,errorMessage } = useAppSelector((state) => state.jobSeekerVerifyMobile);

  useEffect(() => {
    dispatch(sendUserOtp());
    if (successSendOtp) {
      dispatch(clearSendUserOtpSlice());
    }
  }, [dispatch, successSendOtp]);

  useEffect(() => {
    dispatch(sendUserOtp());
  }, [dispatch]);

  useEffect(() => {
    if (successVerifyOtp) {
      dispatch(clearVerifyMobileOtpSlice());
      dispatch(getUserData());
      closeOtpDialog();
    }
  }, [dispatch, successVerifyOtp])

  //react hook form controls
  const { control, formState: { errors }, handleSubmit, watch, setValue, getValues } = useForm<IFormInputs>({
    resolver: yupResolver(verifySchema)
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (counter > 0) {
        setCounter(counter - 1);
      } else {
        clearInterval(intervalId);
      }
    }, 1000)
    return () => clearInterval(intervalId);

  }, [counter]);

  const onSubmit = (data: IFormInputs) => {
    dispatch(verifyMobileOtp(data));
  };

  const handleResendOtp = (event: any) => {
    // event.preventDefault();
    dispatch(sendUserOtp());
    setCounter(60);
  };

  useEffect(() => {
    setValue('mobileOtp', '');
    
  },[setValue])
  const watchMobileOtp = watch('mobileOtp')?.length;
  console.log('watch mobile ', watchMobileOtp);

  return (
    <Fragment>
      <h1 className="text-xl font-semibold mx-2">
        Verify mobile number
        <h2 className="mx-2 mt-1 text-xs text-gray-400">{`Enter the OTP sent to mobile number ${mobileNumber}`}</h2>
      </h1>
      <form className="mx-2" id="my-form" onSubmit={handleSubmit(onSubmit)}>
        <div className=" mt-12 ">
          <Controller
            name="mobileOtp"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                readOnly={false}
                type="text"
                value={watch("mobileOtp")}
                className="w-full border border-gray-300 outline-none rounded-xl focus:border-blue-500 px-2 py-2"
                placeholder="Enter OTP"
              />
            )}
          />
          {errors.mobileOtp && <p className="font-normal text-xs text-red-500">{errors.mobileOtp.message}</p>}
          {counter > 0 ? <span className="text-xs text-gray-400"> {`Your OTP should arrive in ${counter} Seconds`}</span> :
            <div>
              <span className="text-xs text-gray-400"> Didn't receive an OTP?</span>
              <button className="text-sm text-blue-600 ml-1 font-medium" onClick={handleResendOtp}> Resend code</button>
            </div>
          }
          <div className="flex justify-end items-center mt-3 ">
            <button form="my-form" type="submit" className={watch("mobileOtp")?.length === 0 || watch("mobileOtp") === null ? " rounded-xl bg-blue-100 text-white justify-end px-5 py-1.5" : "rounded-xl bg-blue-500 text-white px-5 py-1.5"}
              disabled={watch("mobileOtp")?.length === 0 || watch("mobileOtp") === null}
            >
              Save</button>
          </div>
        </div>
      </form>

    </Fragment>
  )
}

export default VerifyOtpForm