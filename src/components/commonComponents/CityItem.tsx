import React from 'react'
import ArrowRight from '../../assets/svg/ArrowRight.svg';

const CityItem = ({ city, numberOfJob }: any) => {
  return (
    <div className="p-4 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg flex flex-col justify-center items-start">
      <div className="flex justify-between items-center mb-3 text-sm font-semibold w-full">
        <span>{city}, India</span>
        <button><img src={ArrowRight} alt="ArrowRight" width="8rem" height="8rem" /></button>
      </div>
      <button className="px-2 py-1 bg-gray-200 rounded-md text-xs">
        {numberOfJob} jobs
      </button>
    </div>
  )
}

export default CityItem