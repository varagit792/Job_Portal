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
  const { success } = useAppSelector((state) => state.login);
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
      <div className="bg-zinc-100 font-sans">
        <div className="px-40 py-14 flex justify-center">
          <div className="h-full w-10/12">
            <div className="col-start-2 col-end-4">
              <div className="bg-white rounded-xl shadow p-10 grid grid-cols-4">
                <h1 className="font-semibold text-xl mb-5 col-start-1 col-end-5"> Login</h1>
                <div className="col-start-1 col-end-4">
                  <p className="font-normal text-xs text-red-500">{loginState}</p>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                      <label className="block text-sm font-semibold mb-2">
                        Email ID
                      </label>
                      <input className="shadow-sm appearance-none border rounded-xl w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="email"
                        placeholder=""
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
                        placeholder=""
                        {...register("password")}
                        required
                      />
                      {errors.password && <p className="font-normal text-xs text-red-500">{errors.password.message}</p>}
                    </div>
                    <button className={Object.keys(errors).length !== 0 ? "bg-indigo-200 text-white font-bold px-3 py-2 rounded-3xl" : "bg-indigo-600 text-white font-bold px-3 py-2 rounded-3xl"} type="submit">Sign In</button>
                    <Link to="/registration" className="rounded-lg  py-2 px-3 ml-5">Create account</Link>
                  </form>
                </div>
                <div>
                  <div className="grid grid-cols-4 h-1/3">
                    <div className="flex justify-center items-center flex-col">
                      <div className="h-20 border border-gray-300"></div>
                      <p className="font-light text-gray-400">Or</p>
                      <div className="h-20 border border-gray-300"></div>
                    </div>
                    <div className="col-start-2 col-end-5 flex justify-center items-start flex-col">
                      <p className="text-sm font-bold mb-1">Continue with</p>
                      <button className="flex justify-center items-center border-2 border-blue-300 rounded-3xl px-2 py-1"
                        onClick={googleAuth}
                      >
                        <FcGoogle size={20} />
                        <span className="ml-1">Google</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div >
        </div >
      </div >
    </>
  )
}

export default SignIn;