import { Link } from "react-router-dom";
import PhoneIcon from '../../../../assets/svg/Phone.svg';
import EmailIcon from '../../../../assets/svg/Email.svg';
import LocationIcon from '../../../../assets/svg/LocationIcon.svg';
import defaultPicture from '../../../../../src/assets/jpeg/default_picture.jpg';
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { BiChevronRight } from 'react-icons/bi';
import ProfileIndicator from "../../../commonComponents/ProfileIndicator";
import BMWIcon from '../../../../assets/svg/BMWIcon.svg';
import ArrowRight from '../../../../assets/svg/ArrowRight.svg';
import ExperienceIcon from '../../../../assets/svg/ExperienceIcon.svg';
import applications from '../../../../assets/svg/applications.svg';

const LeftSection = ({ companyDetails }: any) => {
    return (
        <div className="col-start-1 col-end-3">
            <div className="bg-[#FFF] rounded-lg shadow-sm w-full sticky top-[13%] ">
                <div className="w-full h-40 relative">
                    <div className="w-full h-2/3 bg-gradient-to-r from-[#EEF2FF] to-[#C7D2FE] rounded-t-lg">
                    </div>
                    <div className="w-full h-1/3 bg-[#FFF]">
                    </div>
                    <div className="absolute bg-[#FFF] top-2/3 left-10 -translate-y-1/2 h-32 w-32 rounded-full p-1">
                        <img src={defaultPicture} alt="profile" className="rounded-full w-full h-full" />
                    </div>
                </div>
                <div className="px-5 py-5">
                    <h1 className="text-xl font-bold mb-1">{companyDetails?.[0]?.user?.[0]?.name}</h1>
                    <div>
                        <h1 className="mb-1 overflow-hidden whitespace-nowrap text-ellipsis ">Reactjs Developer
                        </h1>
                        <h1 className="overflow-hidden whitespace-nowrap text-ellipsis">{companyDetails?.[0]?.title && `@ ${companyDetails?.[0]?.title}`}
                        </h1>
                    </div>
                    <div className="mt-5 text-sm text-[#64748B]">
                        {
                            companyDetails?.[0]?.user?.[0]?.email &&
                            <div className="flex justify-start items-center mb-1">
                                <img src={EmailIcon} alt="EmailIcon" width="12rem" height="12rem" />
                                <span className="ml-2 overflow-hidden inline-block whitespace-nowrap text-ellipsis">{companyDetails?.[0]?.user?.[0]?.email}</span>
                            </div>
                        }
                        {
                            companyDetails?.[0]?.user?.[0]?.mobileNumber &&
                            <div className="flex justify-start items-center mb-1">
                                <img src={PhoneIcon} alt="PhoneIcon" width="12rem" height="12rem" />
                                <span className="ml-2 overflow-hidden inline-block whitespace-nowrap text-ellipsis">{companyDetails?.[0]?.user?.[0]?.mobileNumber}</span>
                            </div>
                        }
                        {companyDetails?.[0]?.location?.length ? <div className="flex justify-start items-center">
                            <img src={LocationIcon} alt="LocationIcon" width="12rem" height="12rem" />
                            {companyDetails?.[0]?.location?.map((loc: any) => <span className="ml-2 overflow-hidden inline-block whitespace-nowrap text-ellipsis">{loc?.title}, </span>)}
                        </div>:<></>}
                    </div>
                    <hr className="mt-5 mb-5" />
                    <div className="flex justify-start items-center mb-4">
                        <img src={BMWIcon} alt="CompanyIcon" />
                        <h1 className="ml-2 line-clamp-2 list-inside font-bold">{companyDetails?.[0]?.title}</h1>
                    </div>
                    <button className="bg-[#EEF2FF] text-[#312E81] px-3 py-1 rounded-lg flex justify-start items-center"><span className="mr-2">Company Profile</span><img src={ArrowRight} alt="ArrowRight" /></button>
                    <hr className="mt-5 mb-5" />
                    <div className="flex justify-start items-center mb-3">
                        <img src={ExperienceIcon} alt="ExperienceIcon" width="15rem" height="15rem" />
                        <Link to="/recruiterJobList"><span className="ml-2">Manage Jobs</span></Link>
                    </div>
                    <div className="flex justify-start items-center">
                        <img src={applications} alt="Applications" />
                        <span className="ml-2">Applications</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftSection