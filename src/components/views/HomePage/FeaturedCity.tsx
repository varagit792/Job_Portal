import React, { useEffect } from 'react'
import ArrowRight from '../../../assets/svg/ArrowRight.svg';
import CityItem from '../../commonComponents/CityItem';
import { useAppDispatch, useAppSelector } from '../../..';
import { cityGet, clearGetCitySlice } from '../../../store/reducers/dropdown/city';

const FeaturedCity = ({ allJobs }:any) => {
  const dispatch = useAppDispatch();
  const { success, city } = useAppSelector((state) => state.getCity);

  useEffect(() => {
    dispatch(cityGet());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      dispatch(clearGetCitySlice());
    }
  }, [dispatch, success]);

  return (
    <div>
      <div className="flex justify-between items-center mb-10 font-bold">
        <h1 className="text-xl">Featured cities</h1>
        <button className="text-base flex justify-center items-center text-[#312E81]"><span className="mr-2">All Cities</span><img src={ArrowRight} alt="ArrowRight" /></button>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {allJobs?.slice(0, 3)?.map((item: any) => <CityItem item={item} />)}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {allJobs?.slice(3, 5)?.map((item: any) => <CityItem item={item} />)}
      </div>
    </div>
  )
}

export default FeaturedCity