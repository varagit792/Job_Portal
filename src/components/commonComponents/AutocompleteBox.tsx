import React, { useRef } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select'

const AutocompleteBox = ({ control, defaultValue, handleChange, fieldName, dropdownData = [], placeholder = "Please select...", isClearable = false, isMulti = false }: any) => {

  return (
    <>
      <Controller
        name={`${fieldName}`}
        control={control}
        render={({ field }) => (
          <Select
            // defaultValue={options[0]}
            {...field}
            isClearable={isClearable} // enable isClearable to demonstrate extra error handling
            isSearchable={true}
            isMulti={isMulti}
            className="text-sm"
            classNamePrefix="dropdown"
            options={dropdownData}
            defaultValue={defaultValue}
            placeholder={placeholder}

          />
        )}
      />
    </>
  )
}

export default AutocompleteBox