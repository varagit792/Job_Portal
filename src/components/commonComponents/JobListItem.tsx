import LocationIcon from '../../assets/svg/LocationIcon.svg';
import companyBrand from '../../assets/png/companyBrand.png';
import ThreeDots from '../../assets/svg/threeDots.svg';
import BookMark from '../../assets/svg/bookMark.svg';
import MoneyIcon from '../../assets/svg/MoneyIcon.svg';
import ExperienceIcon from '../../assets/svg/ExperienceIcon.svg';
import { Fragment } from 'react';

const JobListItem = ({ jobItem , onClickJobItem}: any) => {
  
  return (
    <div className="p-5 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg mr-4 mb-5 cursor-pointer" key={jobItem.id} onClick={()=>onClickJobItem(jobItem.id)}>
      <div className="flex items-start justify-between mb-3">
        <img src={companyBrand} alt="companyBrand" />
        <div>
          <button className="p-2">
            <img src={BookMark} alt="BookMark" />
          </button>
          <button className="p-2">
            <img src={ThreeDots} alt="ThreeDots" />
          </button>
        </div>
      </div>
      <h1 className="text-base font-bold">{jobItem?.title}</h1>
      <span className="text-[#94A3B8] text-sm">{jobItem?.company?.title}</span>
      <hr className="my-5" />
      <div className="mb-3 text-[#475569] text-xs flex justify-start items-center">
        <img src={ExperienceIcon} alt="ExperienceIcon" width="15rem" height="15rem" />
        {jobItem?.totalExpYearStart?.title ? <div>
          <span className="ml-2">{jobItem?.totalExpYearStart?.title} -</span>
          <span className="ml-1">{jobItem?.totalExpYearEnd?.title}</span>
        </div> : <span className="ml-2">{jobItem?.totalExpYearEnd?.title}</span>}
      </div>
      {!jobItem?.hideSalaryDetails && <div className="mb-3 text-[#475569] text-xs flex justify-start items-center">
        <img src={MoneyIcon} alt="MoneyIcon" width="15rem" height="15rem" /><span className="ml-2">{
          jobItem?.payScaleLowerRange?.title[0] ? <Fragment>
            <span>{jobItem?.payScaleLowerRange?.title[0]} -</span>
            <span className="ml-1">{jobItem?.payScaleUpperRange?.title[0]}</span>
          </Fragment> : <span className="ml-1"> {jobItem?.payScaleUpperRange?.title[0]} </span>} LPA</span>
      </div>}
      <div className="mb-5 text-[#475569] text-xs flex justify-start items-center">
        <img src={LocationIcon} alt="LocationIcon" width="15rem" height="15rem" />
        {jobItem?.jobsLocation?.map((jobLocation:any) =>
          <span className="ml-2">{ jobLocation?.location?.title}</span>)}
      </div>
      <div className="flex">
        {<span className="bg-[#FFFAF2] text-[#EA580C] px-3 py-2 rounded-lg mr-2 text-sm">{jobItem?.workMode?.title }</span>}
        <span className="bg-[#F0FFF5] text-[#16A34A] px-3 py-2 rounded-lg text-sm">{jobItem?.employmentType?.title}</span>
      </div>
    </div>
  )
}

export default JobListItem