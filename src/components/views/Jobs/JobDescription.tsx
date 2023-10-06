import { Fragment, useEffect, useState } from 'react';

import {  AiFillStar } from 'react-icons/ai';
import ShortJobCard from '../../commonComponents/ShortJobCard';
import { useAppDispatch, useAppSelector } from '../../..';
import { getJobDetail } from '../../../store/reducers/jobs/GetJobDetails';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { useParams } from 'react-router-dom';
import companyLogo from '../../../assets/png/company_logo.png';
import experienceIcon from '../../../assets/svg/ExperienceIcon.svg';
import moneyIcon from '../../../assets/svg/MoneyIcon.svg';
import locationIcon from '../../../assets/svg/LocationIcon.svg';
import bookMarkIcon from '../../../assets/svg/bookMark.svg';
import peopleIcon from '../../../assets/svg/peopleIcon.svg';
import rightArrow from '../../../assets/svg/ArrowRight.svg';

const JobDescription = () => {
  const [lastUpdatedTimestamp, setLastUpdatedTimestamp] = useState<Date | null>(null);
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { success, jobDetail } = useAppSelector((state) => state.getJobDetail)

  useEffect(() => {
    dispatch(getJobDetail(id));
  }, [dispatch,id]);

  useEffect(() => {
    if (success) {
    }
  }, [success, dispatch]);

  const parsedDate = parseISO(jobDetail?.createdAt)
  useEffect(() => {
    if (!isNaN(parsedDate.getDate())) {
      setLastUpdatedTimestamp(parsedDate);
    }
  }, [jobDetail, parsedDate]);

  return (
    <Fragment>
      <div className="h-[10%] w-full"></div>
      <div className="grid grid-cols-12 gap-10 py-7 px-24 bg-white">
        <div className="col-start-1 col-end-8  p-5">
          <div className="border border-[#E0E7FF] rounded-xl p-5">
            <div className="self-stretch h-44 flex-col justify-start items-start gap-5 flex">
              <div className="self-stretch justify-start items-center gap-3 inline-flex">
                <img className="w-14 h-14 rounded-lg" src={companyLogo} alt="companyLogo" />
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                  <div className="self-stretch text-slate-900 text-2xl font-bold  leading-7 tracking-tight">{jobDetail?.title}</div>
                  <div className="self-stretch justify-start items-start gap-1 inline-flex">
                    <div className="grow shrink basis-0 text-slate-500 text-base font-medium leading-snug tracking-tight">{jobDetail?.company?.title}</div>
                    <span className="text-slate-400 text-sm font-normal  leading-none tracking-tight">
                      {lastUpdatedTimestamp !== null && formatDistanceToNow(lastUpdatedTimestamp, { addSuffix: true })}
                    </span>
                  </div>
                </div>
              </div>
              <div className="self-stretch h-px border border-indigo-100"></div>
              <div className="self-stretch h-16 flex-col justify-start items-start gap-5 flex">
                <div className="self-stretch justify-start items-start gap-5 inline-flex">
                  <div className="justify-start items-center gap-2 flex">
                    <img src={experienceIcon} alt="experience" />
                    <span className="text-slate-500 text-base font-medium leading-snug tracking-tight">
                      {jobDetail?.totalExpYearStart?.title[0]} -
                    </span>
                    <span className="text-slate-500 text-base font-medium leading-snug tracking-tight">
                      {jobDetail?.totalExpYearEnd?.title[0]} Years
                    </span>
                  </div>
                  <div className="justify-start items-center gap-2 flex">
                    <img src={moneyIcon} alt="moneyIcon" />
                    <span className="text-slate-500 text-base font-medium leading-snug tracking-tight">
                      {jobDetail?.payScaleLowerRange} -
                    </span>
                    {jobDetail?.payScaleUpperRange &&
                      <span className=" text-slate-500 text-base font-medium leading-snug tracking-tight"> {jobDetail?.payScaleUpperRange} LPA
                      </span>}
                  </div>
                  <div className="justify-start items-center gap-2 flex">
                    <img src={locationIcon} alt="location" />
                    <div className="text-slate-500 text-base font-medium leading-snug tracking-tight">
                      { jobDetail?.jobsLocation?.title}
                    </div>
                  </div>
                </div>
                <div className="justify-start items-center gap-5 inline-flex">
                  <div className="w-20 px-3 py-2 bg-orange-50 rounded justify-center items-center gap-2.5 flex">
                    <div className="text-orange-600 text-sm font-normal leading-none tracking-tight">On-site</div>
                  </div>
                  <div className="w-20 px-3 py-2 bg-green-50 rounded justify-center items-center gap-2.5 flex">
                    <div className="text-green-600 text-sm font-normal leading-none tracking-tight">Full-time</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="justify-start items-center gap-5 inline-flex mt-4">
              <div className="w-48  px-6 py-1.5 bg-indigo-600 rounded-lg shadow justify-center items-center gap-3 flex">
                <button className="text-white text-xl font-medium  leading-normal tracking-tight">Apply</button>
              </div>
              <div className="w-28 pl-6 pr-3 py-1.5 bg-indigo-50 rounded-lg justify-center items-center  gap-3 flex">
                <button className="text-indigo-900 text-xl font-medium  leading-normal tracking-tight ">Save</button>
                <button>
                  <img src={bookMarkIcon} alt="bookMark" />
                </button>
              </div>
            </div>
          </div>
          <div className="border border-[#E0E7FF] rounded-xl p-5 mt-4" >
            <div className="self-stretch  flex-col justify-start items-start gap-5 flex">
              <div className="self-stretch text-slate-900 text-base font-bold leading-snug tracking-tight">Job Description
              </div>
              <span className="self-stretch text-slate-500 text-base font-medium  leading-snug tracking-tight">               
                { jobDetail?.jobDescription}
              </span>
            </div>
            <div className="self-stretch h-px border border-indigo-100 my-5"></div>
            <div className="self-stretch flex-col justify-start items-start gap-5 flex">
              <div className="self-stretch text-slate-900 text-base font-bold  leading-snug tracking-tight">
                Key Responsibilities</div>
              <span className="self-stretch text-slate-500 text-base font-medium leading-snug tracking-tight">
                Translate complex ideas into design that is compelling, consistent & scalable, including but not limited to workflows, user flows, wireframes, mockups, high fidelity UI/UX, prototypes.Carry out UI/UX branding projects for our customers from start to finish.Present product designs & concepts to internal and external stakeholders.Utilize & contribute to an existing design system to ensure cohesion across designs.Provide design QA.Prepare and maintain relevant documentation on each project.Handle multiple tasks and meet deadlines. When necessary, organize workload around changing prioritiesInspire and share ideas with other design members across the organization.Display strong organizational skills, liaise confidently with stakeholders to obtain relevant input on projects.Flexibility in working hours when required on urgent projects.Accurately report time spent on projects.Actively participate in ideation sessions & design reviews across design and product disciplines.
              </span>
            </div>
            <div className="self-stretch h-px border border-indigo-100 my-5"></div>
            <div className="self-stretch  flex-col justify-start items-start gap-5 flex ">
              <div className="self-stretch text-slate-900 text-base font-bold  leading-snug tracking-tight">Skills</div>
              <div className=" justify-start items-start gap-3 flex-row flex flex-wrap">
                {jobDetail?.jobsKeySkills?.map((keySkill) =>
                  <div className=" px-3 py-2 bg-slate-50 rounded-lg justify-center items-center gap-2.5 flex">
                    <span className="text-black text-base font-normal  leading-snug tracking-tight">{keySkill?.keySkills?.title}</span>
                  </div>)}
              </div>
            </div>
          </div>
          <div className="border border-[#E0E7FF] rounded-xl p-5 mt-4">
            <span className="self-stretch text-slate-900 text-base font-bold leading-snug tracking-tight">About the company
            </span>
            <div className="self-stretch justify-start items-center gap-3 flex mt-2">
              <img className="w-14 h-14 rounded-lg" src={companyLogo} alt="companyLogo" />
              <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                <div className="self-stretch text-slate-900 text-2xl font-bold leading-7 tracking-tight">{jobDetail?.company?.title }</div>
                <div className="w-40 justify-start items-center gap-2 inline-flex">
                  <div className="justify-start items-center gap-1 flex">
                    <AiFillStar color="yellow" />
                    <div className="text-black text-sm font-normal leading-none tracking-tight">3.5</div>
                  </div>
                  <div className=" border-l border-indigo-100 h-4"></div>
                  <div className="text-slate-500 text-sm font-normal leading-none tracking-tight">5k+ Reviews</div>
                </div>
              </div>
            </div>
            <div className="justify-start items-start gap-5 inline-flex mt-2">
              <div className="justify-start items-center gap-2 flex">                
                <img src={locationIcon} alt="location" />
                <div className="text-slate-500 text-base font-medium leading-snug tracking-tight">Hyderabad, Delhi, Mumbai</div>
              </div>           
              <div className=" border-l border-indigo-100 h-4"></div>
              <div className="justify-start items-center gap-2 flex">              
                <img src={peopleIcon} alt="people" />
                <div className="text-slate-500 text-base font-medium leading-snug tracking-tight">500+ employees</div>
              </div>
            </div>
            <div className="px-2 py-1.5  w-44 bg-indigo-50 rounded-lg justify-center items-center text-center mt-2">
              <button className="text-indigo-900 text-base font-medium  leading-snug tracking-tight ">More open positions</button>
            </div>
          </div>
        </div>
        <div className="col-start-8 col-end-13 p-5">
          <div className="flex flex-row justify-between items-center">
            <span className="font-bold text-xl">Similar Jobs</span>
            <div className="flex flex-row items-center gap-3 j">
              <span className="flex justify-center items-center text-lg font text-indigo-900 text-center">
                All Jobs
              </span>
              <button  className="flex justify-center items-center">
                <img src={rightArrow} alt="rightArrow" width="w-full" className="text-indigo-900"/>
              </button>
            </div>
          </div>
          <ShortJobCard />
          <ShortJobCard />
          <ShortJobCard />
        </div>
      </div >
    </Fragment>
  )
}

export default JobDescription;

