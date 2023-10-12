import React from 'react';
import noRecordsFound from '../../assets/png/no-record-found.png';

const NoRecords = () => {
  return (
    <div className="h-[37rem] bg-[#FFF] flex justify-center items-center rounded-lg">
      <img src={noRecordsFound} alt="noRecordsFound" />
    </div>
  )
}

export default NoRecords;