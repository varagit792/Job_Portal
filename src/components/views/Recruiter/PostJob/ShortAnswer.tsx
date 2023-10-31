import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';


const ShortAnswer = () => {

  const {
    register,
    handleSubmit,

    control,
    watch,
    setValue,
    formState: { errors }
  } = useForm();
  return (
    <>
      <div className="col-span-full mb-4">
        <label htmlFor="percentage" className="block text-sm font-medium leading-6 text-gray-900">Type your question</label>
        <div className="mt-2">
          <Controller
            name="percentage"
            control={control}
            //defaultValue={userData?.name}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5 mt-1"
                readOnly={false}
                placeholder='Please type your question here'
              />
            )}
          />
          {errors.percentage && <p className="font-normal text-xs text-red-500">{errors.percentage.message as string}</p>}
        </div>
      </div>
    </>
  )
}

export default ShortAnswer