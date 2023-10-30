import LocationIcon from '../../../../assets/svg/LocationIcon.svg';
import companyBrand from '../../../../assets/png/companyBrand.png';
import ThreeDots from '../../../../assets/svg/threeDots.svg';
import BookMark from '../../../../assets/svg/bookMark.svg';
import ExperienceIcon from '../../../../assets/svg/ExperienceIcon.svg';
import Money from '../../../../assets/svg/Money.svg';
import { FiEdit2 } from "react-icons/fi";

const RecentJobItems = () => {
    return (
        <div className="p-5 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg mr-4 mb-5 cursor-pointer">
            <h1 className="text-base font-bold">Software Developer</h1>
            <h2 className="text-[#94A3B8] text-xs text-ellipsis w-56 overflow-hidden whitespace-nowrap">1 week ago</h2>
            <hr className="my-5" />
            <div className="mb-3 text-[#475569] text-xs flex justify-start items-center">
                <img src={ExperienceIcon} alt="ExperienceIcon" width="15rem" height="15rem" />
                <span className="ml-2">6+ yrs exp.</span>
            </div>
            <div className="mb-3 text-[#475569] text-xs flex justify-start items-center">
                <img src={Money} alt="Money" width="15rem" height="15rem" />
                <span className="ml-2">12 LPA</span>
            </div>
            <div className="mb-3 text-[#475569] text-xs flex justify-start items-center">
                <img src={LocationIcon} alt="LocationIcon" width="15rem" height="15rem" />
                <span className="ml-2">Hyderabad</span>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex justify-start items-center">
                    <button className="bg-[#FFFAF2] text-[#EA580C] px-2 py-1 rounded-lg">Hybrid</button>
                    <button className="bg-[#F0FFF5] text-[#16A34A] px-2 py-1 rounded-lg ml-2">Full-time</button>
                </div>
                <div className="flex justify-start items-center">
                    <button className="text-gray-500">
                        <FiEdit2 />
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