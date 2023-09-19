import React from 'react'
import ArrowRight from '../../../assets/svg/ArrowRight.svg';
import CityItem from '../../commonComponents/CityItem';

const FeaturedCities = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-10 font-bold">
        <h1 className="text-xl">Featured cities</h1>
        <button className="text-base flex justify-center items-center text-[#312E81]"><span className="mr-2">All Cities</span><img src={ArrowRight} alt="ArrowRight" /></button>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <CityItem city="Hyderabad" numberOfJob={130} />
        <CityItem city="Delhi" numberOfJob={130} />
        <CityItem city="Noida" numberOfJob={130} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <CityItem city="Pune" numberOfJob={130} />
        <CityItem city="Bangalore" numberOfJob={130} />
      </div>
    </div>
  )
}

export default FeaturedCities