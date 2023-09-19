import React from 'react'
import Carousel from "react-multi-carousel";
import LocationIcon from '../../../assets/svg/LocationIcon.svg';
import ArrowRight from '../../../assets/svg/ArrowRight.svg';
import companyBrand from '../../../assets/png/compenyBrand.png';
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
const JobRecommendations = () => {


  return (
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
            <img src={companyBrand} alt="companyBrand" />
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
            <img src={companyBrand} alt="companyBrand" />
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
            <img src={companyBrand} alt="companyBrand" />
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
            <img src={companyBrand} alt="companyBrand" />
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
  )
}

export default JobRecommendations