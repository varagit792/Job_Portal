import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { registerUser, clearRegisterSlice } from '../../../store/reducers/register';
import { useAppDispatch } from '../../..';
import { useAppSelector } from '../../..';
import { googleAuthSignUp } from '../../../store/reducers/googleAuth';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import img from '../../../assets/png/signup_logo.png';
import backBtn from '../../../assets/svg/backButton.svg';
import experienced from '../../../assets/svg/experienced.svg';
import fresher from '../../../assets/svg/fresher.svg';
import Cookies from 'js-cookie';
import { getCompanyList } from '../../utils/utils';
import Select from 'react-select';
import { filterArray } from '../../utils/filterArray';
import { clearSignInSlice, signInUser } from '../../../store/reducers/signIn';

interface IFormInputs {
  email: string;
  password: string;
}

const SignInSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
    ),
  })
  .required();

const SignIn = () => {
  const [loginState, setLoginState] = useState('');
  const [isContinueWithEmail, setIsContinueWithEmail] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { success, login } = useAppSelector((state) => state.login);
  
  const userType = Cookies.get("userType");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    formState: { errors }
  } = useForm<IFormInputs>({
    resolver: yupResolver(SignInSchema)
  });

  useEffect(() => {
    if (success) {
      dispatch(clearSignInSlice());
      if (userType === 'jobSeeker')
        navigate('/homePage');
      if (userType === 'employer')
        navigate('/employerDashboard');
    }
  }, [success, navigate, dispatch]);

  const onSubmit = async (data: IFormInputs) => {
    const res = await dispatch(signInUser({
      password: data.password,
      email: data.email,
    }))
    if (!res.payload) {
      setLoginState("Email address or password is incorrect");
    }
  };

  const googleAuth = () => {
    googleAuthSignUp();
  }
  return (
    <>
      <div className="w-full h-screen grid grid-cols-12">
        <div className="overflow-hidden col-start-1 col-end-8">
          <img src={img} height="100%" width="100%" alt="signUp logo" />
        </div>
        <div className="bg-[#F8FAFC] h-full px-20 grid grid-cols-1 gap-3 col-start-8 col-end-13">
          <div>
            <div className="flex justify-center items-center py-8 relative">
              {!isContinueWithEmail && <Link to="/" className="absolute left-0 top-1/2 -translate-y-1/2 font-bold text-base text-[#0F172A] flex items-center justify-start cursor-pointer">
                <img src={backBtn} alt="backButton" className="mr-4" />
                <span className=" leading-none">
                  Home
                </span>
              </Link>}
              {isContinueWithEmail && <div onClick={() => setIsContinueWithEmail(false)} className="absolute left-0 top-1/2 -translate-y-1/2 font-bold text-base text-[#0F172A] flex items-center justify-start cursor-pointer">
                <img src={backBtn} alt="backButton" className="mr-4" />
                <span className=" leading-none">
                  Back
                </span>
              </div>}
              <h1 className="font-bold text-2xl text-[#0F172A]">Log In</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-5">
                
                {isContinueWithEmail && (<>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Email
                    </label>
                    <input className="shadow-sm appearance-none border rounded-xl w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="email"
                      placeholder="Tell us your Email ID"
                      {...register("email")}
                      required
                    />
                    {errors?.email && <p className="font-normal text-xs text-red-500">{errors?.email?.message}</p>}
                    {/* {!errors?.email && <span className="font-normal text-xs text-gray-500">We'll send you relevant jobs in your mail</span>} */}
                  </div>
                  <div className="">
                    <label className="block text-sm font-semibold mb-2">
                      Password
                    </label>
                    <input className="shadow-sm appearance-none border rounded-xl w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="password"
                      placeholder="Create a password for your account"
                      {...register("password")}
                      required
                    />
                    {errors?.password && <p className="font-normal text-xs text-red-500">{errors?.password?.message}</p>}
                    {!errors?.password && <span className="font-normal text-xs text-gray-500">Minimum 6 characters required</span>}
                  </div>
                </>)}

                {isContinueWithEmail && <div>
                  <button className="bg-indigo-600 text-white font-bold px-3 py-2 rounded-lg w-full" type="submit">Log In</button>
                  <div className="flex justify-center items-center text-sm">
                    <span className=" text-[#94A3B8] mr-1">
                      Don't have an account?
                    </span>
                    <Link to='/registration' className=" underline font-semibold "> Sign Up</Link>
                  </div>
                </div>}
              </div>
            </form>
            {
              !isContinueWithEmail && <div className="grid grid-cols-1 mt-10 gap-5">
                <div className="text-sm font-semibold flex flex-col gap-2 justify-center">

                  <div className=" grid grid-cols-1 gap-5">
                    <div>
                      <button className=" bg-white flex justify-center items-center drop-shadow-lg rounded-lg w-full h-14"
                        onClick={googleAuth}
                      >
                        <FcGoogle size={20} />
                        <span className="ml-1">Log in with Google</span>
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <hr className=" w-2/5" />
                      <span className=" py-3">OR</span>
                      <hr className=" w-2/5" />
                    </div>
                    <div>
                      <button className="bg-indigo-600 text-white font-bold px-3 py-2 rounded-lg w-full" type="button" onClick={() => setIsContinueWithEmail(true)}>Continue with email</button>
                      <div className="flex justify-center items-center text-sm">
                        <span className=" text-[#94A3B8] mr-1">
                          Don't have an account?
                        </span>
                        <Link to='/registration' className=" underline"> Sign Up</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>}
          </div>
        </div >
      </div >
    </>
  )
}

export default SignIn;