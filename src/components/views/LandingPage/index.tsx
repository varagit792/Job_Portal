import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CreateProfile from '../../../assets/svg/createProfile.svg';
import CreateProfile1 from '../../../assets/svg/createProfile1.svg';
import SearchIcon from '../../../assets/svg/searchIcon.svg';
import ArrowRight from '../../../assets/svg/ArrowRight.svg';
import compenyBrand from '../../../assets/png/compenyBrand.png';
import ThreeDots from '../../../assets/svg/threeDots.svg';
import BookMark from '../../../assets/svg/bookMark.svg';
import CreateContactIcons from '../../../assets/svg/CreateContactIcons.svg';
import CompletedContactIcons from '../../../assets/svg/CompletedContactIcons.svg';
import ApplyJobs from '../../../assets/svg/applyJobs.svg';
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
import StarIcon from '../../../assets/svg/starIcon.svg';


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
            <div className="h-[90%] bg-[#FFF] px-32 grid grid-cols-2 gap-2">
                <div className="flex flex-col justify-center items-start">
                    <h1 className="text-5xl font-bold text-black flex flex-col items-start justify-start mb-3">
                        <span>Get a<span className="text-[#818CF8]">perfect match</span>for</span><span>your skills in one click</span>
                    </h1>
                    <div className="text-base text-[#312E81] mb-16">
                        Just upload your resume and apply for your dream job
                    </div>
                    <div className="flex space-x-6 items-center z-10">
                        <button className="bg-[#4F46E5] rounded-md py-2 text-white w-44 flex items-center justify-center"><span className="mr-3">Explore</span><img src={SearchIcon} alt="SearchIcon" /></button>
                        <button className="bg-[#EEF2FF] rounded-md py-2 w-44 flex items-center justify-center"><span className="mr-3">Create profile</span><img src={CreateProfile} alt="CreateProfile" /></button>
                    </div>
                </div>
                <div className="relative">
                    <span className="absolute top-36 left-44 border border-gray-300 bg-[#F8FAFC] rounded-3xl px-5 py-2 z-10 flex justify-center items-center"><img src={RightWithCircle} alt="RightWithCircle" /><span className="ml-2">94% Skills Matched</span></span>
                    <img src={Ellipse28} alt="Ellipse28" className="absolute top-20 right-10" />
                    <img src={Ellipse29} alt="Ellipse29" className="absolute top-1/4 left-20" />
                    <img src={Ellipse27} alt="Ellipse27" className="absolute top-1/2 left-1/2" />
                    <span className="absolute top-2/3 left-48 border border-gray-300 bg-[#F8FAFC] rounded-3xl px-5 py-2 z-10 flex justify-center items-center"><img src={NotificationIcon} alt="NotificationIcon" /><span className="ml-2">Job alert</span></span>
                </div>
            </div>
            <div className="h-[80%] bg-[#F8FAFC] px-32 flex flex-col justify-center">
                <div className="flex justify-between items-center mb-10 font-bold">
                    <h1 className="text-xl">Most demanding categories</h1>
                    <button className="text-base flex justify-center items-center text-[#312E81]"><span className="mr-2">All categories</span><img src={ArrowRight} alt="ArrowRight" /></button>
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
                    <div className="p-5 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg mr-4 mb-5">
                        <div className="flex items-start justify-between mb-3">
                            <img src={compenyBrand} alt="compenyBrand" />
                            <div>
                                <button className="p-2">
                                    <img src={BookMark} alt="BookMark" />
                                </button>
                                <button className="p-2">
                                    <img src={ThreeDots} alt="ThreeDots" />
                                </button>
                            </div>
                        </div>
                        <h1 className="text-base font-bold">Dot net developer</h1>
                        <span className="text-[#94A3B8] text-sm">Ratna Global Tech</span>
                        <hr className="my-5" />
                        <div className="mb-3 text-[#475569] text-xs flex justify-start items-center">
                            <img src={ExperienceIcon} alt="ExperienceIcon" width="15rem" height="15rem" /><span className="ml-2">6+ yrs exp.</span>
                        </div>
                        <div className="mb-3 text-[#475569] text-xs flex justify-start items-center">
                            <img src={MoneyIcon} alt="MoneyIcon" width="15rem" height="15rem" /><span className="ml-2">12 LPA</span>
                        </div>
                        <div className="mb-5 text-[#475569] text-xs flex justify-start items-center">
                            <img src={LocationIcon} alt="LocationIcon" width="15rem" height="15rem" /><span className="ml-2">Hyderabad, Delhi, Mumbai</span>
                        </div>
                        <div className="flex">
                            <button className="bg-[#FFFAF2] text-[#EA580C] px-3 py-2 rounded-lg mr-2 text-sm">Remote</button>
                            <button className="bg-[#F0FFF5] text-[#16A34A] px-3 py-2 rounded-lg text-sm">Full-time</button>
                        </div>
                    </div>
                    <div className="p-5 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg mr-4 mb-5">
                        <div className="flex items-start justify-between mb-3">
                            <img src={compenyBrand} alt="compenyBrand" />
                            <div>
                                <button className="p-2">
                                    <img src={BookMark} alt="BookMark" />
                                </button>
                                <button className="p-2">
                                    <img src={ThreeDots} alt="ThreeDots" />
                                </button>
                            </div>
                        </div>
                        <h1 className="text-base font-bold">Dot net developer</h1>
                        <span className="text-[#94A3B8] text-sm">Ratna Global Tech</span>
                        <hr className="my-5" />
                        <div className="mb-3 text-[#475569] text-xs flex justify-start items-center">
                            <img src={ExperienceIcon} alt="ExperienceIcon" width="15rem" height="15rem" /><span className="ml-2">6+ yrs exp.</span>
                        </div>
                        <div className="mb-3 text-[#475569] text-xs flex justify-start items-center">
                            <img src={MoneyIcon} alt="MoneyIcon" width="15rem" height="15rem" /><span className="ml-2">12 LPA</span>
                        </div>
                        <div className="mb-5 text-[#475569] text-xs flex justify-start items-center">
                            <img src={LocationIcon} alt="LocationIcon" width="15rem" height="15rem" /><span className="ml-2">Hyderabad, Delhi, Mumbai</span>
                        </div>
                        <div className="flex">
                            <button className="bg-[#FFFAF2] text-[#EA580C] px-3 py-2 rounded-lg mr-2 text-sm">Remote</button>
                            <button className="bg-[#F0FFF5] text-[#16A34A] px-3 py-2 rounded-lg text-sm">Full-time</button>
                        </div>
                    </div>
                    <div className="p-5 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg mr-4 mb-5">
                        <div className="flex items-start justify-between mb-3">
                            <img src={compenyBrand} alt="compenyBrand" />
                            <div>
                                <button className="p-2">
                                    <img src={BookMark} alt="BookMark" />
                                </button>
                                <button className="p-2">
                                    <img src={ThreeDots} alt="ThreeDots" />
                                </button>
                            </div>
                        </div>
                        <h1 className="text-base font-bold">Dot net developer</h1>
                        <span className="text-[#94A3B8] text-sm">Ratna Global Tech</span>
                        <hr className="my-5" />
                        <div className="mb-3 text-[#475569] text-xs flex justify-start items-center">
                            <img src={ExperienceIcon} alt="ExperienceIcon" width="15rem" height="15rem" /><span className="ml-2">6+ yrs exp.</span>
                        </div>
                        <div className="mb-3 text-[#475569] text-xs flex justify-start items-center">
                            <img src={MoneyIcon} alt="MoneyIcon" width="15rem" height="15rem" /><span className="ml-2">12 LPA</span>
                        </div>
                        <div className="mb-5 text-[#475569] text-xs flex justify-start items-center">
                            <img src={LocationIcon} alt="LocationIcon" width="15rem" height="15rem" /><span className="ml-2">Hyderabad, Delhi, Mumbai</span>
                        </div>
                        <div className="flex">
                            <button className="bg-[#FFFAF2] text-[#EA580C] px-3 py-2 rounded-lg mr-2 text-sm">Remote</button>
                            <button className="bg-[#F0FFF5] text-[#16A34A] px-3 py-2 rounded-lg text-sm">Full-time</button>
                        </div>
                    </div>
                    <div className="p-5 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg mr-4 mb-5">
                        <div className="flex items-start justify-between mb-3">
                            <img src={compenyBrand} alt="compenyBrand" />
                            <div>
                                <button className="p-2">
                                    <img src={BookMark} alt="BookMark" />
                                </button>
                                <button className="p-2">
                                    <img src={ThreeDots} alt="ThreeDots" />
                                </button>
                            </div>
                        </div>
                        <h1 className="text-base font-bold">Dot net developer</h1>
                        <span className="text-[#94A3B8] text-sm">Ratna Global Tech</span>
                        <hr className="my-5" />
                        <div className="mb-3 text-[#475569] text-xs flex justify-start items-center">
                            <img src={ExperienceIcon} alt="ExperienceIcon" width="15rem" height="15rem" /><span className="ml-2">6+ yrs exp.</span>
                        </div>
                        <div className="mb-3 text-[#475569] text-xs flex justify-start items-center">
                            <img src={MoneyIcon} alt="MoneyIcon" width="15rem" height="15rem" /><span className="ml-2">12 LPA</span>
                        </div>
                        <div className="mb-5 text-[#475569] text-xs flex justify-start items-center">
                            <img src={LocationIcon} alt="LocationIcon" width="15rem" height="15rem" /><span className="ml-2">Hyderabad, Delhi, Mumbai</span>
                        </div>
                        <div className="flex">
                            <button className="bg-[#FFFAF2] text-[#EA580C] px-3 py-2 rounded-lg mr-2 text-sm">Remote</button>
                            <button className="bg-[#F0FFF5] text-[#16A34A] px-3 py-2 rounded-lg text-sm">Full-time</button>
                        </div>
                    </div>
                </Carousel>
            </div>
            <div className="bg-[#FFF] px-32 py-10 flex justify-center items-center flex-col">
                <span className="text-xs mb-2 text-[#4F46E5]">Job application process</span>
                <h1 className="text-3xl font-bold mb-16">How it works</h1>
                <div className="grid grid-cols-3 gap-20 mb-16">
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
                <div className=" flex justify-between items-end bg-gradient-to-r from-[#EEF2FF] to-[#C7D2FE] w-full px-20 py-28 rounded-lg">
                    <div>
                        <span className="text-[#4F46E5] text-xs">OVER 1400 JOB OPENINGS</span>
                        <h1 className="text-4xl text-[#312E81] font-bold">
                            <span>Create your profile and get</span><br />
                            <span> <span className="text-[#818CF8]">personalized</span> recommendations</span>
                        </h1>
                    </div>
                    <button className="bg-[#4F46E5] rounded-md py-2 w-44 flex items-center justify-center text-white"><span className="mr-3">Create profile</span><img src={CreateProfile1} alt="CreateProfile" /></button>
                </div>
            </div>
            <div className="h-[65%] bg-[#F1F5F9] px-32 flex flex-col justify-center">
                <div className="flex justify-between items-center mb-10 font-bold">
                    <h1 className="text-xl">Find best companies</h1>
                    <button className="text-base flex justify-center items-center text-[#312E81]"><span className="mr-2">All companies</span><img src={ArrowRight} alt="ArrowRight" /></button>
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
                    <div className="p-5 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg mr-3 mb-5">
                        <div className="flex items-start justify-between mb-3">
                            <img src={compenyBrand} alt="compenyBrand" />
                            <button className="px-3 py-2 bg-gray-200 rounded-md text-xs">
                                15 Jobs
                            </button>
                        </div>
                        <h1 className="text-base font-bold mb-1">Ratna Global Tech</h1>
                        <div className="text-[#475569] text-xs flex justify-start items-center">
                            <img src={LocationIcon} alt="LocationIcon" width="15rem" height="15rem" /><span className="ml-2">Hyderabad, Delhi, Mumbai</span>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-start items-center text-xs">
                            <div className="flex justify-start items-center">
                                <img src={StarIcon} alt="StarIcon" width="15rem" height="15rem" />
                                <span className="ml-1">3.5</span>
                            </div>
                            <span className="border border-gray-300 h-5 mx-2"></span>
                            <span className="text-[#64748B]">5k+ Reviews</span>
                        </div>
                    </div>
                    <div className="p-5 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg mr-3 mb-5">
                        <div className="flex items-start justify-between mb-3">
                            <img src={compenyBrand} alt="compenyBrand" />
                            <button className="px-3 py-2 bg-gray-200 rounded-md text-xs">
                                15 Jobs
                            </button>
                        </div>
                        <h1 className="text-base font-bold mb-1">Ratna Global Tech</h1>
                        <div className="text-[#475569] text-xs flex justify-start items-center">
                            <img src={LocationIcon} alt="LocationIcon" width="15rem" height="15rem" /><span className="ml-2">Hyderabad, Delhi, Mumbai</span>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-start items-center text-xs">
                            <div className="flex justify-start items-center">
                                <img src={StarIcon} alt="StarIcon" width="15rem" height="15rem" />
                                <span className="ml-1">3.5</span>
                            </div>
                            <span className="border border-gray-300 h-5 mx-2"></span>
                            <span className="text-[#64748B]">5k+ Reviews</span>
                        </div>
                    </div>
                    <div className="p-5 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg mr-3 mb-5">
                        <div className="flex items-start justify-between mb-3">
                            <img src={compenyBrand} alt="compenyBrand" />
                            <button className="px-3 py-2 bg-gray-200 rounded-md text-xs">
                                15 Jobs
                            </button>
                        </div>
                        <h1 className="text-base font-bold mb-1">Ratna Global Tech</h1>
                        <div className="text-[#475569] text-xs flex justify-start items-center">
                            <img src={LocationIcon} alt="LocationIcon" width="15rem" height="15rem" /><span className="ml-2">Hyderabad, Delhi, Mumbai</span>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-start items-center text-xs">
                            <div className="flex justify-start items-center">
                                <img src={StarIcon} alt="StarIcon" width="15rem" height="15rem" />
                                <span className="ml-1">3.5</span>
                            </div>
                            <span className="border border-gray-300 h-5 mx-2"></span>
                            <span className="text-[#64748B]">5k+ Reviews</span>
                        </div>
                    </div>
                    <div className="p-5 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg mr-3 mb-5">
                        <div className="flex items-start justify-between mb-3">
                            <img src={compenyBrand} alt="compenyBrand" />
                            <button className="px-3 py-2 bg-gray-200 rounded-md text-xs">
                                15 Jobs
                            </button>
                        </div>
                        <h1 className="text-base font-bold mb-1">Ratna Global Tech</h1>
                        <div className="text-[#475569] text-xs flex justify-start items-center">
                            <img src={LocationIcon} alt="LocationIcon" width="15rem" height="15rem" /><span className="ml-2">Hyderabad, Delhi, Mumbai</span>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-start items-center text-xs">
                            <div className="flex justify-start items-center">
                                <img src={StarIcon} alt="StarIcon" width="15rem" height="15rem" />
                                <span className="ml-1">3.5</span>
                            </div>
                            <span className="border border-gray-300 h-5 mx-2"></span>
                            <span className="text-[#64748B]">5k+ Reviews</span>
                        </div>
                    </div>
                </Carousel>
            </div>
            <div className="h-[65%] bg-[#F8FAFC] px-32 flex flex-col justify-center">
                <div className="flex justify-between items-center mb-10 font-bold">
                    <h1 className="text-xl">Featured cities</h1>
                    <button className="text-base flex justify-center items-center text-[#312E81]"><span className="mr-2">All Cities</span><img src={ArrowRight} alt="ArrowRight" /></button>
                </div>
                <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="p-4 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg flex flex-col justify-center items-start">
                        <div className="flex justify-between items-center mb-3 text-sm font-semibold w-full">
                            <span>Hyderabad, India</span>
                            <button><img src={ArrowRight} alt="ArrowRight" width="8rem" height="8rem" /></button>
                        </div>
                        <button className="px-2 py-1 bg-gray-200 rounded-md text-xs">
                            130 jobs
                        </button>
                    </div>
                    <div className="p-4 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg flex flex-col justify-center items-start">
                        <div className="flex justify-between items-center mb-3 text-sm font-semibold w-full">
                            <span>Delhi, India</span>
                            <button><img src={ArrowRight} alt="ArrowRight" width="8rem" height="8rem" /></button>
                        </div>
                        <button className="px-2 py-1 bg-gray-200 rounded-md text-xs">
                            130 jobs
                        </button>
                    </div>
                    <div className="p-4 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg flex flex-col justify-center items-start">
                        <div className="flex justify-between items-center mb-3 text-sm font-semibold w-full">
                            <span>Noida, India</span>
                            <button><img src={ArrowRight} alt="ArrowRight" width="8rem" height="8rem" /></button>
                        </div>
                        <button className="px-2 py-1 bg-gray-200 rounded-md text-xs">
                            130 jobs
                        </button>
                    </div>
                    <div className="p-4 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg flex flex-col justify-center items-start">
                        <div className="flex justify-between items-center mb-3 text-sm font-semibold w-full">
                            <span>Noida, India</span>
                            <button><img src={ArrowRight} alt="ArrowRight" width="8rem" height="8rem" /></button>
                        </div>
                        <button className="px-2 py-1 bg-gray-200 rounded-md text-xs">
                            130 jobs
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg flex flex-col justify-center items-start">
                        <div className="flex justify-between items-center mb-3 text-sm font-semibold w-full">
                            <span>Pune, India</span>
                            <button><img src={ArrowRight} alt="ArrowRight" width="8rem" height="8rem" /></button>
                        </div>
                        <button className="px-2 py-1 bg-gray-200 rounded-md text-xs">
                            130 jobs
                        </button>
                    </div>
                    <div className="p-4 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg flex flex-col justify-center items-start">
                        <div className="flex justify-between items-center mb-3 text-sm font-semibold w-full">
                            <span>Bangalore, India</span>
                            <button><img src={ArrowRight} alt="ArrowRight" width="8rem" height="8rem" /></button>
                        </div>
                        <button className="px-2 py-1 bg-gray-200 rounded-md text-xs">
                            130 jobs
                        </button>
                    </div>
                    <div className="p-4 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg flex flex-col justify-center items-start">
                        <div className="flex justify-between items-center mb-3 text-sm font-semibold w-full">
                            <span>Bangalore, India</span>
                            <button><img src={ArrowRight} alt="ArrowRight" width="8rem" height="8rem" /></button>
                        </div>
                        <button className="px-2 py-1 bg-gray-200 rounded-md text-xs">
                            130 jobs
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPage;