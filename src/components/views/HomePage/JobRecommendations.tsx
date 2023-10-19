import React, { useEffect, useState } from 'react'
import Carousel from "react-multi-carousel";
import ArrowRight from '../../../assets/svg/ArrowRight.svg';
import { FiChevronLeft } from 'react-icons/fi';
import { BiChevronRight } from 'react-icons/bi';
import JobListItem from '../../commonComponents/JobListItem';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../..';
import { getFilterJobs } from '../../../store/reducers/jobs/GetFilterJobs';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
    slidesToSlide: 4
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
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

  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const { allJobs } = useAppSelector((state) => state.getFilterJobs);

  useEffect(() => {
    dispatch(getFilterJobs({ page }));
  }, [page, dispatch]);

  const onClickJobItem = (jobId: any) => {
    window.open(`/allJobs/jobDescription/${jobId}`,'_blank')
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-10 font-bold">
        <h1 className="text-xl">Job recommendations</h1>
        <Link to="/allJobs" className="text-base flex justify-center items-center text-[#312E81]"><span className="mr-2">All Jobs</span><img src={ArrowRight} alt="ArrowRight" /></Link>
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
        {allJobs?.slice(0,8).map((job,index) => index<=7 &&
          <JobListItem
          jobItem={job}
          onClickJobItem={onClickJobItem}
          />
        )}
      </Carousel>
    </div>
  )
}

export default JobRecommendations