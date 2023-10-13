import { Fragment, useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import ShortJobCard from '../../commonComponents/ShortJobCard';
import { useAppDispatch, useAppSelector } from '../../..';
import { getJobDetail } from '../../../store/reducers/jobs/GetJobDetails';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { useParams } from 'react-router-dom';
import companyLogo from '../../../assets/png/company_logo.png';
import nokiaLogo from '../../../assets/svg/nokiaLogo.svg';
import experienceIcon from '../../../assets/svg/ExperienceIcon.svg';
import moneyIcon from '../../../assets/svg/MoneyIcon.svg';
import locationIcon from '../../../assets/svg/LocationIcon.svg';
import bookMarkIcon from '../../../assets/svg/bookMark.svg';
import peopleIcon from '../../../assets/svg/peopleIcon.svg';
import rightArrow from '../../../assets/svg/ArrowRight.svg';
import StarIcon from '../../../assets/svg/starIcon.svg';
import employeeCount from '../../../assets/svg/employeeCount.svg'
import { getCompanyDetails } from '../../../store/reducers/companies/getCompanyDetails';
import { addLabel } from '../../utils/utils';
import TopCompaniesHiring from '../HomePage/TopCompaniesHiring';

const CompanyDescription = () => {
  const [lastUpdatedTimestamp, setLastUpdatedTimestamp] = useState<Date | null>(null);
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { success, companyDetail } = useAppSelector((state) => state.getCompanyDetails)

  useEffect(() => {
    dispatch(getCompanyDetails(id as any));
  }, [dispatch, id]);

  useEffect(() => {
    if (success) {
    }
  }, [success, dispatch]);

  const parsedDate = parseISO(companyDetail?.createdAt)
  useEffect(() => {
    if (!isNaN(parsedDate.getDate())) {
      setLastUpdatedTimestamp(parsedDate);
    }
  }, [companyDetail]);

  console.log("companyDetails-->", companyDetail);

  return (
    <Fragment>
      <div className="h-[10%] w-full"></div>
      <div className="grid grid-cols-12 gap-10 py-6 px-32 bg-[#F8FAFC] ">
        <div className="col-start-1 col-end-8  p-5">
          <div className="border border-[#E0E7FF] rounded-xl p-5 bg-white">
            <div className="self-stretch h-full flex-col justify-start items-start gap-5 flex">
              <div className="self-stretch justify-start items-center gap-3 inline-flex">
                <img className="w-14 h-14 rounded-lg" src={nokiaLogo} alt="nokiaLogo" />
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                  <div className="self-stretch text-slate-900 text-2xl font-bold  leading-7 tracking-tight">{companyDetail?.title}</div>
                  <div className="self-stretch justify-start items-start gap-1 inline-flex">
                    <div className="">
                      {
                        companyDetail?.rating && <div className="flex justify-start items-center">
                          <img src={StarIcon} alt="StarIcon" width="15rem" height="15rem" />
                          <span className="ml-1">{companyDetail?.rating}</span>
                          <span className=" border-l h-5 border-gray-300 mx-4"></span>
                          <span className="text-[#94A3B8] text-sm">{addLabel(companyDetail?.reviews)} Reviews</span>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
              <hr className="indigo-100 w-full"/>
              <div className="self-stretch flex-col justify-start items-start gap-5 flex">
                <div className="self-stretch justify-start items-start gap-5 inline-flex">
                  <div className="justify-start items-center gap-2 flex">
                    <img src={employeeCount} alt="employeeCount" />
                    <span className="text-slate-500 text-base leading-snug tracking-tight">
                      {addLabel(companyDetail?.employeeCount)} employees
                    </span>
                  </div>
                  {
                    companyDetail?.employeeCount && Object.keys(companyDetail?.location).length
                      ? <span className=" border-l h-5 border-gray-300 mx-3"></span> : <></>
                  }
                  <div className="justify-start items-center gap-2 flex">
                    <img src={locationIcon} alt="location" />
                    {companyDetail?.location?.map((loc: any) =>
                      <div className="text-slate-500 text-base leading-snug tracking-tight">
                        {loc?.title},
                      </div>)}
                  </div>

                </div>
                <div>
                  <button className="bg-[#F8FAFC] px-3 py-1.5 rounded-lg mr-5 text-sm">
                    <div className="flex justify-start items-center">
                      <span className="ml-1">Hardware</span>
                    </div>
                  </button>
                  <button className="bg-[#F8FAFC] px-3 py-1.5 rounded-lg mr-5 text-sm">
                    <div className="flex justify-start items-center">
                      <span className="ml-1">Networking</span>
                    </div>
                  </button>
                  <button className="bg-[#F8FAFC] px-3 py-1.5 rounded-lg mr-5 text-sm">
                    <div className="flex justify-start items-center">
                      <span className="ml-1">Foreign MNC</span>
                    </div>
                  </button>
                </div>
                <hr className="indigo-100 w-full"/>
              </div>
              <div className="self-stretch flex-col justify-start items-start gap-5 flex">
                <div className="self-stretch text-slate-900 text-base font-bold  leading-snug tracking-tight">
                  About the company</div>
                <span className="self-stretch text-slate-500 text-base leading-snug tracking-tight">
                  {companyDetail?.companyDescription}
                </span>
              </div>
              <hr className="indigo-100 w-full"/>
              <div className="self-stretch  flex-col justify-start items-start flex ">
                <div className="self-stretch text-slate-900 text-base font-bold leading-snug tracking-tight">Benefits</div>
                <div>
                  <button className="bg-[#F8FAFC] px-3 py-1.5 rounded-lg mr-5 mt-4 text-sm">
                    <div className="flex justify-start items-center">
                      <span className="ml-1">Hardware</span>
                    </div>
                  </button>
                  <button className="bg-[#F8FAFC] px-3 py-1.5 rounded-lg mr-5 mt-4 text-sm">
                    <div className="flex justify-start items-center">
                      <span className="ml-1">Networking</span>
                    </div>
                  </button>
                  <button className="bg-[#F8FAFC] px-3 py-1.5 rounded-lg mr-5 mt-4 text-sm">
                    <div className="flex justify-start items-center">
                      <span className="ml-1">Foreign MNC</span>
                    </div>
                  </button>
                  <button className="bg-[#F8FAFC] px-3 py-1.5 rounded-lg mr-5 mt-4 text-sm">
                    <div className="flex justify-start items-center">
                      <span className="ml-1">Hardware</span>
                    </div>
                  </button>
                  <button className="bg-[#F8FAFC] px-3 py-1.5 rounded-lg mr-5 mt-4 text-sm">
                    <div className="flex justify-start items-center">
                      <span className="ml-1">Networking</span>
                    </div>
                  </button>
                  <button className="bg-[#F8FAFC] px-3 py-1.5 rounded-lg mr-5 mt-4 text-sm">
                    <div className="flex justify-start items-center">
                      <span className="ml-1">Foreign MNC</span>
                    </div>
                  </button>
                  <button className="bg-[#F8FAFC] px-3 py-1.5 rounded-lg mr-5 mt-4 text-sm">
                    <div className="flex justify-start items-center">
                      <span className="ml-1">Hardware</span>
                    </div>
                  </button>
                  <button className="bg-[#F8FAFC] px-3 py-1.5 rounded-lg mr-5 mt-4 text-sm">
                    <div className="flex justify-start items-center">
                      <span className="ml-1">Networking</span>
                    </div>
                  </button>
                  <button className="bg-[#F8FAFC] px-3 py-1.5 rounded-lg mr-5 mt-4 text-sm">
                    <div className="flex justify-start items-center">
                      <span className="ml-1">Foreign MNC</span>
                    </div>
                  </button>
                </div>
              </div>
              {/* <hr className="indigo-100 w-full"/> */}
              <hr className="indigo-100 w-full"/>
              <div className="self-stretch  flex-col justify-start items-start gap-5 flex ">
              <div className="grid grid-cols-2 gap-y-4 w-full">
                  <div>
                    <span className=" block text-gray-400">Type</span>
                    <span>Private</span>
                  </div>
                  <div>
                  <span className=" block text-gray-400">Founded</span>
                    <span>1865</span>
                  </div>
                  <div>
                  <span className=" block text-gray-400">Headquarters</span>
                    <span>India</span>
                  </div>
                  <div>
                  <span className=" block text-gray-400">Website</span>
                    <span>www.ratnaglobaltech.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>          
        </div>
        <div className="col-start-8 col-end-13">
          <div className="flex flex-row justify-between items-center mb-5">
            <div className="flex items-center">
              <span className="font-bold text-xl">Open positions</span>
              <span className={`text-xs bg-gray-200 flex justify-center items-center ml-4 ${companyDetail?.jobs > 9 ? "p-1 rounded-full" : "h-6 w-6 rounded-full"}`}>{companyDetail?.jobs}</span>
            </div>
            
            <div className="flex flex-row items-center gap-3">
              <span className="flex justify-center items-center text-lg font text-indigo-900 text-center">
                All Jobs
              </span>
              <button className="flex justify-center items-center">
                <img src={rightArrow} alt="rightArrow" width="w-full" className="text-indigo-900" />
              </button>
            </div>
          </div>
          <div className="mb-4"><ShortJobCard /></div>
          <div className=" mb-3"><ShortJobCard /></div>
          <div className=" mb-3"><ShortJobCard /></div>
        </div>
      </div>
      <div className="h-[65%] bg-[#F1F5F9] px-32 flex flex-col justify-center">
                <TopCompaniesHiring viewLabel="All companies" title="Similar Companies"/>
            </div>
    </Fragment>
  )
}

export default CompanyDescription;