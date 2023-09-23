import { useEffect, type FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useAppDispatch } from '../../../../';
import { profileDashboardUpdate } from '../../../../store/reducers/jobSeekerProfile/profileDashboardUpdate';

interface IFormInputs {
    about: string | null
}

type Parameters = {
    testAbout: string,
    id: number,
    defaultAbout: string,
    closeDialog: () => void
}

const SignUpSchema = yup
    .object({
        about: yup.string().label("Profile summary").required().test(
            'len', 'Minimum 50 characters are required',
            (data) => {
                if (data.length < 50) {
                    return false
                } else {
                    return true
                }
            }
        ).nullable(),
    })
    .required();

const AboutForm: FC<Parameters> = ({ testAbout, id, defaultAbout, closeDialog }) => {
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm<IFormInputs>({
        resolver: yupResolver(SignUpSchema)
    });

    useEffect(() => {
        setValue('about', defaultAbout);
    }, [setValue, defaultAbout]);

    const onSubmit = (data: IFormInputs) => {
        dispatch(profileDashboardUpdate({ id, about: data.about }));
    }

    const handleDelete = () => {
        dispatch(profileDashboardUpdate({ id, about: null }));
    }

    const watchAbout = watch('about')?.length;

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between mb-3">
                <h1 className="text-lg font-medium text-gray-900">About</h1>
                <div>
                    {
                        defaultAbout
                        &&
                        <button className="text-blue-700 font-semibold hover:underline"
                            onClick={handleDelete}>
                            Delete
                        </button>
                    }
                </div>
            </div>
            <span className="text-sm text-gray-500 mb-3">
                {testAbout}
            </span>
            <form id="my-form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div>
                    <textarea
                        id="message"
                        maxLength={150}
                        className="block p-2.5 w-full text-sm text-black bg-gray-50 rounded-lg border border-gray-300 focus:border-blue-500 outline-none"
                        placeholder="Type here..."
                        {...register("about")}
                        rows={4}
                    ></textarea>
                    {
                        errors?.about
                        &&
                        <p className="font-normal text-xs text-red-500 absolute">
                            {errors?.about?.message}
                        </p>
                    }
                    <div className="text-xs font-light text-gray-600 text-right">
                        {watchAbout ? 150 - watchAbout : 150} character(s) left
                    </div>
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
                            form='my-form' type="submit"
                            className={watchAbout === 0 || watch('about') === null ? "rounded-3xl bg-blue-100 text-white px-5 py-1.5" : "rounded-3xl bg-blue-500 text-white px-5 py-1.5"}
                            disabled={watchAbout === 0 || watch('about') === null}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AboutForm;