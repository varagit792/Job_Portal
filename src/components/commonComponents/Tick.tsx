import React from 'react'
import TickIcons from '../../assets/svg/tick_icons.svg';

const Tick = ({ tickNumber, tickStatus }: any) => {
  return (
    <>
      {tickStatus && <span className="w-6 h-6 mr-2 shrink-0 grow-0 rounded-full bg-[#4F46E5] flex items-center justify-center">
        <img src={TickIcons} alt="TickIcons" className='w-3 h-3' />
      </span>}

      {!tickStatus && <span className="w-6 h-6 mr-2 shrink-0 grow-0 rounded-full border-2 border-indigo-100 flex items-center justify-center">
        <span className=''>{tickNumber}</span>
      </span>}
    </>
  )
}

export default Tick