import { Fragment, useEffect, useState } from 'react';
import companyImage from '../../../assets/jpeg/company.jpeg';
import { BsBriefcase } from 'react-icons/bs';
import { LiaRupeeSignSolid } from 'react-icons/lia';
import { IoLocationOutline } from 'react-icons/io5';
import { AiFillFacebook, AiFillLinkedin, AiFillTwitterCircle, AiFillStar } from 'react-icons/ai';
import ambitionBox from '../../../assets/svg/ambitionBox.svg';
import ShortJobCard from '../../commonComponents/ShortJobCard';
import premium from '../../../assets/jpeg/premium.jpg'
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

const JobDescription = () => {
  const [lastUpdatedTimestamp, setLastUpdatedTimestamp] = useState<Date | null>(null);
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { success, jobDetail } = useAppSelector((state) => state.getJobDetail)

  useEffect(() => {
    dispatch(getJobDetail(id));
  }, [dispatch]);

  useEffect(() => {
    if (success) {
    }
  }, [success, dispatch]);

  const totalStars = 5;
  // const ratedStars = Math.floor(jobDetail.re)

  const parsedDate = parseISO(jobDetail?.createdAt)
  useEffect(() => {
    if (!isNaN(parsedDate.getDate())) {
      setLastUpdatedTimestamp(parsedDate);
    }
  }, [jobDetail])

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
                  <div className="self-stretch text-slate-900 text-2xl font-bold  leading-7 tracking-tight">Global Head of Supply Chain Finance</div>
                  <div className="self-stretch justify-start items-start gap-1 inline-flex">
                    <div className="grow shrink basis-0 text-slate-500 text-base font-medium leading-snug tracking-tight">TATA Consultancy Services</div>
                    <div className="text-slate-400 text-sm font-normal  leading-none tracking-tight">Posted 4 hrs ago</div>
                  </div>
                </div>
              </div>
              <div className="self-stretch h-px border border-indigo-100"></div>
              <div className="self-stretch h-16 flex-col justify-start items-start gap-5 flex">
                <div className="self-stretch justify-start items-start gap-5 inline-flex">
                  <div className="justify-start items-center gap-2 flex">
                    <img src={experienceIcon} alt="experience" />
                    <div className="text-slate-500 text-base font-medium leading-snug tracking-tight">6+ yrs exp.</div>
                  </div>
                  <div className="justify-start items-center gap-2 flex">
                    <img src={moneyIcon} alt="moneyIcon" />
                    <div className="text-slate-500 text-base font-medium leading-snug tracking-tight">12 LPA</div>
                  </div>
                  <div className="justify-start items-center gap-2 flex">
                    <img src={locationIcon} alt="location" />
                    <div className="text-slate-500 text-base font-medium leading-snug tracking-tight">Hyderabad, Delhi, Mumbai</div>
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
              <span className="self-stretch text-slate-500 text-base font-medium  leading-snug tracking-tight">Are you ready to be part of a dynamic and growing agile software company? At Sureify were helping a large and critical industry -- life insurance -- modernize and innovate. Composed of 250+ insurance veterans, technology experts, and creatives, Sureify advances an important industry that has fallen behind digitally. We build digital solutions for some of the world’s leading insurance carriers, and we need your help to further expand & evolve our suite of B2B2C & B2B products.<br /><br />We’re looking for a product designer with 2 to 5 years of experience, a passion for scalable product design, a knack for solving challenging (design) problems and an eye for detail. If you are keen on advancing your career working with the leading startup in life insurance innovation, we’d love to meet you!<br /><br />You’ll be working as part of a multidisciplinary design team while collaborating closely with product owners and developers in creating exceptional product design outcomes. To be successful in this role, you should have an excellent understanding of interaction design & prototyping as well as brand application.You should also have experience designing features and/or products from start to finish, including developer hand-off and documentation.
              </span>
            </div>
            <div className="self-stretch h-px border border-indigo-100 my-5"></div>
            <div className="self-stretch flex-col justify-start items-start gap-5 flex">
              <div className="self-stretch text-slate-900 text-base font-bold  leading-snug tracking-tight">
                Key Responsibilities</div>
              <div className="self-stretch text-slate-500 text-base font-medium leading-snug tracking-tight">Translate complex ideas into design that is compelling, consistent & scalable, including but not limited to workflows, user flows, wireframes, mockups, high fidelity UI/UX, prototypes.<br />Carry out UI/UX branding projects for our customers from start to finish.<br />Present product designs & concepts to internal and external stakeholders.<br />Utilize & contribute to an existing design system to ensure cohesion across designs.<br />Provide design QA.<br />Prepare and maintain relevant documentation on each project.<br />Handle multiple tasks and meet deadlines. When necessary, organize workload around changing priorities.<br />Inspire and share ideas with other design members across the organization.<br />Display strong organizational skills, liaise confidently with stakeholders to obtain relevant input on projects.<br />Flexibility in working hours when required on urgent projects.<br />Accurately report time spent on projects.<br />Actively participate in ideation sessions & design reviews across design and product disciplines.</div>
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
                <div className="self-stretch text-slate-900 text-2xl font-bold leading-7 tracking-tight">TATA Consultancy Services</div>
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
                {/* <div className=" rounded-2xl justify-center items-center flex" /> */}
                <img src={locationIcon} alt="location" />
                <div className="text-slate-500 text-base font-medium leading-snug tracking-tight">Hyderabad, Delhi, Mumbai</div>
              </div>
              {/* <div className="w-6 self-stretch origin-top-left -rotate-90 border border-indigo-100"></div> */}
              <div className=" border-l border-indigo-100 h-4"></div>
              <div className="justify-start items-center gap-2 flex">
                {/* <div className=" rounded-2xl justify-center items-center flex" /> */}
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
          <div className="border border-gray-200 rounded-xl p-5" >
            <h1 className=" font-semibold">
              Jobs you might be interested in
            </h1>
            <div>
              <ShortJobCard />
              <hr className="mt-4 mb-4" />
              <ShortJobCard />
              <hr className="mt-4 mb-4" />
              <ShortJobCard />
              <hr className="mt-4 mb-4" />
              <span className="flex items-center justify-center text-center mt-4">
                <button className="border-2 border-blue-600 rounded-xl text-blue-600 font-medium px-3 py-1">View All</button>
              </span>
            </div>
          </div>
          <div className="border border-gray-200 rounded-xl p-5 mt-4">
            <div className="flex justify-between">
              <span className="font-semibold">Reviews</span>
              <button className="text-blue-600 hover:underline font-medium text-sm">Read all 719 reviews</button>
            </div>
            <div>
              <button className="">
                <div className="flex flex-col items-start">
                  <span className="mt-4 font-medium text-sm"> Senior Staff Engineer in Chennai, Tamil Nadu
                  </span>
                  <div className="flex flex-row items-end">
                    <div className="border-r-2 border-gray-300 pr-3 font-medium text-xs">Anonymous</div>
                    <span className="ml-1 text-xs text-gray-500">28 Jun 2023
                    </span>
                  </div>
                </div>
              </button>
              <div className="flex flex-row gap-2 mt-2">
                <AiFillStar color='yellow' />
                <AiFillStar color='yellow' />
                <AiFillStar color='yellow' />
                <AiFillStar color='yellow' />
                <AiFillStar color='gray' />
              </div>
            </div>
            <h1 className="font-semibold mt-2">Likes</h1>
            <span className=" font-normal text-sm mt-4 mb-4">Its a remarkable workplace, offering a fantastic work culture,growth opportunities, and an exceptional leadership team. Highly recommended!"</span>
            <div className="flex flex-row mt-3">
              <span className="mr-3 text-xs ">Powered by </span>
              <img src={ambitionBox} alt="AmbitionBox" height="15rem" width="15rem" />
              <span className="font-bold text-xs">AmbitionBox</span>
            </div>
          </div>
          <div className="border border-gray-200 rounded-xl p-5 mt-4">

            <div className="flex flex-row justify-between mb-4">
              <div className="">Services you might be
                interested in</div>
              <button className="text-blue-600 font-semibold text-sm hover:underline">Know more</button>

            </div>

            <button className="text-sm text-gray-600">Resume Display</button>
            <button className=" font-bold text-sm">Increase your profile visibility to recruiters upto 3 times</button>
            <button className=" text-sm ">
              Get a Featured Profile, Stand out and get noticed in recruiter eyes.
            </button>
            <hr className=" mt-3" />
            <div className="flex flex-row justify-between items-center">
              <img src={premium} alt="premium" height="72rem" width="72rem" />
              <button className="text-xs text-gray-400">* May include paid services</button>
            </div>
          </div>
        </div>
      </div >
    </Fragment>
  )
}

export default JobDescription;

