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
            isSearchable={true}
            className="text-sm"
            classNamePrefix="dropdown"
            options={dropdownData}
            defaultValue={defaultValue}
            value={defaultValue}
            placeholder={placeholder}

          />
        )}
      />
    </>
  )
}

export default AutocompleteBox