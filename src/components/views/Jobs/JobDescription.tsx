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
      <div className="grid grid-cols-12 gap-10 px-24 bg-[#F8FAFC] py-10">
        <div className="col-start-1 col-end-8  p-5">
          <div className="border border-gray-200 rounded-xl p-5 ">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <div className="mb-1">
                  <h1 className="font-semibold">{jobDetail?.title}</h1>
                </div>
                <div className="flex flex-row gap-2 mb-3">
                  <div>{jobDetail?.company?.title}</div>
                  <div className="flex items-center">
                    <span> <AiFillStar color='yellow' /></span>
                    <span className="ml-1">3.4</span>
                  </div>
                  <div className="flex flex-row">
                    <button> 304 Reviews</button>
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="ml-2 flex items-center">
                    <span >
                      <BsBriefcase />
                    </span>
                    <span className="ml-1">
                      {/* 1 - 3 years */}
                      {jobDetail?.totalExpYearStart?.title[0]} -
                    </span>
                    <span className="ml-1">{jobDetail?.totalExpYearEnd?.title[0]}</span>
                  </div>
                  <div className="border border-l-0 border-gray-400 ml-4">
                  </div>
                  <div className="ml-2 items-center flex">
                    <span> <LiaRupeeSignSolid /></span>
                    <span className="ml-1 ">
                      {jobDetail?.payScaleLowerRange?.title}
                      {/* 2.25-3 Lacs P.A. */}
                    </span>

                    {jobDetail?.payScaleUpperRange &&
                      <span className="ml-1"> - {jobDetail?.payScaleUpperRange?.title}
                      </span>}
                    <span className="ml-1">{jobDetail?.numberSystem?.title}</span>
                  </div>
                </div>
                <div className="flex flex-col mt-1">
                  <span>
                    <IoLocationOutline />
                  </span>
                  <span className="ml-1  w-96">
                    {/* Kolkata, Mumbai, New Delhi, Hyderabad/Secunderabad, Pune, Chennai, Bangalore/Bengaluru */}
                    {jobDetail?.jobsLocation[0].title}
                  </span>
                </div>
              </div>
              <div className="flex flex-col ">
                <div>
                  <img src={companyImage} alt="Company logo" className="flex  items-end justify-end rounded-xl border border-gray-200 p-5 text-end w-full" />
                </div>
                <button className="ml-8 text-blue-600 font-semibold hover:underline">
                  Send me jobs like this
                </button>
              </div>
            </div>
            <hr className=" mt-4" />
            <div className="flex flex-row mt-3">
              <div className="flex flex-row">
                <span>
                  Posted:
                </span>
                <span className="ml-1">
                  {/* 4 days ago */}
                  {lastUpdatedTimestamp !== null && formatDistanceToNow(lastUpdatedTimestamp, { addSuffix: true })}

                </span>
                <div className="border border-right border-gray-100 ml-1">
                </div>
                <div className="ml-1">
                  Openings:
                </div>
                <span className="ml-1">
                  {/* 2 */}
                  {jobDetail?.jobsOpening}
                </span>
                <div className="border border-right border-gray-100 ml-1">
                </div>
                <div className="ml-1">
                  Applicants:
                </div>
                <div className="ml-1">
                  20
                </div>
              </div>
              <div className="flex flex-row ml-4">
                <button className="border border-blue-600 rounded-xl py-1 px-3">
                  Register to apply
                </button>
                <button className="border border-blue-600 rounded-xl py-1 px-3 ml-3">
                  Login to apply
                </button>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 rounded-xl p-5 mt-4">
            <h1 className="mt-1 font-semibold">
              Job description
            </h1>
            {/* <ul className="list-disc mt-3 px-8" >
              <li>Previous experience working as a React.js Developer. In-depth knowledge of JavaScript, CSS, HTML, JavaScript, TypeScript</li>
              <li>Knowledge of REACT tools including React.js, Webpack, Enzyme, Redux, and Flux. Experience with user interface design.</li>
              <li>Knowledge of performance testing frameworks including Mocha and Jest.</li>
              <li>Experience with browser-based debugging and performance testing software.</li>
              <li>DB experience in creating queries, structure, manage tables. Troubleshooting & Demonstrable testing skills</li>
              <li>Proven ability to quickly understand functional requirements and technical concepts.</li>
            </ul> */}
            {jobDetail?.jobDescription}
            <div className="flex flex-row mt-3">
              <span className="font-semibold mr-1">
                Role:
              </span>
              <span>
                {/* Software Development - Other */}
                {jobDetail?.jobsRole?.title}
              </span>
            </div>
            <div className="flex flex-row mt-3">
              <span className="font-semibold mr-1">
                Industry Type:
              </span>
              <span>
                {/* Management Consulting */}
                {jobDetail?.industryType?.title}
              </span>
            </div>
            <div className="flex flex-row mt-3">
              <span className="font-semibold mr-1">
                Department:
              </span>
              <span>
                {/* Engineering - Software & QA */}
                {jobDetail?.department?.title}
              </span>
            </div>
            <div className="flex flex-row mt-3">
              <span className="font-semibold mr-1">
                Employment Type:
              </span>
              <span>
                {/* Full Time, Permanent */}
                {jobDetail?.employeeType?.title}
              </span>

            </div>
            <div className="flex flex-row mt-3">
              <span className="font-semibold mr-1">
                Role Category:
              </span>
              <span>
                {/* Software Development */}
                {jobDetail?.roleCategory?.title}
              </span>

            </div>
            <h1 className="mt-1 font-semibold">
              Education
            </h1>
            <div className="flex flex-row mt-3">
              <span className="font-semibold mr-1">
                UG:
              </span>
              <span>
                {/* Any Graduate */}
                {jobDetail?.education?.title}
              </span>
            </div>
            <div className="flex flex-row mt-3">
              <div className="font-semibold mr-1">
                PG:
              </div>
              <div>
                Any Graduate
              </div>
            </div>
            <h1 className="mt-2 font-semibold">
              Key Skills
            </h1>
            <div className="flex flex-row flex-wrap gap-y-2 gap-x-4 mt-2">
              <button className="border border-gray-500 rounded-xl py-1 px-3">
                React js
              </button>
              {jobDetail?.jobsKeySkills?.map((job) =>
                <button className="border border-gray-500 rounded-xl py-1 px-3 ">
                 {job.keySkills?.title}
                </button>
              )}
              {/* <button className="border border-gray-500 rounded-xl py-1 px-3 ">
                HTML
              </button>
              <button className="border border-gray-500 rounded-xl py-1 px-3 ">
                CSS
              </button>
              <button className="border border-gray-500 rounded-xl py-1 px-3 ">
                Redux
              </button>
              <button className="border border-gray-500 rounded-xl py-1 px-3 ">
                Debugging
              </button>
              <button className="border border-gray-500 rounded-xl py-1 px-3 ">
                Testing
              </button>
              <button className="border border-gray-500 rounded-xl py-1 px-3 ">
                github
              </button> */}
            </div>
            <hr className="mt-5 mb-5" />
            <div className="flex flex-row gap-x-3">
              <AiFillFacebook color='blue' size='24' />
              <AiFillLinkedin color='blue' size='24' />
              <AiFillTwitterCircle color='blue' size='24' />
            </div>
          </div>
          <div className="border border-gray-200 rounded-xl p-5 mt-4">
            <h1 className="mt-1 font-semibold">
              About company
            </h1>
            <span className="text-xs">

              Allied Digital is well renowned as a leading Global IT Transformation Architect, with an impeccable track record for designing, developing, deploying, and delivering end-to-end IT Infrastructure services.

              With over two decades of proven experience, Allied Digital responsibly delivers cutting-edge IT services and solutions to a wide range of industries spanning 35 countries across 5 continents.

              Our inherent capabilities built on the philosophy of '3S' (Smart People, Smart Processes, Smart Technology); provide the strong foundation for a best-in-class Integrated Service Delivery Framework that consistently augments our overall value creation proposition to our clients; both effectively and efficiently.

              As a trusted partner with a wide range of service capabilities and state-of-the-art global command centers, Allied Digital helps clients transform and succeed in challenging environments by making better IT decisions.
            </span>
            <div className="text-xs">
              www.allieddigital.net
            </div>
            <h1 className="mt-1 font-semibold">
              Company Info
            </h1>
            <div className=" flex flex-row mt-1">
              <h1 className="font-medium mr-1">Address:</h1>
              <div className="text-xs text-gray-400 ml-1">Unit No 405 406,4th floor,MULTISTORIED BLDG,SEEPZ SEZ, ANDHERI EAST,MUMBAI , MUMBAI, Maharashtra, India</div>

            </div>
          </div>
          <div className="border border-gray-200 rounded-xl p-5 mt-4">
            <h1 className="mt-1 font-semibold">
              Beware of imposters!
            </h1>
            <span className="text-xs">
              Jobportal.com does not promise a job or an interview in exchange of money. Fraudsters may ask you to pay in the pretext of registration fee, Refundable Fee…
            </span> <span className="text-blue-500">Read more</span>



          </div>
          {/* <h1 className="mt-5 font-semibold">
            Similar jobs
          </h1> */}
          {/* <JobListItem/> */}
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

