import { useState, useEffect } from 'react';
import AutocompleteBox from '../../../commonComponents/AutocompleteBox';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const SignUpSchema = yup
    .object({
        profileSummary: yup.object().required(),
    })
    .required();

const PersonalDetailsForm = () => {

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm<any>({
        resolver: yupResolver(SignUpSchema)
    });

    const onSubmit = (data: any) => {
        console.log("data", data);
    }

    return (
        <div>
            <h1 className="text-black font-semibold text-xl mb-4">Personal details</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5">
                    <h6 className="font-semibold">Gender</h6>
                    <div className="flex flex-wrap">
                        <button className="border border-gray-500 px-3 py-1.5 rounded-3xl mr-2 mt-2">Single/unmarried</button>
                        <button className="border border-gray-500 px-3 py-1.5 rounded-3xl mr-2 mt-2">Married</button>
                        <button className="border border-gray-500 px-3 py-1.5 rounded-3xl mr-2 mt-2">Widowed</button>
                        <button className="border border-gray-500 px-3 py-1.5 rounded-3xl mr-2 mt-2">Divorced</button>
                        <button className="border border-gray-500 px-3 py-1.5 rounded-3xl mr-2 mt-2">Separated</button>
                        <button className="border border-gray-500 px-3 py-1.5 rounded-3xl mr-2 mt-2">Other</button>
                    </div>
                </div>
                <div className="mb-5">
                    <h6 className="font-semibold">Marital status</h6>
                    <div className="flex flex-wrap">
                        <button className="border border-gray-500 px-3 py-1.5 rounded-3xl mr-2 mt-2">Male</button>
                        <button className="border border-gray-500 px-3 py-1.5 rounded-3xl mr-2 mt-2">Female</button>
                        <button className="border border-gray-500 px-3 py-1.5 rounded-3xl mr-2 mt-2">Transgender</button>
                    </div>
                </div>
                <div className="mb-5">
                    <h6 className="mb-2 font-semibold">Date of birth</h6>
                    <div className="grid grid-cols-3 gap-4">
                        <select className="border border-gray-400 focus:border-blue-500 rounded-xl py-2 px-2">
                            <option>Select</option>
                        </select>
                        <select className="border border-gray-400 focus:border-blue-500 rounded-xl py-2 px-2">
                            <option>Select</option>
                        </select>
                        <select className="border border-gray-400 focus:border-blue-500 rounded-xl py-2 px-2">
                            <option>Select</option>
                        </select>
                    </div>
                </div>
                <div className="mb-5">
                    <h6 className="font-semibold">Category</h6>
                    <p className="text-gray-400">Companies welcome people from various categories to bring equality among all citizens</p>
                    <div className="flex flex-wrap">
                        <button className="border border-gray-500 px-3 py-1.5 rounded-3xl mr-2 mt-2">General</button>
                        <button className="border border-gray-500 px-3 py-1.5 rounded-3xl mr-2 mt-2">Scheduled Caste (SC)</button>
                        <button className="border border-gray-500 px-3 py-1.5 rounded-3xl mr-2 mt-2">Scheduled Tribe (ST)</button>
                        <button className="border border-gray-500 px-3 py-1.5 rounded-3xl mr-2 mt-2">OBC - Creamy</button>
                        <button className="border border-gray-500 px-3 py-1.5 rounded-3xl mr-2 mt-2">OBC - Non creamy</button>
                        <button className="border border-gray-500 px-3 py-1.5 rounded-3xl mr-2 mt-2">Other</button>
                    </div>
                </div>
                <div className="mb-5">
                    <h6 className="font-semibold mb-3">Are you differently abled?</h6>
                    <div className="flex justify-between w-1/3">
                        <div>
                            <input type="radio" name="abled" />
                            <label className="ml-1">Yes</label>
                        </div>
                        <div>
                            <input type="radio" name="abled" />
                            <label className="ml-1">No</label>
                        </div>
                    </div>
                </div>
                <div className="mb-5">
                    <h6 className="font-semibold mb-3">Have you taken a career break?</h6>
                    <div className="flex justify-between w-1/3">
                        <div>
                            <input type="radio" name="break" />
                            <label className="ml-1">Yes</label>
                        </div>
                        <div>
                            <input type="radio" name="break" />
                            <label className="ml-1">No</label>
                        </div>
                    </div>
                </div>
                <div className="mb-5">
                    <h6 className="font-semibold mb-3">Work permit for USA</h6>
                    <div className="">
                        {/* <AutocompleteBox
                            control={control}
                            fieldName={"department"}
                            dropdownData={department.map(({ id, title }: any) => ({ value: id, label: title }))}
                            handleChange={(data: any) => setSelectedDepartment(data?.value)}
                            defaultValue={selectedDepartment}
                            placeholder={"Select department"}
                        /> */}
                    </div>
                </div>
                <div className="mt-5 flex justify-end items-center">
                    <div>
                        <button
                            type="button"
                            className="mr-3"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-3xl bg-blue-500 text-white px-5 py-1.5"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PersonalDetailsForm;