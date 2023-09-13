import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CreateProfile from '../../../assets/svg/createProfile.svg';
import SearchIcon from '../../../assets/svg/searchIcon.svg';
import Group2 from '../../../assets/svg/Group 2.svg';
import Ellipse26 from '../../../assets/svg/Ellipse 26.svg';
import ArrowRight from '../../../assets/svg/ArrowRight.svg';
import compenyBrand from '../../../assets/png/compenyBrand.png';
import ThreeDots from '../../../assets/svg/threeDots.svg';
import BookMark from '../../../assets/svg/bookMark.svg';
import CreateContactIcons from '../../../assets/svg/CreateContactIcons.svg';
import CompletedContactIcons from '../../../assets/svg/CompletedContactIcons.svg';
import ApplyJobs from '../../../assets/svg/applyJobs.svg';
import UploadIcons from '../../../assets/svg/uploadIcons.svg';
import Ellipse27 from '../../../assets/svg/Ellipse 27.svg';
import Ellipse29 from '../../../assets/svg/Ellipse 29.svg';
import Ellipse28 from '../../../assets/svg/Ellipse 28.svg';
import RightWithCircle from '../../../assets/svg/rightwithcircle.svg';
import NotificationIcon from '../../../assets/svg/notificationIcon.svg';
import MoneyIcon from '../../../assets/svg/MoneyIcon.svg';
import ExperienceIcon from '../../../assets/svg/ExperienceIcon.svg';
import LocationIcon from '../../../assets/svg/LocationIcon.svg';
import { FiChevronLeft } from 'react-icons/fi';
import { BiChevronRight } from 'react-icons/bi';


const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
        slidesToSlide: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3.5,
        slidesToSlide: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1
    }
};

const ButtonGroup = ({ next, previous, goToSlide, ...rest }: any) => {
    const { carouselState: { currentSlide } } = rest;
    return (
        <div className="carousel-button-group mt-2 gap-2 flex justify-end 
        items-center w-full">
            <button className='block p-3 bg-[#818CF8] text-white' onClick={() =>
                previous()}> <FiChevronLeft /></button>
            <button onClick={() => next()}><span className='block p-3 bg-[#818CF8] text-white' ><BiChevronRight /></span></button>
        </div>
    );
};

const LandingPage = () => {
    return (
        <>
            <div className="h-[10%] w-full"></div>
            <div className="h-[90%] bg-[#fff] relative flex justify-center items-center">
                <div className="flex flex-col justify-center items-center">
                    <span className="text-xs mb-2 text-[#4F46E5] z-10">OVER 1400 JOB OPENINGS</span>
                    <h1 className="text-5xl font-bold text-[#312E81] flex flex-col items-center justify-center mb-10 z-10">
                        <span>Discover your <span className="text-[#818CF8]">dream job</span> &</span><span>empower you career</span>
                    </h1>
                    <div className="flex space-x-6 items-center z-10">
                        <button className="bg-[#4F46E5] rounded-md py-2 text-white w-44 flex items-center justify-center"><span className="mr-3">Explore</span><img src={SearchIcon} alt="SearchIcon" /></button>
                        <button className="bg-[#EEF2FF] rounded-md py-2 w-44 flex items-center justify-center"><span className="mr-3">Create profile</span><img src={CreateProfile} alt="CreateProfile" /></button>
                    </div>
                </div>
                <img src={Group2} alt="Group2" className="absolute top-44 right-96 z-1" />
                <img src={Ellipse26} alt="Ellipse26" className="absolute top-0 left-32 opacity-50 z-1 h-5/6" />
            </div>
            <div className="h-[90%] bg-[#F8FAFC] px-32 flex flex-col justify-center">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-3xl font-bold">Most demanding categories</h1>
                    <button className="text-lg flex justify-center items-center text-[#312E81]"><span className="mr-2">All categories</span><img src={ArrowRight} alt="ArrowRight" /></button>
                </div>
                <Carousel
                    swipeable={false}
                    draggable={false}
                    showDots={false}
                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={4000}
                    keyBoardControl={true}
                    customTransition="all .5"
                    transitionDuration={500}
                    arrows={false}
                    renderButtonGroupOutside={true}
                    customButtonGroup={<ButtonGroup />}
                >
                    <div className="p-5 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg mr-3 my-4">
                        <div className="flex items-start justify-between mb-3">
                            <img src={compenyBrand} alt="compenyBrand" />
                            <div className="">
                                <button className="p-2">
                                    <img src={BookMark} alt="BookMark" />
                                </button>
                                <button className="p-2">
                                    <img src={ThreeDots} alt="ThreeDots" />
                                </button>
                            </div>
                        </div>
                        <h1 className="text-xl font-bold">Dot net developer</h1>
                        <span className="text-[#94A3B8]">Ratna Global Tech</span>
                        <hr className="my-5" />
                        <div className="mb-3 text-[#475569] text-sm flex justify-start items-center">
                            <img src={ExperienceIcon} alt="ExperienceIcon" /><span className="ml-2">6+ yrs exp.</span>
                        </div>
                        <div className="mb-3 text-[#475569] text-sm flex justify-start items-center">
                            <img src={MoneyIcon} alt="MoneyIcon" /><span className="ml-2">12 LPA</span>
                        </div>
                        <div className="mb-5 text-[#475569] text-sm flex justify-start items-center">
                            <img src={LocationIcon} alt="LocationIcon" /><span className="ml-2">Hyderabad, Delhi, Mumbai</span>
                        </div>
                        <div className="flex">
                            <button className="bg-[#FFFAF2] text-[#EA580C] px-3 py-2 rounded-lg mr-2">Remote</button>
                            <button className="bg-[#F0FFF5] text-[#16A34A] px-3 py-2 rounded-lg">Full-time</button>
                        </div>
                    </div>
                    <div className="p-5 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg mr-3 my-4">
                        <div className="flex items-start justify-between mb-3">
                            <img src={compenyBrand} alt="compenyBrand" />
                            <div className="">
                                <button className="p-2">
                                    <img src={BookMark} alt="BookMark" />
                                </button>
                                <button className="p-2">
                                    <img src={ThreeDots} alt="ThreeDots" />
                                </button>
                            </div>
                        </div>
                        <h1 className="text-xl font-bold">Dot net developer</h1>
                        <span className="text-[#94A3B8]">Ratna Global Tech</span>
                        <hr className="my-5" />
                        <div className="mb-3 text-[#475569] text-sm flex justify-start items-center">
                            <img src={ExperienceIcon} alt="ExperienceIcon" /><span className="ml-2">6+ yrs exp.</span>
                        </div>
                        <div className="mb-3 text-[#475569] text-sm flex justify-start items-center">
                            <img src={MoneyIcon} alt="MoneyIcon" /><span className="ml-2">12 LPA</span>
                        </div>
                        <div className="mb-5 text-[#475569] text-sm flex justify-start items-center">
                            <img src={LocationIcon} alt="LocationIcon" /><span className="ml-2">Hyderabad, Delhi, Mumbai</span>
                        </div>
                        <div className="flex">
                            <button className="bg-[#FFFAF2] text-[#EA580C] px-3 py-2 rounded-lg mr-2">Remote</button>
                            <button className="bg-[#F0FFF5] text-[#16A34A] px-3 py-2 rounded-lg">Full-time</button>
                        </div>
                    </div>
                    <div className="p-5 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg mr-3 my-4">
                        <div className="flex items-start justify-between mb-3">
                            <img src={compenyBrand} alt="compenyBrand" />
                            <div className="">
                                <button className="p-2">
                                    <img src={BookMark} alt="BookMark" />
                                </button>
                                <button className="p-2">
                                    <img src={ThreeDots} alt="ThreeDots" />
                                </button>
                            </div>
                        </div>
                        <h1 className="text-xl font-bold">Dot net developer</h1>
                        <span className="text-[#94A3B8]">Ratna Global Tech</span>
                        <hr className="my-5" />
                        <div className="mb-3 text-[#475569] text-sm flex justify-start items-center">
                            <img src={ExperienceIcon} alt="ExperienceIcon" /><span className="ml-2">6+ yrs exp.</span>
                        </div>
                        <div className="mb-3 text-[#475569] text-sm flex justify-start items-center">
                            <img src={MoneyIcon} alt="MoneyIcon" /><span className="ml-2">12 LPA</span>
                        </div>
                        <div className="mb-5 text-[#475569] text-sm flex justify-start items-center">
                            <img src={LocationIcon} alt="LocationIcon" /><span className="ml-2">Hyderabad, Delhi, Mumbai</span>
                        </div>
                        <div className="flex">
                            <button className="bg-[#FFFAF2] text-[#EA580C] px-3 py-2 rounded-lg mr-2">Remote</button>
                            <button className="bg-[#F0FFF5] text-[#16A34A] px-3 py-2 rounded-lg">Full-time</button>
                        </div>
                    </div>
                    <div className="p-5 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg mr-3 my-4">
                        <div className="flex items-start justify-between mb-3">
                            <img src={compenyBrand} alt="compenyBrand" />
                            <div className="">
                                <button className="p-2">
                                    <img src={BookMark} alt="BookMark" />
                                </button>
                                <button className="p-2">
                                    <img src={ThreeDots} alt="ThreeDots" />
                                </button>
                            </div>
                        </div>
                        <h1 className="text-xl font-bold">Dot net developer</h1>
                        <span className="text-[#94A3B8]">Ratna Global Tech</span>
                        <hr className="my-5" />
                        <div className="mb-3 text-[#475569] text-sm flex justify-start items-center">
                            <img src={ExperienceIcon} alt="ExperienceIcon" /><span className="ml-2">6+ yrs exp.</span>
                        </div>
                        <div className="mb-3 text-[#475569] text-sm flex justify-start items-center">
                            <img src={MoneyIcon} alt="MoneyIcon" /><span className="ml-2">12 LPA</span>
                        </div>
                        <div className="mb-5 text-[#475569] text-sm flex justify-start items-center">
                            <img src={LocationIcon} alt="LocationIcon" /><span className="ml-2">Hyderabad, Delhi, Mumbai</span>
                        </div>
                        <div className="flex">
                            <button className="bg-[#FFFAF2] text-[#EA580C] px-3 py-2 rounded-lg mr-2">Remote</button>
                            <button className="bg-[#F0FFF5] text-[#16A34A] px-3 py-2 rounded-lg">Full-time</button>
                        </div>
                    </div>
                    <div className="p-5 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg mr-3 my-4">
                        <div className="flex items-start justify-between mb-3">
                            <img src={compenyBrand} alt="compenyBrand" />
                            <div className="">
                                <button className="p-2">
                                    <img src={BookMark} alt="BookMark" />
                                </button>
                                <button className="p-2">
                                    <img src={ThreeDots} alt="ThreeDots" />
                                </button>
                            </div>
                        </div>
                        <h1 className="text-xl font-bold">Dot net developer</h1>
                        <span className="text-[#94A3B8]">Ratna Global Tech</span>
                        <hr className="my-5" />
                        <div className="mb-3 text-[#475569] text-sm flex justify-start items-center">
                            <img src={ExperienceIcon} alt="ExperienceIcon" /><span className="ml-2">6+ yrs exp.</span>
                        </div>
                        <div className="mb-3 text-[#475569] text-sm flex justify-start items-center">
                            <img src={MoneyIcon} alt="MoneyIcon" /><span className="ml-2">12 LPA</span>
                        </div>
                        <div className="mb-5 text-[#475569] text-sm flex justify-start items-center">
                            <img src={LocationIcon} alt="LocationIcon" /><span className="ml-2">Hyderabad, Delhi, Mumbai</span>
                        </div>
                        <div className="flex">
                            <button className="bg-[#FFFAF2] text-[#EA580C] px-3 py-2 rounded-lg mr-2">Remote</button>
                            <button className="bg-[#F0FFF5] text-[#16A34A] px-3 py-2 rounded-lg">Full-time</button>
                        </div>
                    </div>
                    <div className="p-5 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg mr-3 my-4">
                        <div className="flex items-start justify-between mb-3">
                            <img src={compenyBrand} alt="compenyBrand" />
                            <div className="">
                                <button className="p-2">
                                    <img src={BookMark} alt="BookMark" />
                                </button>
                                <button className="p-2">
                                    <img src={ThreeDots} alt="ThreeDots" />
                                </button>
                            </div>
                        </div>
                        <h1 className="text-xl font-bold">Dot net developer</h1>
                        <span className="text-[#94A3B8]">Ratna Global Tech</span>
                        <hr className="my-5" />
                        <div className="mb-3 text-[#475569] text-sm flex justify-start items-center">
                            <img src={ExperienceIcon} alt="ExperienceIcon" /><span className="ml-2">6+ yrs exp.</span>
                        </div>
                        <div className="mb-3 text-[#475569] text-sm flex justify-start items-center">
                            <img src={MoneyIcon} alt="MoneyIcon" /><span className="ml-2">12 LPA</span>
                        </div>
                        <div className="mb-5 text-[#475569] text-sm flex justify-start items-center">
                            <img src={LocationIcon} alt="LocationIcon" /><span className="ml-2">Hyderabad, Delhi, Mumbai</span>
                        </div>
                        <div className="flex">
                            <button className="bg-[#FFFAF2] text-[#EA580C] px-3 py-2 rounded-lg mr-2">Remote</button>
                            <button className="bg-[#F0FFF5] text-[#16A34A] px-3 py-2 rounded-lg">Full-time</button>
                        </div>
                    </div>
                </Carousel>

            </div>
            <div className="h-[60%] bg-[#FFF] px-32 flex justify-center items-center flex-col">
                <span className="text-xs mb-2 text-[#4F46E5]">Job application process</span>
                <h1 className="text-3xl font-bold mb-16">How it works</h1>
                <div className="grid grid-cols-3 gap-20">
                    <div className="flex flex-col items-center justify-center">
                        <span className="bg-[#EEF2FF] rounded-full p-2 mb-3">
                            <img src={CreateContactIcons} alt="CreateContactIcons" />
                        </span>
                        <h1 className="font-bold text-xl mb-3">Create an account</h1>
                        <p>Lorem ipsum dolor sit amet consectetur.</p>
                        <p>Eget proin nunc bibendum lorem lobortis </p>
                        <p>nibh ut massa ut.</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <span className="bg-[#EEF2FF] rounded-full p-2 mb-3">
                            <img src={CompletedContactIcons} alt="CompletedContactIcons" />
                        </span>
                        <h1 className="font-bold text-xl mb-3">Complete your profile</h1>
                        <p>Lorem ipsum dolor sit amet consectetur.</p>
                        <p>Eget proin nunc bibendum lorem lobortis</p>
                        <p>nibh ut massa ut.</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <span className="bg-[#EEF2FF] rounded-full p-2 mb-3">
                            <img src={ApplyJobs} alt="ApplyJobs" />
                        </span>
                        <h1 className="font-bold text-xl mb-3">Apply for a job</h1>
                        <p>Ac morbi eget dignissim maecenas est.</p>
                        <p>Faucibus interdum ornare placerat</p>
                        <p>commodo nam.</p>
                    </div>
                </div>
            </div>
            <div className="h-[90%] bg-[#FFF] px-32 grid grid-cols-2 gap-2">
                <div className="py-32">
                    <h1 className="text-5xl font-bold text-black flex flex-col items-start justify-start mb-5">
                        <span>Get a<span className="text-[#818CF8]">perfect match</span>for</span><span>your skills in one click</span>
                    </h1>
                    <div className="text-xs text-[#64748B] mb-20">
                        Just upload your resume and apply for your dream job
                    </div>
                    <button className="rounded-md bg-[#4F46E5] py-3 px-6 text-white flex justify-center items-center"><span className="mr-2">Upload resume</span><img src={UploadIcons} alt="UploadIcons" /></button>
                </div>
                <div className="relative">
                    <span className="absolute top-32 left-52 border border-gray-300 bg-[#F8FAFC] rounded-3xl px-5 py-2 z-10 flex justify-center items-center"><img src={RightWithCircle} alt="RightWithCircle" /><span className="ml-2">94% Skills Matched</span></span>
                    <img src={Ellipse28} alt="Ellipse28" className="absolute top-10 right-10" />
                    <img src={Ellipse29} alt="Ellipse29" className="absolute top-32 left-20" />
                    <img src={Ellipse27} alt="Ellipse27" className="absolute bottom-10 left-1/2" />
                    <span className="absolute bottom-20 left-60 border border-gray-300 bg-[#F8FAFC] rounded-3xl px-5 py-2 z-10 flex justify-center items-center"><img src={NotificationIcon} alt="NotificationIcon" /><span className="ml-2">Job alert</span></span>
                </div>
            </div>
            <div className="h-[70%] bg-[#F8FAFC] px-32 flex flex-col justify-center">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-3xl font-bold">Find best companies</h1>
                    <button className="text-lg flex justify-center items-center text-[#312E81]"><span className="mr-2">All companies</span><img src={ArrowRight} alt="ArrowRight" /></button>
                </div>
                <Carousel
                    swipeable={false}
                    draggable={false}
                    showDots={false}
                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={4000}
                    keyBoardControl={true}
                    customTransition="all .5"
                    transitionDuration={500}
                    arrows={false}
                    renderButtonGroupOutside={true}
                    customButtonGroup={<ButtonGroup />}
                >
                    <div className="p-5 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg mr-3 my-4">
                        <div className="flex items-start justify-between mb-3">
                            <img src={compenyBrand} alt="compenyBrand" />
                            <button className="px-3 py-2 bg-gray-200 rounded-md">
                                15 Jobs
                            </button>
                        </div>
                        <h1 className="text-xl font-bold">Ratna Global Tech</h1>
                        <div className="mb-5 text-[#475569] text-sm flex justify-start items-center">
                            <img src={LocationIcon} alt="LocationIcon" /><span className="ml-2">Hyderabad, Delhi, Mumbai</span>
                        </div>
                    </div>
                    <div className="p-5 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg mr-3 my-4">
                        <div className="flex items-start justify-between mb-3">
                            <img src={compenyBrand} alt="compenyBrand" />
                            <button className="px-3 py-2 bg-gray-200 rounded-md">
                                15 Jobs
                            </button>
                        </div>
                        <h1 className="text-xl font-bold">Ratna Global Tech</h1>
                        <div className="mb-5 text-[#475569] text-sm flex justify-start items-center">
                            <img src={LocationIcon} alt="LocationIcon" /><span className="ml-2">Hyderabad, Delhi, Mumbai</span>
                        </div>
                    </div>
                    <div className="p-5 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg mr-3 my-4">
                        <div className="flex items-start justify-between mb-3">
                            <img src={compenyBrand} alt="compenyBrand" />
                            <button className="px-3 py-2 bg-gray-200 rounded-md">
                                15 Jobs
                            </button>
                        </div>
                        <h1 className="text-xl font-bold">Ratna Global Tech</h1>
                        <div className="mb-5 text-[#475569] text-sm flex justify-start items-center">
                            <img src={LocationIcon} alt="LocationIcon" /><span className="ml-2">Hyderabad, Delhi, Mumbai</span>
                        </div>
                    </div>
                    <div className="p-5 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg mr-3 my-4">
                        <div className="flex items-start justify-between mb-3">
                            <img src={compenyBrand} alt="compenyBrand" />
                            <button className="px-3 py-2 bg-gray-200 rounded-md">
                                15 Jobs
                            </button>
                        </div>
                        <h1 className="text-xl font-bold">Ratna Global Tech</h1>
                        <div className="mb-5 text-[#475569] text-sm flex justify-start items-center">
                            <img src={LocationIcon} alt="LocationIcon" /><span className="ml-2">Hyderabad, Delhi, Mumbai</span>
                        </div>
                    </div>
                    <div className="p-5 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg mr-3 my-4">
                        <div className="flex items-start justify-between mb-3">
                            <img src={compenyBrand} alt="compenyBrand" />
                            <button className="px-3 py-2 bg-gray-200 rounded-md">
                                15 Jobs
                            </button>
                        </div>
                        <h1 className="text-xl font-bold">Ratna Global Tech</h1>
                        <div className="mb-5 text-[#475569] text-sm flex justify-start items-center">
                            <img src={LocationIcon} alt="LocationIcon" /><span className="ml-2">Hyderabad, Delhi, Mumbai</span>
                        </div>
                    </div>
                    <div className="p-5 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg mr-3 my-4">
                        <div className="flex items-start justify-between mb-3">
                            <img src={compenyBrand} alt="compenyBrand" />
                            <button className="px-3 py-2 bg-gray-200 rounded-md">
                                15 Jobs
                            </button>
                        </div>
                        <h1 className="text-xl font-bold">Ratna Global Tech</h1>
                        <div className="mb-5 text-[#475569] text-sm flex justify-start items-center">
                            <img src={LocationIcon} alt="LocationIcon" /><span className="ml-2">Hyderabad, Delhi, Mumbai</span>
                        </div>
                    </div>
                </Carousel>
            </div>
            <div className="h-[70%] bg-[#FFF] px-32 flex flex-col justify-center">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-3xl font-bold">Featured cities</h1>
                    <button className="text-lg flex justify-center items-center text-[#312E81]"><span className="mr-2">All cities</span><img src={ArrowRight} alt="ArrowRight" /></button>
                </div>
                <div className="grid grid-cols-4 gap-8 mb-5">
                    <div className="p-5 bg-[#F1F5F9] rounded-xl shadow-sm hover:shadow-lg">
                        <div className="flex justify-between items-center mb-3">
                            <button className="flex justify-center items-center text-lg font-bold"><span className="mr-2">Ratna Global Tech</span><img src={ArrowRight} alt="ArrowRight" /></button>
                        </div>
                        <button className="px-2 py-1 bg-gray-200 rounded-md text-sm">
                            130 jobs
                        </button>
                    </div>
                    <div className="p-5 bg-[#F1F5F9] rounded-xl shadow-sm hover:shadow-lg">
                        <div className="flex justify-between items-center mb-3">
                            <button className="flex justify-center items-center text-lg font-bold"><span className="mr-2">Ratna Global Tech</span><img src={ArrowRight} alt="ArrowRight" /></button>
                        </div>
                        <button className="px-2 py-1 bg-gray-200 rounded-md text-sm">
                            130 jobs
                        </button>
                    </div>
                    <div className="p-5 bg-[#F1F5F9] rounded-xl shadow-sm hover:shadow-lg">
                        <div className="flex justify-between items-center mb-3">
                            <button className="flex justify-center items-center text-lg font-bold"><span className="mr-2">Ratna Global Tech</span><img src={ArrowRight} alt="ArrowRight" /></button>
                        </div>
                        <button className="px-2 py-1 bg-gray-200 rounded-md text-sm">
                            130 jobs
                        </button>
                    </div>
                    <div className="p-5 bg-[#F1F5F9] rounded-xl shadow-sm hover:shadow-lg">
                        <div className="flex justify-between items-center mb-3">
                            <button className="flex justify-center items-center text-lg font-bold"><span className="mr-2">Ratna Global Tech</span><img src={ArrowRight} alt="ArrowRight" /></button>
                        </div>
                        <button className="px-2 py-1 bg-gray-200 rounded-md text-sm">
                            130 jobs
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-8">
                    <div className="p-5 bg-[#F1F5F9] rounded-xl shadow-sm hover:shadow-lg">
                        <div className="flex justify-between items-center mb-3">
                            <button className="flex justify-center items-center text-lg font-bold"><span className="mr-2">Ratna Global Tech</span><img src={ArrowRight} alt="ArrowRight" /></button>
                        </div>
                        <button className="px-2 py-1 bg-gray-200 rounded-md text-sm">
                            130 jobs
                        </button>
                    </div>
                    <div className="p-5 bg-[#F1F5F9] rounded-xl shadow-sm hover:shadow-lg">
                        <div className="flex justify-between items-center mb-3">
                            <button className="flex justify-center items-center text-lg font-bold"><span className="mr-2">Ratna Global Tech</span><img src={ArrowRight} alt="ArrowRight" /></button>
                        </div>
                        <button className="px-2 py-1 bg-gray-200 rounded-md text-sm">
                            130 jobs
                        </button>
                    </div>
                    <div className="p-5 bg-[#F1F5F9] rounded-xl shadow-sm hover:shadow-lg">
                        <div className="flex justify-between items-center mb-3">
                            <button className="flex justify-center items-center text-lg font-bold"><span className="mr-2">Ratna Global Tech</span><img src={ArrowRight} alt="ArrowRight" /></button>
                        </div>
                        <button className="px-2 py-1 bg-gray-200 rounded-md text-sm">
                            130 jobs
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPage;