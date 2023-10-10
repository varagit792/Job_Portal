import bookMarkIcon from '../../assets/svg/bookMarkIcon.svg';
const ShortJobCard = () => {

  return (

    <div className=" p-5 bg-white rounded-xl flex-col justify-start items-start inline-flex w-full">
      <div className="self-stretch  flex-col justify-start items-start gap-3 flex">
        <div className="self-stretch  flex-col justify-start items-start gap-1 flex">
          <div className="flex justify-between w-full">
            <div className="self-stretch text-slate-900 text-base font-bold  leading-snug tracking-tight">Global Head of Supply Chain Finance
            </div>
            <span><img src={bookMarkIcon} alt="bookMark" /></span>
          </div>
          <div className="justify-start items-center gap-3 ">
            <span className="text-slate-500 text-sm font-normal leading-snug tracking-tight">TATA Consultancy Services
            </span>
          </div>
        </div>
        <div className="justify-start items-center gap-1 inline-flex">
          <div className=" px-3 py-2 bg-orange-50 rounded justify-center items-center gap-2.5 flex">
            <div className="text-orange-600 text-sm font-normal  leading-none tracking-tight">Hybrid</div>
          </div>
          <div className=" px-3 py-2 bg-green-50 rounded justify-center items-center gap-2.5 flex">
            <div className="text-green-600 text-sm font-normal  leading-none tracking-tight">Full-time</div>
          </div>
          <div className="text-slate-400 text-sm font-normal  leading-none tracking-tight">Posted 4 hrs ago</div>
        </div>
      </div>
    </div>

  )
}

export default ShortJobCard