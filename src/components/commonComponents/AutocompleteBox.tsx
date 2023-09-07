import React, { useRef } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select'

const AutocompleteBox = ({ control, defaultValue, handleChange, fieldName, dropdownData = [], placeholder = "Please select..." }: any) => {

  return (
    <>

      <Controller
        name={`${fieldName}`}
        control={control}
        render={({ field }) => (
          <Select
            // defaultValue={options[0]}
            {...field}
            isClearable // enable isClearable to demonstrate extra error handling
            isSearchable={false}
            className="text-sm"
            classNamePrefix="dropdown"
            options={dropdownData}
            value={defaultValue}

          />
        )}
      />
      {/* <Controller
        name={fieldName}
        control={control}
        render={({ field }) => {
          return (
            <Select
              {...field}
              isClearable
              isSearchable={false}
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
      /> */}
    </>
  )
}

export default AutocompleteBox