import LocationIcon from '../../../../assets/svg/LocationIcon.svg';
import companyBrand from '../../../../assets/png/companyBrand.png';
import ThreeDots from '../../../../assets/svg/threeDots.svg';
import BookMark from '../../../../assets/svg/bookMark.svg';
import ExperienceIcon from '../../../../assets/svg/ExperienceIcon.svg';
import Money from '../../../../assets/svg/Money.svg';
import { FiEdit2 } from "react-icons/fi";
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const RecentJobItems = ({ item }: any) => {
    const navigate = useNavigate();
    return (
        <div className="p-5 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg mr-4 mb-5 cursor-pointer">
            <h1 className="text-base font-bold">{item?.title}</h1>
            <h2 className="text-[#94A3B8] text-xs text-ellipsis w-56 overflow-hidden whitespace-nowrap">{formatDistanceToNow(new Date(item?.createdAt), { addSuffix: true })}</h2>
            <hr className="my-5" />
            <div className="mb-3 text-[#475569] text-xs flex justify-start items-center">
                <img src={ExperienceIcon} alt="ExperienceIcon" width="15rem" height="15rem" />
                <span className="ml-2">{ item?.totalExpYearEnd?.title } exp.</span>
            </div>
            <div className="mb-3 text-[#475569] text-xs flex justify-start items-center">
                <img src={Money} alt="Money" width="15rem" height="15rem" />
                <span className="ml-2">{ item?.payScaleUpperRange?.title} LPA</span>
            </div>
            <div className="mb-3 text-[#475569] text-xs flex justify-start items-center">
                <img src={LocationIcon} alt="LocationIcon" width="15rem" height="15rem" />
                {/* <span className="ml-2">Hyderabad</span> */}
                {
                    item?.jobsLocation?.map((loc:any) => <span className="ml-2">{ loc?.location?.title}, </span>)
                }
            </div>
            <div className="flex justify-between items-center">
                <div className="flex justify-start items-center">
                    <button className="bg-[#FFFAF2] text-sm text-[#EA580C] px-2 py-1 rounded-lg">{item?.employmentType?.title}</button>
                    <button className="bg-[#F0FFF5] text-sm text-[#16A34A] px-2 py-1 rounded-lg ml-2">{ item?.workMode?.title}</button>
                </div>
                <div className="flex justify-start items-center">
                    <button className="text-gray-500">
                        <FiEdit2 onClick={() => navigate(`/postJob/jobDetails/${item?.id}`)}/>
                    </button>
                    <button className="ml-2 text-gray-500">
                        <img src={ThreeDots} alt="ThreeDots" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RecentJobItems