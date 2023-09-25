import { Fragment } from 'react';
import companyImage from '../../../assets/jpeg/company.jpeg';
import { BsBriefcase } from 'react-icons/bs';
import { LiaRupeeSignSolid } from 'react-icons/lia';
import { IoLocationOutline } from 'react-icons/io5';
import { AiFillFacebook, AiFillLinkedin, AiFillTwitterCircle, AiFillStar } from 'react-icons/ai';


const JobDescription = () => {

  return (
    <Fragment>
      <div className="h-[10%] w-full"></div>
      <div className="grid grid-cols-12 gap-10 px-40 bg-[#F8FAFC] py-12">
        <div className="col-start-1 col-end-8  p-5">
          <div className="border border-gray-200 rounded-xl p-5 ">
            <div className="flex flex-row">
              <div className="flex flex-col">
                <div className="mb-1">
                  <h1 className="font-semibold">Service Desk Engineer 1</h1>
                </div >
                <div className="flex flex-row gap-2 mb-3">
                  <div>Allied Digital</div>
                  <AiFillStar color='yellow' />

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
                      1 - 3 years
                    </span>
                  </div>
                  <div className="border border-l-0 border-gray-400 ml-4">
                  </div>
                  <div className="ml-2 items-center flex">
                    <span> <LiaRupeeSignSolid /></span>
                    <span className="ml-1 ">
                      2.25-3 Lacs P.A.
                    </span>
                  </div>
                </div>
                <div className="flex flex-col mt-1">
                  <span>
                    <IoLocationOutline />
                  </span>
                  <span className="ml-1  w-96">
                    Kolkata, Mumbai, New Delhi, Hyderabad/Secunderabad, Pune, Chennai, Bangalore/Bengaluru
                  </span>
                </div>
              </div>
              <div className="flex flex-col ">
                <div>
                  <img src={companyImage} alt="Company lo" height="30rem" width="30rem" className="flex  items-end justify-end rounded-xl border border-gray-200 p-5 text-end w-full" />
                </div>
                <button className="ml-8 text-blue-600 font-semibold hover:underline">
                  Send me jobs like this
                </button>
              </div>
            </div>
            <hr className=" mt-4" />
            <div className="flex flex-row mt-3">
              <div className="flex flex-row">
                <div>
                  Posted:
                </div>
                <div className="ml-1">
                  4 days ago
                </div>
                <div className="border border-right border-gray-100 ml-1">
                </div>
                <div className="ml-1">
                  Openings:
                </div>
                <div className="ml-1">
                  2
                </div>
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
            <ul className="list-disc mt-3 px-8" >
              <li>Previous experience working as a React.js Developer. In-depth knowledge of JavaScript, CSS, HTML, JavaScript, TypeScript</li>
              <li>Knowledge of REACT tools including React.js, Webpack, Enzyme, Redux, and Flux. Experience with user interface design.</li>
              <li>Knowledge of performance testing frameworks including Mocha and Jest.</li>
              <li>Experience with browser-based debugging and performance testing software.</li>
              <li>DB experience in creating queries, structure, manage tables. Troubleshooting & Demonstrable testing skills</li>
              <li>Proven ability to quickly understand functional requirements and technical concepts.</li>
            </ul>
            <div className="flex flex-row mt-3">
              <div className="font-semibold mr-1">
                Role:
              </div>
              <div>
                Software Development - Other
              </div>
            </div>
            <div className="flex flex-row mt-3">
              <div className="font-semibold mr-1">
                Industry Type:
              </div>
              <div>
                Management Consulting
              </div>
            </div>
            <div className="flex flex-row mt-3">
              <div className="font-semibold mr-1">
                Department:
              </div>
              <div>
                Engineering - Software & QA
              </div>

            </div>
            <div className="flex flex-row mt-3">
              <div className="font-semibold mr-1">
                Employment Type:
              </div>
              <div>
                Full Time, Permanent
              </div>

            </div>
            <div className="flex flex-row mt-3">
              <div className="font-semibold mr-1">
                Role Category:
              </div>
              <div>
                Software Development
              </div>

            </div>
            <h1 className="mt-1 font-semibold">
              Education
            </h1>
            <div className="flex flex-row mt-3">
              <div className="font-semibold mr-1">
                UG:
              </div>
              <div>
                Any Graduate
              </div>
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
              <button className="border border-gray-500 rounded-xl py-1 px-3 ">
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
              </button>
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
            <div className=" flex flex-row">
              <h1 className="font-medium mr-1">Address:</h1>
              <div >Unit No 405 406,4th floor,MULTISTORIED BLDG,SEEPZ SEZ, ANDHERI EAST,MUMBAI , MUMBAI, Maharashtra, India</div>

            </div>
          </div>
          <div className="border border-gray-200 rounded-xl p-5 mt-4">
            <h1 className="mt-1 font-semibold">
              Beware of imposters!
            </h1>
            <span className="text-xs">
              Naukri.com does not promise a job or an interview in exchange of money. Fraudsters may ask you to pay in the pretext of registration fee, Refundable Fee…
            </span> <span className="text-blue-500">Read more</span>

            <h1 className="mt-1 font-semibold">
              Company Info
            </h1>
            <div className=" flex flex-row">
              <h1 className="font-medium mr-1">Address:</h1>
              <div className="text-gray-500 text-xs">Unit No 405 406,4th floor,MULTISTORIED BLDG,SEEPZ SEZ, ANDHERI EAST,MUMBAI , MUMBAI, Maharashtra, India</div>
            </div>
          </div>
          <h1 className="mt-5 font-semibold">
            Similar jobs
          </h1>
        </div>
        <div className="col-start-8 col-end-12  p-5 h-2/4">Job Description</div>
      </div >
    </Fragment>
  )
}

export default JobDescription;

