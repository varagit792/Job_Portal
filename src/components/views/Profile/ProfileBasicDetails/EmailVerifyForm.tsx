import { FC, Fragment, useEffect, useState } from 'react';
import verifyEmailIcon from '../../../../assets/svg/verifyEmailIcon.svg';
import { useDispatch } from 'react-redux';
import { clearVerifyEmailSlice, verifyEmail } from '../../../../store/reducers/user/verifyEmail';
import { useAppDispatch, useAppSelector } from '../../../..';
import { getUserData } from '../../../../store/reducers/user/getUserDetails';

type Parameters = {
  closeEmailVerifyDialog: () => void;
  email:string
}
const EmailVerifyForm: FC<Parameters> = ({ closeEmailVerifyDialog, email }) => {
  const dispatch = useAppDispatch()
  const {success} = useAppSelector((state)=>state.verifyUserEmail)
  
  const [buttonText, setButtonText] = useState('Request verification email');
  const handleSubmit = () => {
   
    const data = {
      email
    }
    dispatch(verifyEmail(data));
    setButtonText('Resend verification link')
  }

  useEffect(() => {
    if (success) {
      dispatch((clearVerifyEmailSlice()));
      dispatch(getUserData());
    }
  }, [success,dispatch]);

  return (
    <Fragment>
      <form id="id-form">
        <h1 className="flex items-center justify-center font-bold text-xl mt-2">To Verify your email - {email}</h1>
        <h4 className="flex items-center text-gray-500 font-normal justify-center text-sm">Verification is intended to confirm that the email entered in your resume is authentic</h4>
        <div className="flex items-center justify-center mt-5">
          <img src={verifyEmailIcon} alt="verifyIcon" width="64rem" height="64rem"  />
        </div>
        <div className="flex items-center justify-center mt-5">
          <button type="button" onClick={handleSubmit} className="bg-blue-700 text-white text-lg font-medium px-5 py-1.5 rounded-2xl">
            {buttonText}
          </button>
        </div>
        <h4 className="flex justify-center text-gray-400 text-sm mt-8">You will receive an email from Job portal in your mail account. Click on the link given in mail to verify</h4>
        <h4 className="flex justify-center text-gray-400 text-sm ">your email address.</h4>
        <hr className=" mt-5" />
        <h4 className="flex justify-center font-medium text-sm  mt-6">A verified Email ID helps your job search. Here's how:</h4>
        <h4 className="flex justify-center text-sm text-gray-400 mt-2">1. Recruiters prefer sending jobs as email only to candidates with verified Email ID
        </h4>
        <h4 className="flex justify-center text-sm text-gray-400">2. You now can apply to jobs in your inbox with just a single click. Know more
        </h4>
        <h4 className="flex justify-center text-sm text-gray-400 mb-4">3. By having a verified Email ID you can increase chances of the right job finding you
        </h4>
      </form>
    </Fragment>
  )
}

export default EmailVerifyForm;