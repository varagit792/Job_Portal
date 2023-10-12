import React from 'react'
import TickIcons from '../../assets/svg/tick_icons.svg';
import group5 from '../../assets/svg/group5.svg';

const TickRecruiter = ({ tickNumber, tickStatus }: any) => {
  return (
    <>
      {tickStatus === 'done' && <span className="w-7 h-7 mr-2 shrink-0 grow-0 rounded-full bg-[#4F46E5] flex items-center justify-center">
        <img src={TickIcons} alt="TickIcons" className='w-3 h-3' />
      </span>}

      {tickStatus === 'working' &&
        <span className={`w-7 h-7 mr-2 shrink-0 grow-0 bg-cover bg-center rounded-full  bg-[#EEF2FF]  flex items-center justify-center `} style={{ backgroundImage: `url(${group5})` }}>
          <span className=''>{tickNumber}</span>
        </span>}

      {tickStatus === 'pending' && <span className="w-7 h-7 mr-2 shrink-0 grow-0 rounded-full  bg-[#EEF2FF] flex items-center justify-center">
        <span className=''>{tickNumber}</span>
      </span>}

    </>
  )
}

export default TickRecruiter