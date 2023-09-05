import React, { useRef } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select'

const AutocompleteBox = ({ control, isMulti = false, defaultValue, handleChange, fieldName, dropdownData = [], placeholder = "Please select..." }: any) => {
  if (!defaultValue) {
    var defaultValueSet = isMulti ? [] : '';
  } else {
    defaultValueSet = defaultValue;
  }
  if (!isMulti) {
    var values = dropdownData.filter(function (option: any) {
      return option.value === defaultValue;
    })
  }
  if (isMulti) {
     values = [""]
  }

  return (
    <>
      <Controller
        name={fieldName}
        control={control}
        render={({ field }) => {
          return (
            <Select
              {...field}
              isMulti={isMulti}
              className='text-sm'
              defaultValue={defaultValueSet} // This should be like [val1,val2]
              onChange={handleChange}
              options={dropdownData}
              value={values}
              placeholder={placeholder}
            />
          )
        }}
      />
    </>
  )
}

export default AutocompleteBox