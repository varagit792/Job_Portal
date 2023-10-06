import React from 'react'
import LocationIcon from '../../assets/svg/LocationIcon.svg';
import companyBrand from '../../assets/png/companyBrand.png';
import StarIcon from '../../assets/svg/starIcon.svg';

const CompanyListItem = ({ item }: any) => {
  return (
    <div className="p-5 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg mr-3 mb-5">
      <div className="flex items-start justify-between mb-3">
        <img src={companyBrand} alt="companyBrand" />
        <button className="px-3 py-2 bg-gray-200 rounded-md text-xs">
          {item?.jobs} Jobs
        </button>
      </div>
      <h1 className="text-base font-bold mb-1">{item?.title}</h1>
      <div className="text-[#475569] text-xs flex justify-start items-center">
        <img src={LocationIcon} alt="LocationIcon" width="15rem" height="15rem" />
        <div className="ml-2 overflow-hidden inline-block whitespace-nowrap text-ellipsis">
          {item?.location?.map((loc: any) => <span>{loc?.title}, </span>)}
          </div>
      </div>
      <hr className="my-4" />
      <div className="flex justify-start items-center text-xs">
        <div className="flex justify-start items-center">
          <img src={StarIcon} alt="StarIcon" width="15rem" height="15rem" />
          <span className="ml-1">{item?.rating}</span>
        </div>
        <span className="border border-gray-300 h-5 mx-2"></span>
        <span className="text-[#64748B]">{item?.reviews} Reviews</span>
      </div>
    </div>

  )
}

export default CompanyListItem