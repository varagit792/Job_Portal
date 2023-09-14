import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Profile from '../../../assets/png/profile.png';
import PhoneIcon from '../../../assets/svg/Phone.svg';
import EmailIcon from '../../../assets/svg/Email.svg';
import LocationIcon from '../../../assets/svg/LocationIcon.svg';
import Ellipse29 from '../../../assets/svg/Ellipse 29.svg';
import RightWithCircle from '../../../assets/svg/rightwithcircle.svg';
import NotificationIcon from '../../../assets/svg/notificationIcon.svg';
import SearchIcon from '../../../assets/svg/searchIcon.svg';
import ArrowRight from '../../../assets/svg/ArrowRight.svg';
import StarIcon from '../../../assets/svg/starIcon.svg';
import compenyBrand from '../../../assets/png/compenyBrand.png';
import ThreeDots from '../../../assets/svg/threeDots.svg';
import BookMark from '../../../assets/svg/bookMark.svg';
import MoneyIcon from '../../../assets/svg/MoneyIcon.svg';
import ExperienceIcon from '../../../assets/svg/ExperienceIcon.svg';
import { FiChevronLeft } from 'react-icons/fi';
import { BiChevronRight } from 'react-icons/bi';

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 3,
        slidesToSlide: 4
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 2.5,
        slidesToSlide: 2
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
        <div className="carousel-button-group gap-2 flex justify-end 
        items-center w-full">
            <button className='block p-3 bg-[#818CF8] text-white rounded-l-md' onClick={() =>
                previous()}> <FiChevronLeft /></button>
            <button onClick={() => next()}><span className='block p-3 bg-[#818CF8] text-white rounded-r-md' ><BiChevronRight /></span></button>
        </div>
    );
};

const HomePage = () => {
    return (
        <>
            <div className="h-[10%] w-full"></div>
            <div className="grid grid-cols-7 gap-12 px-32 bg-[#F8FAFC] py-6">
                <div className="col-start-1 col-end-3">
                    <div className="bg-[#FFF] rounded-lg shadow-sm w-full sticky top-[13%] overflow-hidden">
                        <div className="w-full h-40 relative">
                            <div className="w-full h-2/3 bg-gradient-to-r from-[#EEF2FF] to-[#C7D2FE] rounded-t-lg">
                            </div>
                            <div className="w-full h-1/3 bg-[#FFF]">
                            </div>
                            <div className="absolute bg-[#FFF] top-2/3 left-5 -translate-y-1/2 h-32 w-32 rounded-full p-1">
                                <img src={Profile} alt="profile" className="rounded-full" />
                            </div>
                        </div>
                        <div className="px-5 py-5">
                            <h1 className="text-xl font-bold mb-1">Vara Prasad Reddy</h1>
                            <h1 className="mb-1">UI/ UX Designer</h1>
                            <h1>@ Ratna Global Tech</h1>
                            <div className="mt-5 text-sm text-[#64748B]">
                                <div className="flex justify-start items-center mb-1">
                                    <img src={EmailIcon} alt="EmailIcon" width="12rem" height="12rem" />
                                    <span className="ml-2 overflow-hidden inline-block whitespace-nowrap text-ellipsis">varaprasad.urumadla@ratnaglobaltech.com</span>
                                </div>
                                <div className="flex justify-start items-center mb-1">
                                    <img src={PhoneIcon} alt="PhoneIcon" width="12rem" height="12rem" />
                                    <span className="ml-2 overflow-hidden inline-block whitespace-nowrap text-ellipsis">+91 7097272403</span>
                                </div>
                                <div className="flex justify-start items-center">
                                    <img src={LocationIcon} alt="LocationIcon" width="12rem" height="12rem" />
                                    <span className="ml-2 overflow-hidden inline-block whitespace-nowrap text-ellipsis">Hyderabad, India</span>
                                </div>
                            </div>
                            <hr className="mt-5 mb-5" />
                            <div className="w-full bg-[#C7D2FE] rounded-md mb-2">
                                <div className="bg-blue-700 text-center text-xs font-medium h-2.5 relative rounded-md" style={{ width: "40%" }}>
                                    <span className="bg-[#EEF2FF] rounded-md border border-[#C7D2FE] text-[#312E81] absolute right-0 top-1/2 px-1 py-0.5 -translate-y-1/2">40%</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <h1 className="text-gray-500 text-sm">Profile Completed</h1>
                                <Link to="/profile" className="border-b border-black text-sm">Add Details</Link>
                            </div>
                            <hr className="mt-5 mb-5" />
                            <p className="mb-5 text-sm">I turn ideas into unique and user-friendly digital experience through UI UX design</p>
                            <button className="bg-[#EEF2FF] text-[#312E81] py-2 px-6 rounded-md">Resume</button>
                        </div>
                    </div>
                </div>
                <div className="col-start-3 col-end-8">
                    <div className="bg-gradient-to-r from-[#EEF2FF] to-[#C7D2FE] rounded-lg mb-12 grid grid-cols-5 gap-8 px-10 py-20">
                        <div className="col-start-1 col-end-4 flex flex-col justify-center">
                            <h1 className="text-3xl font-bold text-[#312E81] flex flex-col items-start justify-start mb-10">
                                <span>Discover your <span className="text-[#818CF8]">dream job</span> & empower you career</span>
                            </h1>
                            <button className="bg-[#4F46E5] rounded-md py-3 text-white w-44 flex items-center justify-center"><span className="mr-3">Explore</span><img src={SearchIcon} alt="SearchIcon" /></button>
                        </div>
                        <div className="relative col-start-4 col-end-6 flex justify-start items-center">
                            <img src={Ellipse29} alt="Ellipse29" />
                            <span className="absolute left-32 border border-gray-300 bg-[#F8FAFC] rounded-3xl px-5 py-3 z-10 flex justify-center items-center"><img src={NotificationIcon} alt="NotificationIcon" /><span className="ml-2">Job alert</span></span>
                            <span className="absolute top-32 left-20 border border-gray-300 bg-[#F8FAFC] rounded-3xl px-5 py-3 z-10 flex justify-center items-center"><img src={RightWithCircle} alt="RightWithCircle" /><span className="ml-2">94% Skills Matched</span></span>
                        </div>
                    </div>
                    <div className="mb-10">
                        <div className="flex justify-between items-center mb-10 font-bold">
                            <h1 className="text-xl">Most demanding categories</h1>
                            <button className="flex justify-center items-center text-[#312E81] text-base"><span className="mr-2">All Categories</span><img src={ArrowRight} alt="ArrowRight" /></button>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="p-5 shadow-sm rounded-lg bg-[#FFF] flex justify-between items-center">
                                <h1 className="text-base font-semibold">Product Management</h1>
                                <span className="text-xs m-0 px-3 py-2 rounded-full bg-[#F1F5F9]">12</span>
                            </div>
                            <div className="p-5 shadow-sm rounded-lg bg-[#FFF] flex justify-between items-center">
                                <h1 className="text-base font-semibold">Human Resources</h1>
                                <span className="text-xs m-0 px-3 py-2 rounded-full bg-[#F1F5F9]">12</span>
                            </div>
                            <div className="p-5 shadow-sm rounded-lg bg-[#FFF] flex justify-between items-center">
                                <h1 className="text-base font-semibold">Design</h1>
                                <span className="text-xs m-0 px-3 py-2 rounded-full bg-[#F1F5F9]">12</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            <div className="p-5 shadow-sm rounded-lg bg-[#FFF] flex justify-between items-center">
                                <h1 className="text-base font-semibold">Retail</h1>
                                <span className="text-xs m-0 px-3 py-2 rounded-full bg-[#F1F5F9]">12</span>
                            </div>
                            <div className="p-5 shadow-sm rounded-lg bg-[#FFF] flex justify-between items-center">
                                <h1 className="text-base font-semibold">Marketing</h1>
                                <span className="text-xs m-0 px-3 py-2 rounded-full bg-[#F1F5F9]">12</span>
                            </div>
                            <div className="p-5 shadow-sm rounded-lg bg-[#FFF] flex justify-between items-center">
                                <h1 className="text-base font-semibold">Finance</h1>
                                <span className="text-xs m-0 px-3 py-2 rounded-full bg-[#F1F5F9]">12</span>
                            </div>
                            <div className="p-5 shadow-sm rounded-lg bg-[#FFF] flex justify-between items-center">
                                <h1 className="text-base font-semibold">Logistics</h1>
                                <span className="text-xs m-0 px-3 py-2 rounded-full bg-[#F1F5F9]">12</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-10 font-bold">
                            <h1 className="text-xl">Job recommendations</h1>
                            <button className="text-base flex justify-center items-center text-[#312E81]"><span className="mr-2">All Jobs</span><img src={ArrowRight} alt="ArrowRight" /></button>
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
                    <hr className="my-10" />
                    <div>
                        <div className="flex justify-between items-center mb-10 font-bold">
                            <h1 className="text-xl">Top companies hiring</h1>
                            <button className="text-base flex justify-center items-center text-[#312E81]"><span className="mr-2">All Jobs</span><img src={ArrowRight} alt="ArrowRight" /></button>
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
                    <hr className="my-10" />
                    <div>
                        <div className="flex justify-between items-center mb-10 font-bold">
                            <h1 className="text-xl">Featured cities</h1>
                            <button className="text-base flex justify-center items-center text-[#312E81]"><span className="mr-2">All Cities</span><img src={ArrowRight} alt="ArrowRight" /></button>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mb-4">
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
                        </div>
                        <div className="grid grid-cols-2 gap-4">
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
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default HomePage;