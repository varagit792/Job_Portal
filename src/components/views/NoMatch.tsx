import React, { Component, ErrorInfo } from 'react';
import pageNotFound from '../../assets/jpeg/pageNotFound.jpg';

const NoMatch = () => {


  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex justify-center items-center">
        <img src={pageNotFound}  />
      </div>
      {/* <h1 className=" text-4xl font-bold mt-5">Page you are looking for is not found !.</h1> */}
    </div>
  )
}

export default NoMatch;