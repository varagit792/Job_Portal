import React, { FC } from 'react'

type Parameters = {
  closeDialog: () => void;
}
const ProfileBasicDetailsForm:FC<Parameters> = ({closeDialog}) => {
  return (
    <div>
      <h1 className="text-xl font-semibold mr-6 ml-6">Basic details</h1>
      <br />
      <form action="" className="m-6">
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5 mt-1" />
      </div>
      </form>
    </div>
  )
}

export default ProfileBasicDetailsForm