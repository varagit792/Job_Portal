import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { registerUser, clearRegisterSlice } from '../../../store/reducers/register';
import { useAppDispatch } from '../../../';
import { useAppSelector } from '../../../';
import { googleAuthSignUp } from '../../../store/reducers/googleAuth';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import briefcase from '../../../assets/svg/briefcase.svg';
import schoolbag from '../../../assets/svg/schoolbag.svg';

interface IFormInputs {
    name: string;
    email: string;
    password: string;
    mobileNumber: string;
}

const SignUpSchema = yup
    .object({
        name: yup.string().label("Full Name").required(),
        email: yup.string().email().required(),
        password: yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters long')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
            ),
        mobileNumber: yup.string()
            .required('Mobile number is required')
            .matches(/^[0-9]{10}$/, 'Mobile number must be a valid 10-digit number'),
    })
    .required();

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { success } = useAppSelector((state) => state.register);
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
            dispatch(clearRegisterSlice());
        }
    }, [success, navigate, dispatch])

    const onSubmit = (data: IFormInputs) => {
        dispatch(registerUser({
            name: data.name,
            password: data.password,
            email: data.email,
            mobileNumber: data.mobileNumber,
            userType: "jobSeeker",
            workStatus: false,
        }));
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
                                <h1 className="font-semibold text-xl mb-5 col-start-1 col-end-5"> Find a job & grow your career</h1>
                                <div className="col-start-1 col-end-4">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="mb-4">
                                            <label className="block text-sm font-semibold mb-2">
                                                Full name
                                            </label>
                                            <input className="shadow-sm appearance-none border rounded-xl w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                type="text"
                                                placeholder="What is your name?"
                                                {...register("name")}
                                                required
                                            />
                                            {errors.name && <p className="font-normal text-xs text-red-500">{errors.name.message}</p>}
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-semibold mb-2">
                                                Email ID
                                            </label>
                                            <input className="shadow-sm appearance-none border rounded-xl w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                type="email"
                                                placeholder="Tell us your Email ID"
                                                {...register("email")}
                                                required
                                            />
                                            {errors.email && <p className="font-normal text-xs text-red-500">{errors.email.message}</p>}
                                            {!errors.email && <span className="font-normal text-xs text-gray-500">We'll send you relevant jobs in your mail</span>}
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-semibold mb-2">
                                                Password
                                            </label>
                                            <input className="shadow-sm appearance-none border rounded-xl w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                type="password"
                                                placeholder="Create a password for your account"
                                                {...register("password")}
                                                required
                                            />
                                            {errors.password && <p className="font-normal text-xs text-red-500">{errors.password.message}</p>}
                                            {!errors.password && <span className="font-normal text-xs text-gray-500">Minimum 6 characters required</span>}
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-semibold mb-2">
                                                Mobile number
                                            </label>
                                            <div className="relative">
                                                <input className="shadow-sm appearance-none border rounded-xl w-full py-3 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    type="number"
                                                    placeholder="Mobile Number"
                                                    {...register("mobileNumber")}
                                                    required
                                                />
                                                <span className="absolute top-3 left-1">+91</span>
                                            </div>
                                            {errors.mobileNumber && <p className="font-normal text-xs text-red-500">{errors.mobileNumber.message}</p>}
                                            {!errors.email && <span className="font-normal text-xs text-gray-500">Recruiters will call on this number</span>}
                                        </div>
                                        <div className="mb-4">
                                            <span className="block text-sm font-semibold mb-2">
                                                Work status
                                            </span>
                                            <div className="grid grid-cols-2 gap-10">
                                                <button className="border-2 border-gray-300 flex justify-center items-center px-3 py-3 rounded-2xl hover:bg-gray-300">
                                                    <span>
                                                        <span className="text-left m-0 block">I'm experienced</span>
                                                        <span className="break-words text-left m-0 block">I have work experience (excluding internships)</span>
                                                    </span>
                                                    <img
                                                        src={briefcase}
                                                        alt="briefcase"
                                                        width="50px"
                                                        height="50px"
                                                    />
                                                </button>
                                                <button className="border-2 border-gray-300 flex justify-center items-center px-3 py-3 rounded-2xl hover:bg-gray-300">
                                                    <span>
                                                        <span className="text-left m-0 block">I'm a fresher</span>
                                                        <span className="break-words text-left m-0 block">I am a student/ Haven't worked after graduation</span>
                                                    </span>
                                                    <img
                                                        src={schoolbag}
                                                        alt="schoolbag"
                                                        width="50px"
                                                        height="50px"
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                        <button className={Object.keys(errors).length !== 0 ? "bg-indigo-200 text-white font-bold px-3 py-2 rounded-3xl" : "bg-indigo-600 text-white font-bold px-3 py-2 rounded-3xl"} type="submit">Register now</button>
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

export default SignUp;