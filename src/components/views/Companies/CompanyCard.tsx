import Loader from '../../commonComponents/Loader';
import ThreeDots from '../../../assets/svg/threeDots.svg';
import BookMark from '../../../assets/svg/bookMark.svg';
import MoneyIcon from '../../../assets/svg/MoneyIcon.svg';
import ExperienceIcon from '../../../assets/svg/ExperienceIcon.svg';
import LocationIcon from '../../../assets/svg/LocationIcon.svg';
import companyLogo from '../../../assets/png/company_logo.png';
import employeeCount from '../../../assets/svg/employeeCount.svg'
import StarIcon from '../../../assets/svg/starIcon.svg';
import { formatDistanceToNow } from 'date-fns';
import NoRecords from '../../commonComponents/NoRecords';
import { addLabel } from '../../utils/utils';

const CompanyCard = ({ onClickCompanyCard, companyCard, loading }: any) => {
    return (
        <>
            {
                companyCard?.length ? companyCard?.map((item: any, index: number) => (
                    <div className="py-5 px-5 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg mb-5 cursor-pointer" onClick={() => onClickCompanyCard(item.id)} key={item.id}>
                        <div className="flex items-start justify-between mb-5">
                            <div className="flex justify-start items-start h-full">
                                <img src={companyLogo} alt="companyLogo" />
                                <div className="ml-5">
                                    <h1 className="text-lg font-bold">{item?.title}</h1>
                                    {item?.rating && <div className="flex justify-start items-center">
                                        <img src={StarIcon} alt="StarIcon" width="15rem" height="15rem" />
                                        <span className="ml-1">{item?.rating}</span>
                                        <span className=" border-l h-5 border-gray-300 mx-4"></span>
                                        <span className="text-[#94A3B8] text-sm">{addLabel(item?.reviews)} Reviews</span>
                                    </div>}
                                </div>
                            </div>
                            <div>
                                <button className="px-1">
                                    <img src={BookMark} alt="BookMark" className=" h-4 w-4" />
                                </button>
                                <button className="px-2">
                                    <img src={ThreeDots} alt="ThreeDots" className=" h-4 w-4" />
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-start items-center mb-5">
                            {item?.employeeCount &&
                                <div className=" flex justify-start items-center text-[#64748B] text-sm font-semibold">
                                    <img src={employeeCount} alt="employeeCount" width="15rem" height="15rem" /><span className="ml-2 leading-none">{addLabel(item?.employeeCount)} employees</span>
                                </div>
                            }
                            {
                                item?.employeeCount && Object.keys(item?.location).length
                                ? <span className=" border-l h-5 border-gray-300 mx-4"></span> : <></>
                            }
                            {Object.keys(item?.location).length ? <div className=" flex justify-start items-center ml-5 text-[#64748B] text-sm font-semibold">
                                <img src={LocationIcon} alt="LocationIcon" width="15rem" height="15rem" /><span className="ml-2 leading-none">{item?.location?.map((loc: any) => <span>{loc?.title}, </span>)}</span>
                            </div> : <></>}
                        </div>
                            <div className="mb-5">
                                <ul className="list-disc text-[#94A3B8] text-sm pl-5">
                                    <li>
                                        <span className="line-clamp-3 list-inside">{item?.companyDescription ? item?.companyDescription : 'Not Disclosed'}</span>
                                    </li>
                                </ul>
                            </div>
                        <div className="flex items-center justify-between">
                            <div>
                            <button className="bg-[#F8FAFC] px-3 py-1.5 rounded-lg mr-5 text-sm">
                                <div className="flex justify-start items-center">
                                    <span className="ml-1">Fintech</span>
                                </div>
                            </button>
                            <button className="bg-[#F8FAFC] px-3 py-1.5 rounded-lg mr-5 text-sm"> Travel & Tourism</button>
                            <span className="text-[#94A3B8] text-sm mr-5">Posted {formatDistanceToNow(new Date(item?.createdAt), { addSuffix: true })}</span>
                            </div>

                            {item?.jobs && <button className="px-3 py-2 bg-gray-200 rounded-2xl text-xs">
                                {item?.jobs} Jobs
                            </button>}
                        </div>
                    </div >
                ))
                    : <NoRecords />
            }
            {loading && <Loader />}
        </>
    )
}

export default CompanyCard