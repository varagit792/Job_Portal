import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useAppDispatch } from '../../../';
import { useAppSelector } from '../../../';
import { googleAuthSignUp } from '../../../store/reducers/googleAuth';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { signInUser, clearSignInSlice } from '../../../store/reducers/signIn';

interface IFormInputs {
  email: string;
  password: string;
}
const SignUpSchema = yup
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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { success, login } = useAppSelector((state) => state.login);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInputs>({
    resolver: yupResolver(SignUpSchema)
  });

  useEffect(() => {
    if (success) {
      navigate('/homePage');
      window.location.reload();
      dispatch(clearSignInSlice());
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
      <div className="h-[10%] w-full"></div>
      <div className="bg-zinc-100">
        <div className=" py-6 px-32 w-full ">
          <div className="grid grid-cols-3  rounded-xl shadow bg-gradient-to-r from-[#EEF2FF] to-[#C7D2FE]">
            <div className='h-full col-start-1 col-end-3'><img src='./loginBannerLatest.png' className='w-full rounded-l-lg' /></div>
            <div className="h-full">
              <div className="col-start-2 col-end-4 ">
                <div className="p-10 grid grid-cols-4">
                  <div className="text-4xl font-extrabold col-start-1 col-end-5 text-center">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-[#818CF8]">
                      Log In
                    </span>
                  </div>
                  <p className="col-start-1 col-end-5 py-6">Please enter your details to login in to your account</p>
                  <div className="col-start-1 col-end-5">
                    <p className="font-normal text-xs text-red-500">{loginState}</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">
                          Email
                        </label>
                        <input className="shadow-sm appearance-none border rounded-xl w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          type="email"
                          placeholder="Email Address"
                          {...register("email")}
                          required
                        />
                        {errors.email && <p className="font-normal text-xs text-red-500">{errors.email.message}</p>}
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">
                          Password
                        </label>
                        <input className="shadow-sm appearance-none border rounded-xl w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          type="password"
                          placeholder="Password"
                          {...register("password")}
                          required
                        />
                        {errors.password && <p className="font-normal text-xs text-red-500">{errors.password.message}</p>}
                      </div>
                      <button className={Object.keys(errors).length !== 0 ? "w-full bg-indigo-200 text-white font-bold px-3 py-2 rounded-xl" : "w-full  hover:bg-indigo-900 bg-indigo-500 text-white font-bold px-3 py-2 mb-5 rounded-xl"} type="submit">Sign In</button>
                      <div
                        className="my-1 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                        <p
                          className="mx-4 mb-2 text-center font-semibold dark:text-white">
                          or
                        </p>
                      </div>

                      <button type='button' className="w-full my-4 bg-transparent hover:bg-indigo-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded-xl" onClick={googleAuth}>Continue with Google</button>
                      Don't have an account? <Link to="/registration" className="rounded-lg py-2 font-bold hover:text-indigo-500">Sign up</Link>
                    </form>
                  </div>
                </div>
              </div>
            </div >
          </div>
        </div >
      </div >
    </>
  )
}

export default SignIn;