import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { registerUser, clearRegisterSlice } from '../../../store/reducers/register';
import { useAppDispatch } from '../../../';
import { useAppSelector } from '../../../';
import { googleAuthSignUp } from '../../../store/reducers/googleAuth';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import briefcase from '../../../assets/svg/briefcase.svg';
import schoolbag from '../../../assets/svg/schoolbag.svg';
import img from '../../../assets/png/signup_logo.png';
import backBtn from '../../../assets/svg/backButton.svg';
import experienced from '../../../assets/svg/experienced.svg';
import fresher from '../../../assets/svg/fresher.svg';

interface IFormInputs {
    name: string;
    email: string;
    password: string;
    mobileNumber: string;
    workStatus: boolean;
}

const SignUpSchema = yup
    .object({
        name: yup.string().label("Full Name").required(),
        email: yup.string().email().required().test(
            "Validate Email",
            (value) => {
                const re =
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return re.test(String(value).toLowerCase())
            },
        ),
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
        workStatus: yup.boolean().label("Work Status").required()
    })
    .required();

const SignUp = () => {
    const [isWithEmail, setIsWithEmail] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { success, errorMessage } = useAppSelector((state) => state.register);

    const {
        register,
        handleSubmit,
        control,
        watch,
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
            name: data?.name,
            password: data?.password,
            email: data?.email,
            mobileNumber: data?.mobileNumber,
            userType: "jobSeeker",
            workStatus: data?.workStatus,
        }));
        if (errorMessage) {
            alert(`Error occured ${errorMessage}`);
        }
    };

    const googleAuth = () => {
        googleAuthSignUp();
    }

    return (
        <>
            <div className="w-full h-screen grid grid-cols-12">
                <div className="h-full overflow-hidden col-start-1 col-end-8">
                    <img src={img} height="100%" width="100%" alt="signup logo" className="" />
                </div>
                <div className=" bg-[#F8FAFC] h-full py-10 px-20 grid grid-cols-1 gap-5 col-start-8 col-end-13">
                    {isWithEmail ? <>
                        <div className=" flex justify-center items-center relative">
                        <button className="absolute left-0 top-1/2 -translate-y-1/2 font-bold text-base text-[#0F172A] flex items-center justify-start cursor-pointer" onClick={() => setIsWithEmail(false)}>
                            <img src={backBtn} alt="backButton" className="mr-4" />
                            <span className=" leading-none">
                                Back
                            </span>
                        </button>
                        <h1 className="font-bold text-2xl text-[#0F172A]">Sign up</h1>
                    </div>
                        <div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid grid-cols-1 gap-5">
                                    <div className="grid grid-cols-1 gap-5">
                                        <div>
                                            <label className="block text-sm font-semibold mb-2">
                                                Full name
                                            </label>
                                            <input className="shadow-sm appearance-none border rounded-xl w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                type="text"
                                                placeholder="What is your name?"
                                                {...register("name")}
                                                required
                                            />
                                            {errors?.name && <p className="font-normal text-xs text-red-500">{errors?.name?.message}</p>}
                                        </div>
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
                                            {!errors?.email && <span className="font-normal text-xs text-gray-500">We'll send you relevant jobs in your mail</span>}
                                        </div>
                                        <div className="grid grid-cols-2 gap-5">
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
                                            <div className="">
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
                                                {errors?.mobileNumber && <p className="font-normal text-xs text-red-500">{errors?.mobileNumber?.message}</p>}
                                                {!errors?.mobileNumber && <span className="font-normal text-xs text-gray-500">Recruiters will call on this number</span>}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="block text-sm font-semibold mb-2">
                                                Work status
                                            </span>
                                            <div className="grid grid-cols-2 gap-10">
                                                <Controller
                                                    name="workStatus"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <button
                                                            type="button"
                                                            className={watch("workStatus") ? "border-2 border-gray-300 bg-gray-300 flex flex-col justify-center items-start p-5 rounded-lg" : "border-2 border-gray-300 flex flex-col justify-center items-start p-5 rounded-lg hover:bg-gray-300"}
                                                            onClick={() => field.onChange(true)}
                                                        >
                                                            <span>
                                                                <span className="text-left m-0 block mb-4   ">Experienced</span>
                                                            </span>
                                                            <img
                                                                src={experienced}
                                                                alt="experienced"
                                                                //width="25.2px"
                                                                //height="28px"
                                                                className=" h-7 w-[25.2]"
                                                            />
                                                        </button>
                                                    )}
                                                    rules={{ required: true }}
                                                />
                                                <Controller
                                                    name="workStatus"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <button
                                                            type="button"
                                                            className={watch("workStatus") === undefined || watch("workStatus") === true ? "border-2 border-gray-300 flex flex-col justify-center items-start p-5 rounded-lg hover:bg-gray-300" : "border-2 border-gray-300 flex flex-col justify-center items-start p-5 rounded-lg bg-gray-300"}
                                                            onClick={() => field.onChange(false)}
                                                        >
                                                            <span>
                                                                <span className="text-left m-0 block mb-4">Fresher</span>
                                                            </span>
                                                            <img
                                                                src={fresher}
                                                                alt="fresher"
                                                                //width="50px"
                                                                //height="50px"
                                                                className=" h-7 w-[25.2]"
                                                            />
                                                        </button>
                                                    )}
                                                    rules={{ required: true }}
                                                />
                                            </div>
                                            {errors?.workStatus && <p className="font-normal text-xs text-red-500">{errors?.workStatus?.message}</p>}
                                        </div>
                                    </div>
                                    <div>
                                        <button className="bg-indigo-600 text-white font-bold px-3 py-2 rounded-lg w-full" type="submit">Register now</button>
                                        <div className="flex justify-center items-center text-sm">
                                            <span className=" text-[#94A3B8] mr-1">
                                                Already have an account?
                                            </span>
                                            <Link to='/login' className=" underline"> Login</Link>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </>
                        :
                        <div className="flex flex-col">
                            <div className=" flex justify-center items-center relative mb-20">
                        <Link to="/" className="absolute left-0 top-1/2 -translate-y-1/2 font-bold text-base text-[#0F172A] flex items-center justify-start cursor-pointer">
                            <img src={backBtn} alt="backButton" className="mr-4" />
                            <span className=" leading-none">
                                Home
                            </span>
                        </Link>
                        <h1 className="font-bold text-2xl text-[#0F172A]">Sign up</h1>
                    </div>
                            <div className=" grid grid-cols-1 gap-5">
                                <div>
                                <button className=" bg-white flex justify-center items-center drop-shadow-lg rounded-lg w-full h-14"
                                    onClick={googleAuth}
                                >
                                    <FcGoogle size={20} />
                                    <span className="ml-1">Sign up with Google</span>
                                </button>
                                </div>
                                <div className="flex justify-between items-center">
                                <hr className=" w-2/5"/>
                                <span className=" py-3">OR</span>
                                <hr className=" w-2/5"/>
                                </div>
                                <div>
                                <button className=" bg-[#4F46E5] flex justify-center items-center drop-shadow-lg rounded-lg w-full h-14"
                                    onClick={() => setIsWithEmail(true)}
                                >                                    
                                    <span className="ml-1 text-white">Continue with email</span>
                                    </button>
                                    <div className="flex justify-center items-center text-sm">
                                            <span className=" text-[#94A3B8] mr-1">
                                                Already have an account?
                                            </span>
                                            <Link to='/login' className=" underline"> Login</Link>
                                        </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default SignUp;