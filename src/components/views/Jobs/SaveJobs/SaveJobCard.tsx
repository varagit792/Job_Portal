import Loader from '../../../commonComponents/Loader';
import NoRecords from '../../../commonComponents/NoRecords';
import ThreeDots from '../../../../assets/svg/threeDots.svg';
import BookMark from '../../../../assets/svg/bookMark.svg';
import MoneyIcon from '../../../../assets/svg/MoneyIcon.svg';
import ExperienceIcon from '../../../../assets/svg/ExperienceIcon.svg';
import LocationIcon from '../../../../assets/svg/LocationIcon.svg';
import compenyBrand from '../../../../assets/png/companyBrand.png';
import { formatDistanceToNow } from 'date-fns';

const SaveJobCard = ({ onClickJobCard, jobCard, loading }: any) => {
  return (
    <>
      {jobCard.length ? jobCard?.map((item: any) => (
        <div className="w-full py-5 px-5 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg mb-5 cursor-pointer"
          onClick={() => onClickJobCard(item.id)} key={item.id}>
          <div className="flex items-start justify-between">
            <div className="flex justify-start items-start h-full">
              <img src={compenyBrand} alt="compenyBrand" className="w-12" />
              <div className="ml-5">
                <h1 className="text-lg font-bold">{item?.title}</h1>
                <span className="text-[#94A3B8] text-sm">{item?.company?.title}</span>
              </div>
            </div>

          </div>
          <div className="flex my-5 justify-start items-center mb-5">
            {(item?.totalExpYearStart?.title && item?.totalExpYearEnd?.title) &&
              < div className=" flex justify-start items-center text-[#64748B] text-sm">
                <img src={ExperienceIcon} alt="ExperienceIcon" width="15rem" height="15rem" />
                <span className="ml-2 leading-none">{item?.totalExpYearStart?.title} - {item?.totalExpYearEnd?.title}</span>
              </div>
            }
            {item?.payScaleUpperRange?.title && item?.payScaleLowerRange?.title && item?.recurrence?.title && item?.numberSystem?.title && <div className=" flex justify-start items-center ml-5 text-[#64748B] text-sm">
              <img src={MoneyIcon} alt="MoneyIcon" width="15rem" height="15rem" /><span className="ml-2 leading-none">{item?.payScaleLowerRange?.title} {item?.numberSystem?.title} - {item?.payScaleUpperRange?.title} {item?.numberSystem?.title} {item?.recurrence?.title}</span>
            </div>}
            {item?.jobsLocation?.title && <div className=" flex justify-start items-center ml-5 text-[#64748B] text-sm">
              <img src={LocationIcon} alt="LocationIcon" width="15rem" height="15rem" /><span className="ml-2 leading-none">{item?.jobsLocation?.title}</span>
            </div>}
          </div>


        </div >
      )) : !loading && <NoRecords />}
      {loading && <Loader />}
    </>
  )
}

export default SaveJobCard;