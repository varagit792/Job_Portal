import React from 'react';
import noRecordsFound from '../../assets/png/no-record-found.png';

const NoRecords = () => {
  return (
      <div className="h-[90%] bg-[#FFF] px-32">
        <img src={ noRecordsFound } alt="noRecordsFound"/>
      </div>
  )
}

export default NoRecords;