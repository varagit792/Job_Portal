import LocationIcon from '../../../../assets/svg/LocationIcon.svg';
import companyBrand from '../../../../assets/png/companyBrand.png';
import ThreeDots from '../../../../assets/svg/threeDots.svg';
import BookMark from '../../../../assets/svg/bookMark.svg';
import ExperienceIcon from '../../../../assets/svg/ExperienceIcon.svg';
import Education from '../../../../assets/svg/Education.svg';

const ApplicantListItems = () => {

    return (
        <div className="p-5 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg mr-4 mb-5 cursor-pointer">
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
            <h1 className="text-base font-bold">Albert Flores</h1>
            <h2 className="text-[#94A3B8] text-sm  text-ellipsis w-56 overflow-hidden whitespace-nowrap">Gillette</h2>
            <hr className="my-5" />
            <div className="flex justify-between items-center mb-3">
                <div className="text-[#475569] text-xs flex justify-start items-center">
                    <img src={LocationIcon} alt="LocationIcon" width="15rem" height="15rem" />
                    <span className="ml-2">Hyderabad</span>
                </div>
                <button className="bg-[#F0FFF5] text-[#16A34A] text-xs px-2 py-1">Can Relocate</button>
            </div>
            <div className="mb-3 text-[#475569] text-xs flex justify-start items-center">
                <img src={ExperienceIcon} alt="ExperienceIcon" width="15rem" height="15rem" />
                <span className="ml-2">6+ yrs exp.</span>
            </div>
            <div className="mb-5 text-[#475569] text-xs flex justify-start items-center">
                <img src={Education} alt="Education" width="15rem" height="15rem" />
                <span className="ml-2">Bachelor's degree</span>
            </div>
            <div className="bg-[#EEF2FF] h-1 mb-2 rounded-lg relative">
                <div className="absolute top-0 h-1 bg-[#6366F1] rounded-lg" style={{ width: "93%" }}></div>
            </div>
            <div className="text-[#475569] text-xs flex justify-between items-center">
                <span>Skills matched</span>
                <span className="text-[#4F46E5]">93%</span>
            </div>
        </div>
    )
}

export default ApplicantListItems;